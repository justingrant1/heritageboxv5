import Airtable from 'airtable';

// Airtable configuration for HBOX2 base
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = 'appFMHAYZrTskpmdX'; // HBOX2 base ID
const CUSTOMERS_TABLE = 'tblUS7uf11axEmL56';
const PRODUCTS_TABLE = 'tblJ0hgzvDXWgQGmK';
const ORDERS_TABLE = 'tblTq25QawVDHTTkV';
const ORDER_ITEMS_TABLE = 'tblgV4XGeQE3VL9CW';

// Check if Airtable is properly configured
const isAirtableConfigured = () => {
  return AIRTABLE_API_KEY && AIRTABLE_BASE_ID;
};

// Initialize Airtable only if properly configured
let base: any = null;
if (isAirtableConfigured()) {
  try {
    base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
  } catch (error) {
    console.warn('⚠️ AIRTABLE WARNING - Failed to initialize Airtable:', error);
    base = null;
  }
} else {
  console.warn('⚠️ AIRTABLE WARNING - Airtable not configured. Missing API key.');
}

// Updated interfaces for normalized structure
interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  fullName: string;
}

interface OrderItem {
  productName: string;
  productSKU: string;
  quantity: number;
  unitPrice: number;
  description?: string;
  discountAmount?: number;
}

interface OrderData {
  customerInfo: CustomerInfo;
  orderItems: OrderItem[];
  totalAmount: number;
  promoCode?: string;
  paymentMethod: string;
  timestamp: string;
  orderDetails?: {
    package: string;
    packagePrice: string;
    packageFeatures: string;
    digitizingSpeed: string;
    digitizingTime: string;
    addOns: string[];
  };
}

// Generate unique order number
const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `HB${timestamp.slice(-6)}${random}`;
};

// Find or create customer by email
export const findOrCreateCustomer = async (customerInfo: CustomerInfo): Promise<string | null> => {
  if (!base) {
    console.warn('⚠️ AIRTABLE WARNING - Base not initialized');
    return null;
  }

  try {
    console.log('📊 AIRTABLE - Looking up customer by email:', customerInfo.email);

    // First, try to find existing customer by email
    const existingRecords = await base(CUSTOMERS_TABLE).select({
      filterByFormula: `{Email} = "${customerInfo.email}"`,
      maxRecords: 1
    }).firstPage();

    if (existingRecords.length > 0) {
      const customerId = existingRecords[0].id;
      console.log('✅ AIRTABLE - Found existing customer:', customerId);
      
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
    console.log('📊 AIRTABLE - Creating new customer');
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
    console.log('✅ AIRTABLE - Created new customer:', customerId);
    return customerId;

  } catch (error) {
    console.error('❌ AIRTABLE ERROR - Failed to find/create customer:', error);
    return null;
  }
};

// Find or create product by SKU
export const findOrCreateProduct = async (orderItem: OrderItem): Promise<string | null> => {
  if (!base) {
    console.warn('⚠️ AIRTABLE WARNING - Base not initialized');
    return null;
  }

  try {
    console.log('📊 AIRTABLE - Looking up product by SKU:', orderItem.productSKU);

    // First, try to find existing product by SKU
    const existingRecords = await base(PRODUCTS_TABLE).select({
      filterByFormula: `{SKU} = "${orderItem.productSKU}"`,
      maxRecords: 1
    }).firstPage();

    if (existingRecords.length > 0) {
      const productId = existingRecords[0].id;
      console.log('✅ AIRTABLE - Found existing product:', productId);
      return productId;
    }

    // Create new product
    console.log('📊 AIRTABLE - Creating new product');
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
    console.log('✅ AIRTABLE - Created new product:', productId);
    return productId;

  } catch (error) {
    console.error('❌ AIRTABLE ERROR - Failed to find/create product:', error);
    return null;
  }
};

// Create order with order items
export const createOrder = async (customerId: string, orderData: OrderData): Promise<string | null> => {
  if (!base) {
    console.warn('⚠️ AIRTABLE WARNING - Base not initialized');
    return null;
  }

  try {
    const orderNumber = generateOrderNumber();
    console.log('📊 AIRTABLE - Creating order:', orderNumber);

    // Create the order
    const newOrder = await base(ORDERS_TABLE).create([{
      fields: {
        'Order Number': orderNumber,
        'Customer': [customerId],
        'Order Date': new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        'Status': 'Pending',
        'Total Amount': orderData.totalAmount,
        'Promo Code': orderData.promoCode || '',
        'Payment Method': orderData.paymentMethod
      }
    }]);

    const orderId = newOrder[0].id;
    console.log('✅ AIRTABLE - Created order:', orderId);

    // Create order items
    const orderItemPromises = orderData.orderItems.map(async (item, index) => {
      const productId = await findOrCreateProduct(item);
      if (!productId) {
        console.error('❌ AIRTABLE ERROR - Failed to create product for item:', item.productName);
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
    
    console.log('✅ AIRTABLE - Created order items:', successfulItems.length);
    return orderId;

  } catch (error) {
    console.error('❌ AIRTABLE ERROR - Failed to create order:', error);
    return null;
  }
};

// Main function to process complete order
export const processOrderToAirtable = async (orderData: OrderData): Promise<boolean> => {
  if (!isAirtableConfigured()) {
    console.warn('⚠️ AIRTABLE WARNING - Airtable not configured. Order will not be sent to Airtable.');
    return false;
  }

  if (!base) {
    console.warn('⚠️ AIRTABLE WARNING - Airtable base not initialized.');
    return false;
  }

  try {
    console.log('📊 AIRTABLE - Processing complete order to normalized database');

    // Step 1: Find or create customer
    const customerId = await findOrCreateCustomer(orderData.customerInfo);
    if (!customerId) {
      throw new Error('Failed to create/find customer');
    }

    // Step 2: Create order with order items
    const orderId = await createOrder(customerId, orderData);
    if (!orderId) {
      throw new Error('Failed to create order');
    }

    console.log('✅ AIRTABLE SUCCESS - Complete order processed:', { customerId, orderId });
    return true;

  } catch (error) {
    console.error('❌ AIRTABLE ERROR - Failed to process order:', error);
    return false;
  }
};

// Helper function to convert legacy order data to new format
export const convertLegacyOrderData = (legacyOrderData: any): OrderData => {
  const { customerInfo, orderDetails } = legacyOrderData;
  
  console.log('🔄 AIRTABLE - Converting legacy order data:', legacyOrderData);
  
  // Create order items from package and add-ons
  const orderItems: OrderItem[] = [];
  
  // Main package item
  const packagePrice = parseFloat(orderDetails.packagePrice.replace('$', '').replace(',', ''));
  orderItems.push({
    productName: `${orderDetails.package} Package`,
    productSKU: `PKG-${orderDetails.package.toUpperCase().replace(/\s+/g, '-')}`,
    quantity: 1,
    unitPrice: packagePrice,
    description: `${orderDetails.package} digitization package: ${orderDetails.packageFeatures}`
  });

  // Digitizing speed as separate item if it has a cost
  const digitizingPrice = parseFloat(orderDetails.digitizingPrice?.replace('$', '').replace(',', '') || '0');
  if (digitizingPrice > 0) {
    orderItems.push({
      productName: `${orderDetails.digitizingSpeed} Processing`,
      productSKU: `SPEED-${orderDetails.digitizingSpeed.toUpperCase().replace(/[\s\(\)]+/g, '-')}`,
      quantity: 1,
      unitPrice: digitizingPrice,
      description: `${orderDetails.digitizingSpeed} digitizing speed: ${orderDetails.digitizingTime}`
    });
  }

  // Add-ons as separate items - Parse from the actual addOns array
  if (orderDetails.addOns && orderDetails.addOns.length > 0) {
    orderDetails.addOns.forEach((addOnString: string) => {
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

  // Extract promo code and discount information
  const promoCode = orderDetails.couponCode && orderDetails.couponCode !== 'None' ? orderDetails.couponCode : undefined;
  
  // Use the actual total amount that was charged (from totalAmount field)
  const actualTotalAmount = parseFloat(orderDetails.totalAmount.replace('$', '').replace(',', ''));
  
  console.log('💰 AIRTABLE - Promo code:', promoCode);
  console.log('💰 AIRTABLE - Actual total amount charged:', actualTotalAmount);

  return {
    customerInfo,
    orderItems,
    totalAmount: actualTotalAmount, // Use the actual amount charged (after discount)
    promoCode: promoCode, // Include promo code
    paymentMethod: legacyOrderData.paymentMethod || 'Credit Card',
    timestamp: legacyOrderData.timestamp || new Date().toISOString(),
    orderDetails // Keep original details for reference
  };
};

// Legacy function for backward compatibility
export const sendOrderToAirtable = async (legacyOrderData: any): Promise<any> => {
  console.log('📊 AIRTABLE - Converting legacy order data to normalized format');
  const orderData = convertLegacyOrderData(legacyOrderData);
  const success = await processOrderToAirtable(orderData);
  return success ? { success: true } : null;
};

// Function to test Airtable connection
export const testAirtableConnection = async (): Promise<boolean> => {
  if (!isAirtableConfigured()) {
    console.warn('⚠️ AIRTABLE TEST - Airtable not configured. Cannot test connection.');
    return false;
  }

  if (!base) {
    console.warn('⚠️ AIRTABLE TEST - Airtable base not initialized. Cannot test connection.');
    return false;
  }

  try {
    console.log('🧪 AIRTABLE TEST - Testing connection to all tables...');
    
    // Test connection to each table
    const tables = [
      { name: 'Customers', id: CUSTOMERS_TABLE },
      { name: 'Products', id: PRODUCTS_TABLE },
      { name: 'Orders', id: ORDERS_TABLE },
      { name: 'Order Items', id: ORDER_ITEMS_TABLE }
    ];

    for (const table of tables) {
      try {
        await base(table.id).select({ maxRecords: 1 }).firstPage();
        console.log(`✅ AIRTABLE TEST - ${table.name} table accessible`);
      } catch (error) {
        console.error(`❌ AIRTABLE TEST - ${table.name} table failed:`, error);
        return false;
      }
    }
    
    console.log('✅ AIRTABLE TEST - All connections successful');
    return true;
  } catch (error) {
    console.error('❌ AIRTABLE TEST - Connection failed:', error);
    return false;
  }
};

// Export the table IDs for direct access if needed
export const AIRTABLE_TABLES = {
  CUSTOMERS: CUSTOMERS_TABLE,
  PRODUCTS: PRODUCTS_TABLE,
  ORDERS: ORDERS_TABLE,
  ORDER_ITEMS: ORDER_ITEMS_TABLE
};

// Helper functions for pricing (maintain compatibility)
export const parseAddOnDetails = (addOns: string[], packageType: string) => {
  const addOnPrices = {
    'Photo Restoration': 15,
    'Video Enhancement': 25,
    'Digital Delivery': 10,
    'Express Shipping': 20,
    'Storage Upgrade': 35,
    'Backup Copies': 15
  };

  const addOnDetails = {
    photoRestoration: { selected: addOns.includes('Photo Restoration'), cost: addOns.includes('Photo Restoration') ? addOnPrices['Photo Restoration'] : 0 },
    videoEnhancement: { selected: addOns.includes('Video Enhancement'), cost: addOns.includes('Video Enhancement') ? addOnPrices['Video Enhancement'] : 0 },
    digitalDelivery: { selected: addOns.includes('Digital Delivery'), cost: addOns.includes('Digital Delivery') ? addOnPrices['Digital Delivery'] : 0 },
    expressShipping: { selected: addOns.includes('Express Shipping'), cost: addOns.includes('Express Shipping') ? addOnPrices['Express Shipping'] : 0 },
    storageUpgrade: { selected: addOns.includes('Storage Upgrade'), cost: addOns.includes('Storage Upgrade') ? addOnPrices['Storage Upgrade'] : 0 },
    backupCopies: { selected: addOns.includes('Backup Copies'), cost: addOns.includes('Backup Copies') ? addOnPrices['Backup Copies'] : 0 }
  };

  return addOnDetails;
};

export const parseSpeedDetails = (digitizingSpeed: string) => {
  const speedPrices = {
    'Standard (2-3 weeks)': { cost: 0, timeframe: '2-3 weeks' },
    'Express (1 week)': { cost: 50, timeframe: '1 week' },
    'Rush (3-5 days)': { cost: 100, timeframe: '3-5 days' }
  };

  const speedDetails = {
    standardSpeed: { 
      selected: digitizingSpeed.includes('Standard'), 
      cost: digitizingSpeed.includes('Standard') ? speedPrices['Standard (2-3 weeks)'].cost : 0,
      timeframe: digitizingSpeed.includes('Standard') ? speedPrices['Standard (2-3 weeks)'].timeframe : ''
    },
    expressSpeed: { 
      selected: digitizingSpeed.includes('Express'), 
      cost: digitizingSpeed.includes('Express') ? speedPrices['Express (1 week)'].cost : 0,
      timeframe: digitizingSpeed.includes('Express') ? speedPrices['Express (1 week)'].timeframe : ''
    },
    rushSpeed: { 
      selected: digitizingSpeed.includes('Rush'), 
      cost: digitizingSpeed.includes('Rush') ? speedPrices['Rush (3-5 days)'].cost : 0,
      timeframe: digitizingSpeed.includes('Rush') ? speedPrices['Rush (3-5 days)'].timeframe : ''
    }
  };

  return speedDetails;
};
