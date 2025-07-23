/**
 * Submit all HeritageBox URLs to Bing IndexNow
 * This script will submit our complete 1,587 URL sitemap to Bing for instant indexing
 */

const INDEXNOW_API_KEY = 'bba4875b95e8424d8fb9fb21f629ca12';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_HOST = 'heritagebox.com';
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_API_KEY}.txt`;

// Import data files
const { serviceFormats } = require('./src/data/serviceFormats.ts');
const { locationData } = require('./src/data/locationData.ts');
const { cityData } = require('./src/data/cityData.ts');
const { comparisonPages } = require('./src/data/comparisonPages.ts');
const { guidePages } = require('./src/data/guidePages.ts');
const { seasonalContentData } = require('./src/data/seasonalContent.ts');
const { interactiveToolsData } = require('./src/data/interactiveTools.ts');

async function submitUrlsToIndexNow(urls) {
  if (urls.length === 0) {
    return { success: false, message: 'No URLs provided' };
  }

  // Limit to 10,000 URLs per request as per Bing guidelines
  const urlsToSubmit = urls.slice(0, 10000);

  try {
    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlsToSubmit
    };

    console.log(`Submitting ${urlsToSubmit.length} URLs to Bing IndexNow...`);
    console.log('Sample URLs:', urlsToSubmit.slice(0, 5));

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    console.log(`Response status: ${response.status}`);

    if (response.status === 200) {
      return { 
        success: true, 
        status: 200, 
        message: `${urlsToSubmit.length} URLs submitted successfully` 
      };
    } else if (response.status === 202) {
      return { 
        success: true, 
        status: 202, 
        message: `${urlsToSubmit.length} URLs accepted for processing` 
      };
    } else {
      const responseText = await response.text();
      console.log('Response body:', responseText);
      return { 
        success: false, 
        status: response.status, 
        message: `IndexNow API returned status ${response.status}: ${responseText}` 
      };
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return { 
      success: false, 
      message: `Network error: ${error.message}` 
    };
  }
}

async function generateAllUrls() {
  const baseUrl = `https://${SITE_HOST}`;
  const urls = [];

  console.log('Generating all programmatic SEO URLs...');

  // Static pages
  urls.push(
    `${baseUrl}`,
    `${baseUrl}/about`,
    `${baseUrl}/contact`,
    `${baseUrl}/privacy-policy`,
    `${baseUrl}/terms-of-service`
  );

  // Service pages - use id as slug
  serviceFormats.forEach(service => {
    urls.push(`${baseUrl}/services/${service.id}`);
  });

  // Location pages - use id property
  locationData.forEach(location => {
    urls.push(`${baseUrl}/locations/${location.id}`);
  });

  // Service + Location combinations
  serviceFormats.forEach(service => {
    locationData.forEach(location => {
      urls.push(`${baseUrl}/services/${service.id}/${location.id}`);
    });
  });

  // City pages - use id property
  cityData.forEach(city => {
    urls.push(`${baseUrl}/cities/${city.id}`);
  });

  // City + Service combinations
  cityData.forEach(city => {
    serviceFormats.forEach(service => {
      urls.push(`${baseUrl}/cities/${city.id}/${service.id}`);
    });
  });

  // Comparison pages
  comparisonPages.forEach(comparison => {
    urls.push(`${baseUrl}/compare/${comparison.slug}`);
  });

  // Guide pages
  guidePages.forEach(guide => {
    urls.push(`${baseUrl}/guides/${guide.slug}`);
  });

  // Seasonal pages
  seasonalContentData.forEach(seasonal => {
    urls.push(`${baseUrl}/seasonal/${seasonal.slug}`);
  });

  // Interactive tools
  interactiveToolsData.forEach(tool => {
    urls.push(`${baseUrl}/tools/${tool.slug}`);
  });

  // Add sitemap URL
  urls.push(`${baseUrl}/sitemap.xml`);

  console.log(`Generated ${urls.length} total URLs`);
  console.log('URL breakdown:');
  console.log(`- Static pages: 5`);
  console.log(`- Service pages: ${serviceFormats.length}`);
  console.log(`- Location pages: ${locationData.length}`);
  console.log(`- Service + Location: ${serviceFormats.length * locationData.length}`);
  console.log(`- City pages: ${cityData.length}`);
  console.log(`- City + Service: ${cityData.length * serviceFormats.length}`);
  console.log(`- Comparison pages: ${comparisonPages.length}`);
  console.log(`- Guide pages: ${guidePages.length}`);
  console.log(`- Seasonal pages: ${seasonalContentData.length}`);
  console.log(`- Interactive tools: ${interactiveToolsData.length}`);
  console.log(`- Sitemap: 1`);

  return urls;
}

async function testKeyFileAccess() {
  console.log('Testing IndexNow key file access...');
  
  try {
    const response = await fetch(KEY_LOCATION);
    if (response.ok) {
      const content = await response.text();
      console.log(`✅ Key file accessible at ${KEY_LOCATION}`);
      console.log(`Key content: ${content.trim()}`);
      return true;
    } else {
      console.log(`❌ Key file not accessible: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error accessing key file: ${error.message}`);
    return false;
  }
}

async function submitSitemapOnly() {
  console.log('Submitting sitemap URL only...');
  const sitemapUrl = `https://${SITE_HOST}/sitemap.xml`;
  const result = await submitUrlsToIndexNow([sitemapUrl]);
  console.log('Sitemap submission result:', result);
  return result;
}

async function main() {
  console.log('🚀 HeritageBox IndexNow Submission Script');
  console.log('==========================================');
  
  // Test key file access first
  const keyFileAccessible = await testKeyFileAccess();
  if (!keyFileAccessible) {
    console.log('❌ Cannot proceed without accessible key file');
    return;
  }

  // Option 1: Submit sitemap only (recommended first step)
  console.log('\n📋 Step 1: Submitting sitemap URL...');
  await submitSitemapOnly();

  // Option 2: Submit all URLs (uncomment to enable)
  console.log('\n📋 Step 2: Submitting all programmatic URLs...');
  const urls = await generateAllUrls();
  const result = await submitUrlsToIndexNow(urls);
  
  console.log('\n🎯 Final Result:');
  console.log('================');
  if (result.success) {
    console.log(`✅ SUCCESS: ${result.message}`);
    console.log(`Status: ${result.status}`);
    console.log('\n📈 Next Steps:');
    console.log('1. Monitor Bing Webmaster Tools for indexing progress');
    console.log('2. Check search results in 24-48 hours');
    console.log('3. Set up regular IndexNow submissions for new content');
  } else {
    console.log(`❌ FAILED: ${result.message}`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify key file is accessible at:', KEY_LOCATION);
    console.log('2. Check if domain ownership is verified');
    console.log('3. Ensure URLs are valid and accessible');
  }
}

// Run the script
main().catch(console.error);
