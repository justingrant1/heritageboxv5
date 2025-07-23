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

// Generate corrected sitemap with proper URL formats
const generateCorrectedSitemap = () => {
  const baseUrl = 'https://heritagebox.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 1. Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' }
  ];

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // 2. Service pages
  serviceFormats.forEach(service => {
    sitemap += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // 3. Location pages
  locationData.forEach(location => {
    sitemap += `
  <url>
    <loc>${baseUrl}/locations/${location.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // 4. Service + Location combinations
  serviceFormats.forEach(service => {
    locationData.forEach(location => {
      sitemap += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${location.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>`;
    });
  });

  // 5. City pages
  cityData.forEach(city => {
    sitemap += `
  <url>
    <loc>${baseUrl}/cities/${city.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // 6. City + Service combinations
  cityData.forEach(city => {
    serviceFormats.forEach(service => {
      sitemap += `
  <url>
    <loc>${baseUrl}/cities/${city.slug}/${service.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
    });
  });

  // 7. CORRECTED Comparison pages - format: /compare/{service}-vs-{competitor}-{location}
  const topServices = ['vhs', 'photos', '8mm-film', 'slides', 'super8', 'hi8', 'minidv', 'digital8', 'negatives', 'audio-cassettes', 'vinyl-records', 'cds', 'dvds', 'floppy-disks', 'betamax'];
  const competitors = ['legacybox', 'capture', 'imemories', 'costco', 'walgreens', 'cvs'];
  const topLocations = ['california', 'texas', 'florida', 'new-york', 'pennsylvania'];

  topServices.forEach(service => {
    competitors.forEach(competitor => {
      topLocations.forEach(location => {
        sitemap += `
  <url>
    <loc>${baseUrl}/compare/${service}-vs-${competitor}-${location}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
      });
    });
  });

  // 8. CORRECTED Guide pages - format: /guides/how-to-{service}-{location}
  const guideServices = ['vhs', 'photos', '8mm-film', 'slides', 'super8', 'hi8', 'audio-cassettes', 'vinyl-records'];
  const guideLocations = ['california', 'texas', 'florida', 'new-york', 'illinois'];

  guideServices.forEach(service => {
    guideLocations.forEach(location => {
      sitemap += `
  <url>
    <loc>${baseUrl}/guides/how-to-${service}-${location}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`;
    });
  });

  // 9. CORRECTED Seasonal pages
  const seasonalPages = [
    'holiday-photo-digitization',
    'spring-cleaning-media-conversion', 
    'summer-vacation-memory-prep',
    'back-to-school-memories',
    'wedding-season-digitization',
    'graduation-memory-preservation',
    'new-year-organization',
    'fathers-day-gift-digitization'
  ];

  seasonalPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}/seasonal/${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`;
  });

  // 10. CORRECTED Interactive tools
  const toolPages = [
    'cost-calculator',
    'timeline-estimator',
    'photo-scanning-calculator',
    'format-compatibility-checker',
    'preservation-priority-quiz',
    'video-tape-assessment-tool'
  ];

  toolPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}/tools/${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Main execution
const main = () => {
  console.log('🔧 Fixing Sitemap URLs with Correct Formats');
  console.log('============================================');
  
  try {
    console.log('Generating corrected sitemap...');
    const correctedSitemap = generateCorrectedSitemap();
    
    // Save to public directory
    fs.writeFileSync('public/sitemap.xml', correctedSitemap);
    console.log('✅ Corrected sitemap saved to public/sitemap.xml');
    
    // Count URLs
    const urlCount = (correctedSitemap.match(/<loc>/g) || []).length;
    console.log(`📊 Total URLs in corrected sitemap: ${urlCount}`);
    
    console.log('\n🎯 URL Format Corrections Applied:');
    console.log('- Comparison pages: /compare/{service}-vs-{competitor}-{location}');
    console.log('- Guide pages: /guides/how-to-{service}-{location}');
    console.log('- Tool pages: /tools/{tool-name}');
    console.log('- All other pages: Using verified working formats');
    
    console.log('\n✅ SITEMAP FIXED SUCCESSFULLY!');
    console.log('Next step: Fix IndexNow submission script');
    
  } catch (error) {
    console.error('❌ Error fixing sitemap:', error);
  }
};

// Run the script
main();
