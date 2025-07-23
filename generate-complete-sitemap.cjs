const fs = require('fs');
const path = require('path');

// Import data (simulated - in real implementation these would be imported from the actual files)
const serviceFormats = [
  'vhs', 'vhs-c', 'hi8', 'digital8', 'minidv', '8mm-film', 'super8', '16mm-film', 
  'photos', 'slides', 'negatives', 'audio-cassettes', 'vinyl-records', 'cds', 'dvds',
  'floppy-disks', 'zip-disks', 'external-drives', 'documents', 'betamax'
]; // 20 services

const locationData = [
  'california', 'texas', 'florida', 'new-york', 'pennsylvania', 'illinois', 'ohio', 
  'georgia', 'north-carolina', 'michigan', 'new-jersey', 'virginia', 'washington', 
  'arizona', 'massachusetts', 'tennessee', 'indiana', 'maryland', 'missouri', 'wisconsin'
]; // 20 states

const cityData = [
  'los-angeles', 'new-york', 'chicago', 'houston', 'phoenix', 'philadelphia', 
  'san-antonio', 'san-diego', 'dallas', 'san-jose', 'austin', 'jacksonville',
  'fort-worth', 'columbus', 'charlotte', 'san-francisco', 'indianapolis', 
  'seattle', 'denver', 'washington-dc', 'boston', 'el-paso', 'detroit', 
  'nashville', 'portland', 'memphis', 'oklahoma-city', 'las-vegas', 
  'louisville', 'baltimore', 'milwaukee', 'albuquerque', 'tucson', 'fresno',
  'mesa', 'sacramento', 'atlanta', 'kansas-city', 'colorado-springs', 'omaha',
  'raleigh', 'miami', 'oakland', 'minneapolis', 'tulsa', 'cleveland', 
  'wichita', 'arlington', 'new-orleans', 'bakersfield'
]; // 50 cities

const comparisonCompetitors = ['legacybox', 'costco', 'walgreens', 'cvs'];
const comparisonTypes = ['professional-vs-diy', 'vhs-vs-digital', 'film-vs-digital'];

const guidePages = [
  'vhs-to-digital-conversion-guide', 'photo-scanning-guide', 'slide-digitization-guide',
  'film-transfer-guide', 'audio-cassette-conversion-guide', 'vinyl-record-digitization-guide',
  'home-movie-preservation-guide', 'family-photo-organization-guide', 'vintage-media-restoration-guide',
  'digital-photo-backup-guide', 'memory-preservation-checklist', 'choosing-digitization-service-guide',
  'preparing-media-for-conversion-guide', 'digital-file-formats-guide', 'photo-resolution-guide'
]; // 15 guides

const seasonalContent = [
  'holiday-photo-digitization', 'spring-cleaning-media-conversion', 'summer-vacation-memory-prep',
  'back-to-school-memories', 'wedding-season-digitization', 'graduation-memory-preservation',
  'new-year-organization', 'fathers-day-gift-digitization'
]; // 8 seasonal

const interactiveTools = [
  'cost-calculator', 'timeline-estimator', 'photo-scanning-calculator',
  'format-compatibility-checker', 'preservation-priority-quiz', 'video-tape-assessment-tool'
]; // 6 tools

function generateSitemap() {
  const baseUrl = 'https://heritagebox.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let urls = [];
  
  // Static pages (5)
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' }
  ];
  
  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.url}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  // Service pages (20)
  serviceFormats.forEach(service => {
    urls.push({
      url: `${baseUrl}/services/${service}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    });
  });
  
  // Location pages (20)
  locationData.forEach(location => {
    urls.push({
      url: `${baseUrl}/locations/${location}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });
  
  // Service + Location combinations (20 × 20 = 400)
  serviceFormats.forEach(service => {
    locationData.forEach(location => {
      urls.push({
        url: `${baseUrl}/services/${service}/${location}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.95'
      });
    });
  });
  
  // City pages (50)
  cityData.forEach(city => {
    urls.push({
      url: `${baseUrl}/cities/${city}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });
  
  // City + Service combinations (50 × 20 = 1,000)
  cityData.forEach(city => {
    serviceFormats.forEach(service => {
      urls.push({
        url: `${baseUrl}/cities/${city}/${service}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: '0.85'
      });
    });
  });
  
  // Comparison pages - HeritageBox vs Competitors (4 competitors × 15 top combinations = 60)
  const topServiceLocationCombinations = [
    'vhs-california', 'vhs-texas', 'vhs-florida', 'photos-california', 'photos-texas',
    'photos-new-york', 'slides-california', 'slides-florida', 'slides-texas',
    'super8-california', 'super8-new-york', 'super8-texas', '8mm-film-california',
    '8mm-film-florida', '8mm-film-new-york'
  ];
  
  comparisonCompetitors.forEach(competitor => {
    topServiceLocationCombinations.forEach(combination => {
      urls.push({
        url: `${baseUrl}/compare/${combination}-vs-${competitor}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.9'
      });
    });
  });
  
  // General comparison pages (3)
  comparisonTypes.forEach(comparison => {
    urls.push({
      url: `${baseUrl}/compare/${comparison}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9'
    });
  });
  
  // Guide pages (15)
  guidePages.forEach(guide => {
    urls.push({
      url: `${baseUrl}/guides/${guide}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.85'
    });
  });
  
  // Seasonal content pages (8)
  seasonalContent.forEach(seasonal => {
    urls.push({
      url: `${baseUrl}/seasonal/${seasonal}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.85'
    });
  });
  
  // Interactive tool pages (6)
  interactiveTools.forEach(tool => {
    urls.push({
      url: `${baseUrl}/tools/${tool}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    });
  });
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(urlData => {
    xml += '  <url>\n';
    xml += `    <loc>${urlData.url}</loc>\n`;
    xml += `    <lastmod>${urlData.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${urlData.changefreq}</changefreq>\n`;
    xml += `    <priority>${urlData.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  // Write to file
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  
  // Ensure public directory exists
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(sitemapPath, xml);
  
  console.log(`✅ Complete sitemap generated with ${urls.length} URLs`);
  console.log(`📊 URL Breakdown:`);
  console.log(`   Static pages: 5`);
  console.log(`   Service pages: ${serviceFormats.length}`);
  console.log(`   Location pages: ${locationData.length}`);
  console.log(`   Service + Location combinations: ${serviceFormats.length * locationData.length}`);
  console.log(`   City pages: ${cityData.length}`);
  console.log(`   City + Service combinations: ${cityData.length * serviceFormats.length}`);
  console.log(`   Comparison pages: ${comparisonCompetitors.length * topServiceLocationCombinations.length + comparisonTypes.length}`);
  console.log(`   Guide pages: ${guidePages.length}`);
  console.log(`   Seasonal content: ${seasonalContent.length}`);
  console.log(`   Interactive tools: ${interactiveTools.length}`);
  console.log(`   TOTAL: ${urls.length} URLs`);
  
  return urls.length;
}

// Run the generator
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
