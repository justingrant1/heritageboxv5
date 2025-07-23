// Debug script to find actual working URLs
const fs = require('fs');

console.log('=== CHECKING ACTUAL DATA FOR WORKING URLS ===\n');

// Read the TypeScript files and extract data manually
try {
  // Interactive Tools
  const toolsFile = fs.readFileSync('./src/data/interactiveTools.ts', 'utf8');
  const toolSlugs = [];
  const toolMatches = toolsFile.match(/slug: '([^']+)'/g);
  if (toolMatches) {
    toolMatches.forEach(match => {
      const slug = match.match(/slug: '([^']+)'/)[1];
      toolSlugs.push(slug);
    });
  }
  
  console.log('=== INTERACTIVE TOOLS ===');
  toolSlugs.forEach(slug => {
    console.log(`https://heritagebox.com/tools/${slug}`);
  });
  console.log('');

  // Seasonal Content
  const seasonalFile = fs.readFileSync('./src/data/seasonalContent.ts', 'utf8');
  const seasonalSlugs = [];
  const seasonalMatches = seasonalFile.match(/slug: '([^']+)'/g);
  if (seasonalMatches) {
    seasonalMatches.forEach(match => {
      const slug = match.match(/slug: '([^']+)'/)[1];
      seasonalSlugs.push(slug);
    });
  }
  
  console.log('=== SEASONAL CONTENT ===');
  seasonalSlugs.forEach(slug => {
    console.log(`https://heritagebox.com/seasonal/${slug}`);
  });
  console.log('');

  // Service Formats
  const serviceFile = fs.readFileSync('./src/data/serviceFormats.ts', 'utf8');
  const serviceTypes = [];
  const serviceMatches = serviceFile.match(/formatType: '([^']+)'/g);
  if (serviceMatches) {
    serviceMatches.forEach(match => {
      const type = match.match(/formatType: '([^']+)'/)[1];
      serviceTypes.push(type.toLowerCase().replace(/\s+/g, '-'));
    });
  }
  
  console.log('=== SERVICE TYPES (for service pages) ===');
  serviceTypes.slice(0, 3).forEach(type => {
    console.log(`https://heritagebox.com/services/${type}`);
  });
  console.log('');

  // Location Data
  const locationFile = fs.readFileSync('./src/data/locationData.ts', 'utf8');
  const states = [];
  const stateMatches = locationFile.match(/state: '([^']+)'/g);
  if (stateMatches) {
    stateMatches.forEach(match => {
      const state = match.match(/state: '([^']+)'/)[1];
      states.push(state.toLowerCase().replace(/\s+/g, '-'));
    });
  }
  
  console.log('=== LOCATION PAGES ===');
  states.slice(0, 3).forEach(state => {
    console.log(`https://heritagebox.com/locations/${state}`);
  });
  console.log('');

  // Service + Location combinations
  console.log('=== SERVICE + LOCATION COMBINATIONS ===');
  if (serviceTypes.length > 0 && states.length > 0) {
    console.log(`https://heritagebox.com/services/${serviceTypes[0]}/${states[0]}`);
    console.log(`https://heritagebox.com/services/${serviceTypes[1]}/${states[1]}`);
  }
  console.log('');

  // City Data
  const cityFile = fs.readFileSync('./src/data/cityData.ts', 'utf8');
  const cities = [];
  const cityMatches = cityFile.match(/slug: '([^']+)'/g);
  if (cityMatches) {
    cityMatches.slice(0, 3).forEach(match => {
      const slug = match.match(/slug: '([^']+)'/)[1];
      cities.push(slug);
    });
  }
  
  console.log('=== CITY PAGES ===');
  cities.forEach(city => {
    console.log(`https://heritagebox.com/cities/${city}`);
  });
  console.log('');

  // Comparison Pages
  const comparisonFile = fs.readFileSync('./src/data/comparisonPages.ts', 'utf8');
  const comparisonSlugs = [];
  const compMatches = comparisonFile.match(/slug: '([^']+)'/g);
  if (compMatches) {
    compMatches.slice(0, 3).forEach(match => {
      const slug = match.match(/slug: '([^']+)'/)[1];
      comparisonSlugs.push(slug);
    });
  }
  
  console.log('=== COMPARISON PAGES ===');
  comparisonSlugs.forEach(slug => {
    console.log(`https://heritagebox.com/compare/${slug}`);
  });
  console.log('');

  // Guide Pages
  const guideFile = fs.readFileSync('./src/data/guidePages.ts', 'utf8');
  const guideSlugs = [];
  const guideMatches = guideFile.match(/slug: '([^']+)'/g);
  if (guideMatches) {
    guideMatches.slice(0, 3).forEach(match => {
      const slug = match.match(/slug: '([^']+)'/)[1];
      guideSlugs.push(slug);
    });
  }
  
  console.log('=== GUIDE PAGES ===');
  guideSlugs.forEach(slug => {
    console.log(`https://heritagebox.com/guides/${slug}`);
  });

} catch (error) {
  console.error('Error reading files:', error.message);
}
