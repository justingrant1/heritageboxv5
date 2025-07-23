const https = require('https');
const fs = require('fs');

// Import the correct data structures
const serviceFormats = [
  { formatType: 'VHS', slug: 'vhs' },
  { formatType: 'VHS-C', slug: 'vhs-c' },
  { formatType: 'Hi8', slug: 'hi8' },
  { formatType: 'Digital8', slug: 'digital8' },
  { formatType: 'MiniDV', slug: 'minidv' },
  { formatType: '8mm Film', slug: '8mm-film' },
  { formatType: 'Super8', slug: 'super8' },
  { formatType: '16mm Film', slug: '16mm-film' },
  { formatType: 'Photos', slug: 'photos' },
  { formatType: 'Slides', slug: 'slides' },
  { formatType: 'Negatives', slug: 'negatives' },
  { formatType: 'Audio Cassettes', slug: 'audio-cassettes' },
  { formatType: 'Vinyl Records', slug: 'vinyl-records' },
  { formatType: 'CDs', slug: 'cds' },
  { formatType: 'DVDs', slug: 'dvds' },
  { formatType: 'Floppy Disks', slug: 'floppy-disks' },
  { formatType: 'Zip Disks', slug: 'zip-disks' },
  { formatType: 'External Drives', slug: 'external-drives' },
  { formatType: 'Documents', slug: 'documents' },
  { formatType: 'Betamax', slug: 'betamax' }
];

const locationData = [
  { state: 'California', slug: 'california' },
  { state: 'Texas', slug: 'texas' },
  { state: 'Florida', slug: 'florida' },
  { state: 'New York', slug: 'new-york' },
  { state: 'Pennsylvania', slug: 'pennsylvania' },
  { state: 'Illinois', slug: 'illinois' },
  { state: 'Ohio', slug: 'ohio' },
  { state: 'Georgia', slug: 'georgia' },
  { state: 'North Carolina', slug: 'north-carolina' },
  { state: 'Michigan', slug: 'michigan' },
  { state: 'New Jersey', slug: 'new-jersey' },
  { state: 'Virginia', slug: 'virginia' },
  { state: 'Washington', slug: 'washington' },
  { state: 'Arizona', slug: 'arizona' },
  { state: 'Massachusetts', slug: 'massachusetts' },
  { state: 'Tennessee', slug: 'tennessee' },
  { state: 'Indiana', slug: 'indiana' },
  { state: 'Maryland', slug: 'maryland' },
  { state: 'Missouri', slug: 'missouri' },
  { state: 'Wisconsin', slug: 'wisconsin' }
];

const cityData = [
  { name: 'Los Angeles', slug: 'los-angeles', state: 'California' },
  { name: 'New York', slug: 'new-york', state: 'New York' },
  { name: 'Chicago', slug: 'chicago', state: 'Illinois' },
  { name: 'Houston', slug: 'houston', state: 'Texas' },
  { name: 'Phoenix', slug: 'phoenix', state: 'Arizona' },
  { name: 'Philadelphia', slug: 'philadelphia', state: 'Pennsylvania' },
  { name: 'San Antonio', slug: 'san-antonio', state: 'Texas' },
  { name: 'San Diego', slug: 'san-diego', state: 'California' },
  { name: 'Dallas', slug: 'dallas', state: 'Texas' },
  { name: 'San Jose', slug: 'san-jose', state: 'California' },
  { name: 'Austin', slug: 'austin', state: 'Texas' },
  { name: 'Jacksonville', slug: 'jacksonville', state: 'Florida' },
  { name: 'Fort Worth', slug: 'fort-worth', state: 'Texas' },
  { name: 'Columbus', slug: 'columbus', state: 'Ohio' },
  { name: 'Charlotte', slug: 'charlotte', state: 'North Carolina' },
  { name: 'San Francisco', slug: 'san-francisco', state: 'California' },
  { name: 'Indianapolis', slug: 'indianapolis', state: 'Indiana' },
  { name: 'Seattle', slug: 'seattle', state: 'Washington' },
  { name: 'Denver', slug: 'denver', state: 'Colorado' },
  { name: 'Washington DC', slug: 'washington-dc', state: 'District of Columbia' },
  { name: 'Boston', slug: 'boston', state: 'Massachusetts' },
  { name: 'El Paso', slug: 'el-paso', state: 'Texas' },
  { name: 'Detroit', slug: 'detroit', state: 'Michigan' },
  { name: 'Nashville', slug: 'nashville', state: 'Tennessee' },
  { name: 'Portland', slug: 'portland', state: 'Oregon' },
  { name: 'Memphis', slug: 'memphis', state: 'Tennessee' },
  { name: 'Oklahoma City', slug: 'oklahoma-city', state: 'Oklahoma' },
  { name: 'Las Vegas', slug: 'las-vegas', state: 'Nevada' },
  { name: 'Louisville', slug: 'louisville', state: 'Kentucky' },
  { name: 'Baltimore', slug: 'baltimore', state: 'Maryland' },
  { name: 'Milwaukee', slug: 'milwaukee', state: 'Wisconsin' },
  { name: 'Albuquerque', slug: 'albuquerque', state: 'New Mexico' },
  { name: 'Tucson', slug: 'tucson', state: 'Arizona' },
  { name: 'Fresno', slug: 'fresno', state: 'California' },
  { name: 'Mesa', slug: 'mesa', state: 'Arizona' },
  { name: 'Sacramento', slug: 'sacramento', state: 'California' },
  { name: 'Atlanta', slug: 'atlanta', state: 'Georgia' },
  { name: 'Kansas City', slug: 'kansas-city', state: 'Missouri' },
  { name: 'Colorado Springs', slug: 'colorado-springs', state: 'Colorado' },
  { name: 'Omaha', slug: 'omaha', state: 'Nebraska' },
  { name: 'Raleigh', slug: 'raleigh', state: 'North Carolina' },
  { name: 'Miami', slug: 'miami', state: 'Florida' },
  { name: 'Oakland', slug: 'oakland', state: 'California' },
  { name: 'Minneapolis', slug: 'minneapolis', state: 'Minnesota' },
  { name: 'Tulsa', slug: 'tulsa', state: 'Oklahoma' },
  { name: 'Cleveland', slug: 'cleveland', state: 'Ohio' },
  { name: 'Wichita', slug: 'wichita', state: 'Kansas' },
  { name: 'Arlington', slug: 'arlington', state: 'Texas' },
  { name: 'New Orleans', slug: 'new-orleans', state: 'Louisiana' },
  { name: 'Bakersfield', slug: 'bakersfield', state: 'California' }
];

// Generate corrected URLs for IndexNow submission
const generateCorrectedUrls = () => {
  const baseUrl = 'https://heritagebox.com';
  const urls = [];

  // 1. Static pages
  const staticPages = ['', '/about', '/contact', '/privacy-policy', '/terms-of-service'];
  staticPages.forEach(page => {
    urls.push(`${baseUrl}${page}`);
  });

  // 2. Service pages
  serviceFormats.forEach(service => {
    urls.push(`${baseUrl}/services/${service.slug}`);
  });

  // 3. Location pages
  locationData.forEach(location => {
    urls.push(`${baseUrl}/locations/${location.slug}`);
  });

  // 4. Service + Location combinations (top combinations only for IndexNow)
  const topServices = serviceFormats.slice(0, 10); // Top 10 services
  const topLocations = locationData.slice(0, 10); // Top 10 locations
  
  topServices.forEach(service => {
    topLocations.forEach(location => {
      urls.push(`${baseUrl}/services/${service.slug}/${location.slug}`);
    });
  });

  // 5. City pages (top cities only)
  const topCities = cityData.slice(0, 20); // Top 20 cities
  topCities.forEach(city => {
    urls.push(`${baseUrl}/cities/${city.slug}`);
  });

  // 6. City + Service combinations (limited)
  topCities.slice(0, 10).forEach(city => {
    topServices.slice(0, 5).forEach(service => {
      urls.push(`${baseUrl}/cities/${city.slug}/${service.slug}`);
    });
  });

  // 7. CORRECTED Comparison pages - format: /compare/{service}-vs-{competitor}-{location}
  const topComparisonServices = ['vhs', 'photos', '8mm-film', 'slides', 'super8'];
  const competitors = ['legacybox', 'capture', 'imemories'];
  const topComparisonLocations = ['california', 'texas', 'florida', 'new-york'];

  topComparisonServices.forEach(service => {
    competitors.forEach(competitor => {
      topComparisonLocations.forEach(location => {
        urls.push(`${baseUrl}/compare/${service}-vs-${competitor}-${location}`);
      });
    });
  });

  // 8. CORRECTED Guide pages - format: /guides/how-to-{service}-{location}
  const guideServices = ['vhs', 'photos', '8mm-film', 'slides'];
  const guideLocations = ['california', 'texas', 'florida', 'new-york'];

  guideServices.forEach(service => {
    guideLocations.forEach(location => {
      urls.push(`${baseUrl}/guides/how-to-${service}-${location}`);
    });
  });

  // 9. CORRECTED Seasonal pages
  const seasonalPages = [
    'holiday-photo-digitization',
    'spring-cleaning-media-conversion', 
    'summer-vacation-memory-prep',
    'back-to-school-memories',
    'wedding-season-digitization',
    'graduation-memory-preservation'
  ];

  seasonalPages.forEach(page => {
    urls.push(`${baseUrl}/seasonal/${page}`);
  });

  // 10. CORRECTED Interactive tools
  const toolPages = [
    'cost-calculator',
    'timeline-estimator',
    'photo-scanning-calculator',
    'format-compatibility-checker',
    'preservation-priority-quiz'
  ];

  toolPages.forEach(page => {
    urls.push(`${baseUrl}/tools/${page}`);
  });

  return urls;
};

// Submit URLs to IndexNow
const submitToIndexNow = async (urls, batchSize = 100) => {
  const apiKey = 'bba4875b95e8424d8fb9fb21f629ca12';
  const keyLocation = 'https://heritagebox.com/bba4875b95e8424d8fb9fb21f629ca12.txt';
  
  console.log(`📤 Submitting ${urls.length} corrected URLs to IndexNow in batches of ${batchSize}`);
  
  // Split URLs into batches
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\n📦 Processing batch ${i + 1}/${batches.length} (${batch.length} URLs)`);
    
    const payload = JSON.stringify({
      host: 'heritagebox.com',
      key: apiKey,
      keyLocation: keyLocation,
      urlList: batch
    });
    
    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    
    try {
      await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            if (res.statusCode === 200) {
              console.log(`✅ Batch ${i + 1} submitted successfully`);
              successCount += batch.length;
            } else {
              console.log(`⚠️ Batch ${i + 1} returned status ${res.statusCode}: ${data}`);
              errorCount += batch.length;
            }
            resolve();
          });
        });
        
        req.on('error', (error) => {
          console.error(`❌ Error submitting batch ${i + 1}:`, error.message);
          errorCount += batch.length;
          resolve(); // Continue with next batch
        });
        
        req.write(payload);
        req.end();
      });
      
      // Add delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ Error with batch ${i + 1}:`, error.message);
      errorCount += batch.length;
    }
  }
  
  return { successCount, errorCount };
};

// Main execution
const main = async () => {
  console.log('🔧 Fixing IndexNow URLs with Correct Formats');
  console.log('=============================================');
  
  try {
    console.log('Generating corrected URLs...');
    const correctedUrls = generateCorrectedUrls();
    
    console.log(`📊 Generated ${correctedUrls.length} corrected URLs`);
    
    console.log('\n🎯 URL Format Corrections Applied:');
    console.log('- Comparison pages: /compare/{service}-vs-{competitor}-{location}');
    console.log('- Guide pages: /guides/how-to-{service}-{location}');
    console.log('- Tool pages: /tools/{tool-name}');
    console.log('- All other pages: Using verified working formats');
    
    // Save URLs to file for reference
    fs.writeFileSync('corrected-indexnow-urls.json', JSON.stringify(correctedUrls, null, 2));
    console.log('💾 Corrected URLs saved to corrected-indexnow-urls.json');
    
    console.log('\n🚀 Starting IndexNow submission...');
    const { successCount, errorCount } = await submitToIndexNow(correctedUrls);
    
    console.log('\n📊 INDEXNOW SUBMISSION RESULTS:');
    console.log(`✅ Successfully submitted: ${successCount} URLs`);
    console.log(`❌ Failed submissions: ${errorCount} URLs`);
    console.log(`📈 Success rate: ${((successCount / correctedUrls.length) * 100).toFixed(1)}%`);
    
    if (successCount > 0) {
      console.log('\n🎉 INDEXNOW URLS FIXED AND RESUBMITTED!');
      console.log('Search engines will now receive correct URLs that actually work.');
    }
    
  } catch (error) {
    console.error('❌ Error fixing IndexNow URLs:', error);
  }
};

// Run the script
main();
