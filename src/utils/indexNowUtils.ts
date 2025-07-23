/**
 * Bing IndexNow API Utilities
 * Instantly notify Bing when URLs are created or updated
 */

const INDEXNOW_API_KEY = 'bba4875b95e8424d8fb9fb21f629ca12';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_HOST = 'heritagebox.com';
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_API_KEY}.txt`;

interface IndexNowResponse {
  success: boolean;
  status?: number;
  message?: string;
}

/**
 * Submit a single URL to Bing IndexNow
 */
export async function submitUrlToIndexNow(url: string): Promise<IndexNowResponse> {
  try {
    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: [url]
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 200) {
      return { success: true, status: 200, message: 'URL submitted successfully' };
    } else if (response.status === 202) {
      return { success: true, status: 202, message: 'URL accepted for processing' };
    } else {
      return { 
        success: false, 
        status: response.status, 
        message: `IndexNow API returned status ${response.status}` 
      };
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return { 
      success: false, 
      message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Submit multiple URLs to Bing IndexNow (batch submission)
 * Note: Bing recommends max 10,000 URLs per request
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse> {
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

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

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
      return { 
        success: false, 
        status: response.status, 
        message: `IndexNow API returned status ${response.status}` 
      };
    }
  } catch (error) {
    console.error('IndexNow batch submission error:', error);
    return { 
      success: false, 
      message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

/**
 * Submit all programmatic SEO URLs to IndexNow
 * This will submit our complete 1,587 URL sitemap to Bing
 */
export async function submitAllProgrammaticUrls(): Promise<IndexNowResponse> {
  const baseUrl = `https://${SITE_HOST}`;
  
  // Import data to generate all URLs
  const { serviceFormats } = await import('../data/serviceFormats');
  const { locationData } = await import('../data/locationData');
  const { cityData } = await import('../data/cityData');
  const { comparisonPages } = await import('../data/comparisonPages');
  const { guidePages } = await import('../data/guidePages');
  const { seasonalContentData } = await import('../data/seasonalContent');
  const { interactiveToolsData } = await import('../data/interactiveTools');

  const urls: string[] = [];

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

  console.log(`Submitting ${urls.length} URLs to Bing IndexNow...`);
  
  return await submitUrlsToIndexNow(urls);
}

/**
 * Submit sitemap URL to IndexNow
 */
export async function submitSitemapToIndexNow(): Promise<IndexNowResponse> {
  const sitemapUrl = `https://${SITE_HOST}/sitemap.xml`;
  return await submitUrlToIndexNow(sitemapUrl);
}

/**
 * Utility to submit new programmatic pages when they're created
 */
export async function submitNewProgrammaticPage(
  pageType: 'service' | 'location' | 'city' | 'service-location' | 'city-service' | 'comparison' | 'guide' | 'seasonal' | 'tool',
  slug: string,
  additionalSlug?: string
): Promise<IndexNowResponse> {
  const baseUrl = `https://${SITE_HOST}`;
  let url: string;

  switch (pageType) {
    case 'service':
      url = `${baseUrl}/services/${slug}`;
      break;
    case 'location':
      url = `${baseUrl}/locations/${slug}`;
      break;
    case 'city':
      url = `${baseUrl}/cities/${slug}`;
      break;
    case 'service-location':
      url = `${baseUrl}/services/${slug}/${additionalSlug}`;
      break;
    case 'city-service':
      url = `${baseUrl}/cities/${slug}/${additionalSlug}`;
      break;
    case 'comparison':
      url = `${baseUrl}/compare/${slug}`;
      break;
    case 'guide':
      url = `${baseUrl}/guides/${slug}`;
      break;
    case 'seasonal':
      url = `${baseUrl}/seasonal/${slug}`;
      break;
    case 'tool':
      url = `${baseUrl}/tools/${slug}`;
      break;
    default:
      return { success: false, message: 'Invalid page type' };
  }

  return await submitUrlToIndexNow(url);
}

/**
 * Rate-limited batch submission for large URL sets
 * Submits URLs in batches with delays to avoid rate limiting
 */
export async function submitUrlsBatched(
  urls: string[], 
  batchSize: number = 1000, 
  delayMs: number = 1000
): Promise<IndexNowResponse[]> {
  const results: IndexNowResponse[] = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const result = await submitUrlsToIndexNow(batch);
    results.push(result);
    
    // Add delay between batches to avoid rate limiting
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return results;
}
