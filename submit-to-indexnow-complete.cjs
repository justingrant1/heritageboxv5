const https = require('https');
const fs = require('fs');

// Import all the actual data files (converted to CommonJS format)
const serviceFormats = [
  { formatType: 'VHS', displayName: 'VHS to Digital' },
  { formatType: 'Hi8', displayName: 'Hi8 to Digital' },
  { formatType: 'Digital8', displayName: 'Digital8 to Digital' },
  { formatType: 'MiniDV', displayName: 'MiniDV to Digital' },
  { formatType: '8mm Film', displayName: '8mm Film to Digital' },
  { formatType: 'Super8', displayName: 'Super8 to Digital' },
  { formatType: '16mm Film', displayName: '16mm Film to Digital' },
  { formatType: 'Photos', displayName: 'Photo Scanning' },
  { formatType: 'Slides', displayName: 'Slide Scanning' },
  { formatType: 'Negatives', displayName: 'Negative Scanning' },
  { formatType: 'VHS-C', displayName: 'VHS-C to Digital' }
];

const locationData = [
  { state: 'California', stateCode: 'CA' },
  { state: 'Texas', stateCode: 'TX' },
  { state: 'Florida', stateCode: 'FL' },
  { state: 'New York', stateCode: 'NY' },
  { state: 'Pennsylvania', stateCode: 'PA' },
  { state: 'Illinois', stateCode: 'IL' },
  { state: 'Ohio', stateCode: 'OH' },
  { state: 'Georgia', stateCode: 'GA' },
  { state: 'North Carolina', stateCode: 'NC' },
  { state: 'Michigan', stateCode: 'MI' },
  { state: 'New Jersey', stateCode: 'NJ' },
  { state: 'Virginia', stateCode: 'VA' },
  { state: 'Washington', stateCode: 'WA' },
  { state: 'Arizona', stateCode: 'AZ' },
  { state: 'Massachusetts', stateCode: 'MA' },
  { state: 'Tennessee', stateCode: 'TN' },
  { state: 'Indiana', stateCode: 'IN' },
  { state: 'Missouri', stateCode: 'MO' },
  { state: 'Maryland', stateCode: 'MD' },
  { state: 'Wisconsin', stateCode: 'WI' }
];

const cityData = [
  { name: 'New York', state: 'New York' },
  { name: 'Los Angeles', state: 'California' },
  { name: 'Chicago', state: 'Illinois' },
  { name: 'Houston', state: 'Texas' },
  { name: 'Phoenix', state: 'Arizona' },
  { name: 'Philadelphia', state: 'Pennsylvania' },
  { name: 'San Antonio', state: 'Texas' },
  { name: 'San Diego', state: 'California' },
  { name: 'Dallas', state: 'Texas' },
  { name: 'San Jose', state: 'California' }
];

const seasonalContent = [
  { slug: 'holiday-memories-digitization', title: 'Holiday Memories Digitization' },
  { slug: 'spring-cleaning-media-conversion', title: 'Spring Cleaning Media Conversion' },
  { slug: 'summer-vacation-prep', title: 'Summer Vacation Prep' },
  { slug: 'back-to-school-family-memories', title: 'Back to School Family Memories' }
];

const interactiveTools = [
  { slug: 'cost-calculator', title: 'Cost Calculator' },
  { slug: 'format-identifier', title: 'Format Identifier' },
  { slug: 'quality-estimator', title: 'Quality Estimator' },
  { slug: 'timeline-planner', title: 'Timeline Planner' }
];

// Helper functions
const formatSlug = (text) => {
  return text.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const formatLocationSlug = (state) => {
  return state.toLowerCase().replace(/\s+/g, '-');
};

const formatCitySlug = (city) => {
  return city.toLowerCase().replace(/\s+/g, '-');
};

// Generate all programmatic URLs
const generateAllUrls = () => {
  const baseUrl = 'https://heritagebox.com';
  const urls = [];

  // 1. Static pages (5)
  urls.push(baseUrl);
  urls.push(`${baseUrl}/about`);
  urls.push(`${baseUrl}/contact`);
  urls.push(`${baseUrl}/privacy-policy`);
  urls.push(`${baseUrl}/terms-of-service`);

  // 2. Service pages (11)
  serviceFormats.forEach(service => {
    urls.push(`${baseUrl}/services/${formatSlug(service.formatType)}`);
  });

  // 3. Location pages (20)
  locationData.forEach(location => {
    urls.push(`${baseUrl}/locations/${formatLocationSlug(location.state)}`);
  });

  // 4. Service + Location combinations (220 = 11 services × 20 locations)
  serviceFormats.forEach(service => {
    locationData.forEach(location => {
      urls.push(`${baseUrl}/services/${formatSlug(service.formatType)}/${formatLocationSlug(location.state)}`);
    });
  });

  // 5. City pages (10)
  cityData.forEach(city => {
    urls.push(`${baseUrl}/cities/${formatCitySlug(city.name)}`);
  });

  // 6. City + Service combinations (110 = 10 cities × 11 services)
  cityData.forEach(city => {
    serviceFormats.forEach(service => {
      urls.push(`${baseUrl}/cities/${formatCitySlug(city.name)}/${formatSlug(service.formatType)}`);
    });
  });

  // 7. Service combination pages (1,320 = all possible service pairings)
  // Generate all unique pairs of services
  for (let i = 0; i < serviceFormats.length; i++) {
    for (let j = i + 1; j < serviceFormats.length; j++) {
      const service1 = serviceFormats[i];
      const service2 = serviceFormats[j];
      const combinationSlug = `${formatSlug(service1.formatType)}-${formatSlug(service2.formatType)}`;
      
      // Create combination pages for each location
      locationData.forEach(location => {
        urls.push(`${baseUrl}/services/${combinationSlug}/${formatLocationSlug(location.state)}`);
      });
    }
  }

  // 8. Comparison pages (45 = 15 top combinations × 3 competitors)
  const topServiceCombinations = [
    'vhs-photos', 'vhs-8mm-film', 'photos-slides', 'hi8-minidv', 'vhs-hi8',
    'photos-negatives', '8mm-film-super8', 'vhs-minidv', 'digital8-hi8', 'slides-negatives',
    'vhs-digital8', 'photos-8mm-film', 'hi8-8mm-film', 'vhs-slides', 'minidv-digital8'
  ];
  
  const competitors = ['legacybox', 'capture', 'imemories'];
  
  topServiceCombinations.forEach(combination => {
    competitors.forEach(competitor => {
      urls.push(`${baseUrl}/compare/${combination}-vs-${competitor}`);
    });
  });

  // 9. Guide pages (12 = 4 guides × 3 categories)
  const guideCategories = ['preparation', 'process', 'best-practices'];
  const guideTypes = ['vhs-conversion', 'photo-scanning', '8mm-film-transfer', 'digital-preservation'];
  
  guideCategories.forEach(category => {
    guideTypes.forEach(type => {
      urls.push(`${baseUrl}/guides/${category}-${type}`);
    });
  });

  // 10. Seasonal pages (4)
  seasonalContent.forEach(seasonal => {
    urls.push(`${baseUrl}/seasonal/${seasonal.slug}`);
  });

  // 11. Interactive tools (4)
  interactiveTools.forEach(tool => {
    urls.push(`${baseUrl}/tools/${tool.slug}`);
  });

  // 12. Sitemap
  urls.push(`${baseUrl}/sitemap.xml`);

  return urls;
};

// IndexNow submission function
const submitToIndexNow = async (urls, keyLocation) => {
  const host = 'heritagebox.com';
  const key = 'bba4875b95e8424d8fb9fb21f629ca12';
  
  const payload = {
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: urls
  };

  const data = JSON.stringify(payload);
  
  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: responseBody,
          headers: res.headers
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

// Test key file accessibility
const testKeyFile = async () => {
  const keyUrl = 'https://heritagebox.com/bba4875b95e8424d8fb9fb21f629ca12.txt';
  
  return new Promise((resolve, reject) => {
    const followRedirect = (url, maxRedirects = 5) => {
      if (maxRedirects <= 0) {
        reject(new Error('Too many redirects'));
        return;
      }
      
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Follow redirect
          const redirectUrl = res.headers.location.startsWith('http') 
            ? res.headers.location 
            : `https://heritagebox.com${res.headers.location}`;
          followRedirect(redirectUrl, maxRedirects - 1);
          return;
        }
        
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            content: data.trim(),
            contentType: res.headers['content-type']
          });
        });
      }).on('error', (error) => {
        reject(error);
      });
    };
    
    followRedirect(keyUrl);
  });
};

// Main execution
const main = async () => {
  console.log('🚀 HeritageBox Complete IndexNow Submission Script');
  console.log('===================================================');
  
  try {
    // Test key file
    console.log('Testing IndexNow key file access...');
    const keyTest = await testKeyFile();
    
    if (keyTest.statusCode === 200 && keyTest.content === 'bba4875b95e8424d8fb9fb21f629ca12') {
      console.log('✅ Key file accessible and valid');
    } else {
      console.log('❌ Key file issue:');
      console.log(`Status: ${keyTest.statusCode}`);
      console.log(`Content: ${keyTest.content.substring(0, 100)}...`);
      return;
    }

    // Generate all URLs
    console.log('\n📋 Generating complete URL set...');
    const allUrls = generateAllUrls();
    
    console.log(`Generated ${allUrls.length} total URLs`);
    console.log('\nURL breakdown:');
    console.log(`- Static pages: 5`);
    console.log(`- Service pages: 11`);
    console.log(`- Location pages: 20`);
    console.log(`- Service + Location: 220`);
    console.log(`- City pages: 10`);
    console.log(`- City + Service: 110`);
    console.log(`- Service combinations: ${11 * 10 * 20} (service pairs × locations)`);
    console.log(`- Comparison pages: 45`);
    console.log(`- Guide pages: 12`);
    console.log(`- Seasonal pages: 4`);
    console.log(`- Interactive tools: 4`);
    console.log(`- Sitemap: 1`);

    // Submit to IndexNow in batches (IndexNow has limits)
    const batchSize = 1000; // IndexNow limit per request
    const batches = [];
    
    for (let i = 0; i < allUrls.length; i += batchSize) {
      batches.push(allUrls.slice(i, i + batchSize));
    }

    console.log(`\n📤 Submitting ${allUrls.length} URLs in ${batches.length} batch(es)...`);
    
    let totalSubmitted = 0;
    let successfulBatches = 0;

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\nSubmitting batch ${i + 1}/${batches.length} (${batch.length} URLs)...`);
      
      try {
        const result = await submitToIndexNow(
          batch,
          'https://heritagebox.com/bba4875b95e8424d8fb9fb21f629ca12.txt'
        );
        
        console.log(`Batch ${i + 1} status: ${result.statusCode}`);
        
        if (result.statusCode === 200 || result.statusCode === 202) {
          totalSubmitted += batch.length;
          successfulBatches++;
          console.log(`✅ Batch ${i + 1} successful`);
        } else {
          console.log(`❌ Batch ${i + 1} failed: ${result.body}`);
        }
        
        // Add delay between batches to respect rate limits
        if (i < batches.length - 1) {
          console.log('Waiting 2 seconds before next batch...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        console.log(`❌ Batch ${i + 1} error:`, error.message);
      }
    }

    console.log('\n🎯 Final Result:');
    console.log('================');
    console.log(`✅ Successfully submitted: ${totalSubmitted}/${allUrls.length} URLs`);
    console.log(`✅ Successful batches: ${successfulBatches}/${batches.length}`);
    
    if (totalSubmitted === allUrls.length) {
      console.log('🎉 ALL URLS SUBMITTED SUCCESSFULLY!');
      console.log('\n📈 Next Steps:');
      console.log('1. Monitor Bing Webmaster Tools for indexing progress');
      console.log('2. Check search results in 24-48 hours');
      console.log('3. Set up regular submissions for new content');
    } else {
      console.log(`⚠️  ${allUrls.length - totalSubmitted} URLs failed to submit`);
    }

    // Save submitted URLs to file for reference
    fs.writeFileSync('submitted-urls.json', JSON.stringify({
      timestamp: new Date().toISOString(),
      totalUrls: allUrls.length,
      submittedUrls: totalSubmitted,
      urls: allUrls
    }, null, 2));
    
    console.log('\n📄 URL list saved to submitted-urls.json');

  } catch (error) {
    console.error('❌ Script error:', error);
  }
};

// Run the script
main();
