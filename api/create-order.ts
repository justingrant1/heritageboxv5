import Airtable from 'airtable';

// Helper function for structured logging
function logEvent(event: string, data: any) {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        event,
        ...data
    }));
}

// Airtable configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = 'appFMHAYZrTskpmdX'; // HBOX2 base ID
const CUSTOMERS_TABLE = 'tblUS7uf11axEmL56';
const PRODUCTS_TABLE = 'tblJ0hgzvDXWgQGmK';
const ORDERS_TABLE = 'tblTq25QawVDHTTkV';
const ORDER_ITEMS_TABLE = 'tblgV4XGeQE3VL9CW';

// Initialize Airtable
let base: any = null;
if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
    try {
        base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
    } catch (error) {
        console.error('Failed to initialize Airtable:', error);
    }
}

// Generate unique order number starting from 100420, incrementing by 5
const generateOrderNumber = async (): Promise<string> => {
    if (!base) return `100420`; // Fallback if no database connection
    
    try {
        // Get the latest order to find the current highest order number
        const existingOrders = await base(ORDERS_TABLE).select({
            fields: ['Order Number'],
            sort: [{ field: 'Order Number', direction: 'desc' }],
            maxRecords: 1
        }).firstPage();
        
        let nextOrderNumber = 100420; // Starting number
        
        if (existingOrders.length > 0) {
            const lastOrderNumber = existingOrders[0].get('Order Number');
            if (lastOrderNumber && typeof lastOrderNumber === 'string') {
                const currentNumber = parseInt(lastOrderNumber);
                if (!isNaN(currentNumber) && currentNumber >= 100420) {
                    nextOrderNumber = currentNumber + 5;
                }
            }
        }
        
        return nextOrderNumber.toString();
        
    } catch (error) {
        logEvent('order_number_generation_error', { error: error.message });
        // Fallback to timestamp-based if database query fails
        const timestamp = Date.now().toString();
        return `100420${timestamp.slice(-3)}`;
    }
};

// Find or create customer by email
const findOrCreateCustomer = async (customerInfo: any): Promise<string | null> => {
    if (!base) return null;

    try {
        logEvent('airtable_customer_lookup', { email: customerInfo.email });

        // First, try to find existing customer by email
        const existingRecords = await base(CUSTOMERS_TABLE).select({
            filterByFormula: `{Email} = "${customerInfo.email}"`,
            maxRecords: 1
        }).firstPage();

        if (existingRecords.length > 0) {
            const customerId = existingRecords[0].id;
            logEvent('airtable_customer_found', { customerId });
            
            // Update customer info if needed
            await base(CUSTOMERS_TABLE).update([{
                id: customerId,
                fields: {
                    'Name': customerInfo.fullName,
                    'Phone': customerInfo.phone,
                    'Shipping Address': `${customerInfo.address}\n${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`
                }
            }]);
            
            return customerId;
        }

        // Create new customer
        logEvent('airtable_customer_create', { email: customerInfo.email });
        const newCustomer = await base(CUSTOMERS_TABLE).create([{
            fields: {
                'Name': customerInfo.fullName,
                'Email': customerInfo.email,
                'Phone': customerInfo.phone,
                'Shipping Address': `${customerInfo.address}\n${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`,
                'Status': 'Todo'
            }
        }]);

        const customerId = newCustomer[0].id;
        logEvent('airtable_customer_created', { customerId });
        return customerId;

    } catch (error) {
        logEvent('airtable_customer_error', { error: error.message });
        return null;
    }
};

// Find or create product by SKU
const findOrCreateProduct = async (orderItem: any): Promise<string | null> => {
    if (!base) return null;

    try {
        logEvent('airtable_product_lookup', { sku: orderItem.productSKU });

        // First, try to find existing product by SKU
        const existingRecords = await base(PRODUCTS_TABLE).select({
            filterByFormula: `{SKU} = "${orderItem.productSKU}"`,
            maxRecords: 1
        }).firstPage();

        if (existingRecords.length > 0) {
            const productId = existingRecords[0].id;
            logEvent('airtable_product_found', { productId });
            return productId;
        }

        // Create new product
        logEvent('airtable_product_create', { sku: orderItem.productSKU });
        const newProduct = await base(PRODUCTS_TABLE).create([{
            fields: {
                'Product Name': orderItem.productName,
                'Description': orderItem.description || `HeritageBox ${orderItem.productName} service`,
                'Price': orderItem.unitPrice,
                'SKU': orderItem.productSKU,
                'Stock Quantity': 999 // Service products don't have stock limits
            }
        }]);

        const productId = newProduct[0].id;
        logEvent('airtable_product_created', { productId });
        return productId;

    } catch (error) {
        logEvent('airtable_product_error', { error: error.message });
        return null;
    }
};

// Convert legacy order data to normalized format
const convertLegacyOrderData = (orderDetails: any, paymentInfo: any) => {
    const { customerInfo, orderDetails: details } = orderDetails;
    
    logEvent('convert_legacy_data', { packageType: details.package, hasCustomer: !!customerInfo });
    
    // Create order items from package and add-ons
    const orderItems: any[] = [];
    
    // Main package item
    const packagePrice = parseFloat(details.packagePrice.replace('$', '').replace(',', ''));
    orderItems.push({
        productName: `${details.package} Package`,
        productSKU: `PKG-${details.package.toUpperCase().replace(/\s+/g, '-')}`,
        quantity: 1,
        unitPrice: packagePrice,
        description: `${details.package} digitization package: ${details.packageFeatures}`
    });

    // Digitizing speed as separate item if it has a cost
    const digitizingPrice = parseFloat(details.digitizingPrice?.replace('$', '').replace(',', '') || '0');
    if (digitizingPrice > 0) {
        orderItems.push({
            productName: `${details.digitizingSpeed} Processing`,
            productSKU: `SPEED-${details.digitizingSpeed.toUpperCase().replace(/[\s\(\)]+/g, '-')}`,
            quantity: 1,
            unitPrice: digitizingPrice,
            description: `${details.digitizingSpeed} digitizing speed: ${details.digitizingTime}`
        });
    }

    // Add-ons as separate items
    if (details.addOns && details.addOns.length > 0) {
        details.addOns.forEach((addOnString: string) => {
            // Parse strings like "1 USB Drive(s) - $24.95"
            const match = addOnString.match(/^(\d+)\s*(.+?)\s*-\s*\$?([\d.]+)/);
            if (match) {
                const quantity = parseInt(match[1]);
                const itemName = match[2].replace(/\(s\)$/, '').trim();
                const unitPrice = parseFloat(match[3]);
                
                orderItems.push({
                    productName: itemName,
                    productSKU: `ADDON-${itemName.toUpperCase().replace(/\s+/g, '-')}`,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    description: `${itemName} add-on service`
                });
            }
        });
    }

    // Extract promo code and use actual charged amount
    const promoCode = details.couponCode && details.couponCode !== 'None' ? details.couponCode : undefined;
    const actualTotalAmount = paymentInfo.actualAmount; // Use the actual amount charged

    return {
        customerInfo,
        orderItems,
        totalAmount: actualTotalAmount,
        promoCode: promoCode,
        paymentMethod: 'Credit Card',
        timestamp: new Date().toISOString(),
        paymentId: paymentInfo.paymentId,
        orderDetails: details
    };
};

// Create order with order items
const createOrder = async (customerId: string, orderData: any): Promise<string | null> => {
    if (!base) return null;

    try {
        const orderNumber = await generateOrderNumber();
        logEvent('airtable_order_create', { orderNumber, customerId });

        // Create the order
        const newOrder = await base(ORDERS_TABLE).create([{
            fields: {
                'Order Number': orderNumber,
                'Customer': [customerId],
                'Order Date': new Date().toISOString().split('T')[0], // YYYY-MM-DD format
                'Status': 'Pending',
                'Total Amount': orderData.totalAmount,
                'Promo Code': orderData.promoCode || ''
            }
        }]);

        const orderId = newOrder[0].id;
        logEvent('airtable_order_created', { orderId, orderNumber });

        // Create order items
        const orderItemPromises = orderData.orderItems.map(async (item: any, index: number) => {
            const productId = await findOrCreateProduct(item);
            if (!productId) {
                logEvent('airtable_order_item_product_failed', { productName: item.productName });
                return null;
            }

            const lineTotal = item.quantity * item.unitPrice - (item.discountAmount || 0);
            const itemId = `${orderNumber}-${index + 1}`;

            return base(ORDER_ITEMS_TABLE).create([{
                fields: {
                    'Item ID': itemId,
                    'Order': [orderId],
                    'Product': [productId],
                    'Quantity': item.quantity,
                    'Unit Price': item.unitPrice,
                    'Line Total': lineTotal,
                    'Discount Amount': item.discountAmount || 0
                }
            }]);
        });

        // Wait for all order items to be created
        const orderItemResults = await Promise.all(orderItemPromises);
        const successfulItems = orderItemResults.filter(result => result !== null);
        
        logEvent('airtable_order_items_created', { 
            orderId, 
            totalItems: orderData.orderItems.length,
            successfulItems: successfulItems.length 
        });
        
        return orderId;

    } catch (error) {
        logEvent('airtable_order_error', { error: error.message });
        return null;
    }
};

export default async function handler(request: Request) {
    logEvent('create_order_request', { method: request.method });

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!base) {
        logEvent('airtable_not_configured', {
            hasApiKey: !!AIRTABLE_API_KEY,
            hasBaseId: !!AIRTABLE_BASE_ID
        });
        return new Response(JSON.stringify({ success: false, error: 'Airtable not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { orderDetails, paymentId, paymentStatus, actualAmount } = await request.json();

        logEvent('create_order_data', {
            hasOrderDetails: !!orderDetails,
            paymentId,
            paymentStatus,
            actualAmount
        });

        if (!orderDetails) {
            return new Response(JSON.stringify({ success: false, error: 'Missing order details' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Convert legacy order data to normalized format
        const orderData = convertLegacyOrderData(orderDetails, {
            paymentId,
            paymentStatus,
            actualAmount
        });

        // Create customer
        const customerId = await findOrCreateCustomer(orderData.customerInfo);
        if (!customerId) {
            throw new Error('Failed to create/find customer');
        }

        // Create order with order items
        const orderId = await createOrder(customerId, orderData);
        if (!orderId) {
            throw new Error('Failed to create order');
        }

        logEvent('create_order_success', { customerId, orderId, paymentId });

        return new Response(JSON.stringify({
            success: true,
            customerId,
            orderId,
            paymentId
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        logEvent('create_order_error', { error: error.message });

        return new Response(JSON.stringify({
            success: false,
            error: error.message || 'Failed to create order'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
