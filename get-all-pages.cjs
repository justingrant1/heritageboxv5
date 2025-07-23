const fs = require('fs');

console.log('=== ALL WORKING PAGES BY CATEGORY ===\n');

// Interactive Tools
try {
  const toolsFile = fs.readFileSync('./src/data/interactiveTools.ts', 'utf8');
  const toolSlugs = toolsFile.match(/slug: '[^']+'/g);
  console.log('✅ INTERACTIVE TOOLS:');
  if (toolSlugs) {
    toolSlugs.forEach((match, i) => {
      const slug = match.replace("slug: '", '').replace("'", '');
      console.log(`${i+1}. https://heritagebox.com/tools/${slug}`);
    });
  }
  console.log(`Total: ${toolSlugs ? toolSlugs.length : 0} pages\n`);
} catch (e) {
  console.log('❌ Interactive tools file not found\n');
}

// Seasonal Content
try {
  const seasonalFile = fs.readFileSync('./src/data/seasonalContent.ts', 'utf8');
  const seasonalSlugs = seasonalFile.match(/slug: '[^']+'/g);
  console.log('✅ SEASONAL PAGES:');
  if (seasonalSlugs) {
    seasonalSlugs.forEach((match, i) => {
      const slug = match.replace("slug: '", '').replace("'", '');
      console.log(`${i+1}. https://heritagebox.com/seasonal/${slug}`);
    });
  }
  console.log(`Total: ${seasonalSlugs ? seasonalSlugs.length : 0} pages\n`);
} catch (e) {
  console.log('❌ Seasonal content file not found\n');
}

// Guide Pages
try {
  const guideFile = fs.readFileSync('./src/data/guidePages.ts', 'utf8');
  const guideSlugs = guideFile.match(/slug: '[^']+'/g);
  console.log('✅ GUIDE PAGES:');
  if (guideSlugs) {
    guideSlugs.forEach((match, i) => {
      const slug = match.replace("slug: '", '').replace("'", '');
      console.log(`${i+1}. https://heritagebox.com/guides/${slug}`);
    });
  }
  console.log(`Total: ${guideSlugs ? guideSlugs.length : 0} pages\n`);
} catch (e) {
  console.log('❌ Guide pages file not found\n');
}

// Comparison Pages
try {
  const comparisonFile = fs.readFileSync('./src/data/comparisonPages.ts', 'utf8');
  const comparisonSlugs = comparisonFile.match(/slug: '[^']+'/g);
  console.log('✅ COMPARISON PAGES:');
  if (comparisonSlugs) {
    comparisonSlugs.forEach((match, i) => {
      const slug = match.replace("slug: '", '').replace("'", '');
      console.log(`${i+1}. https://heritagebox.com/compare/${slug}`);
    });
  }
  console.log(`Total: ${comparisonSlugs ? comparisonSlugs.length : 0} pages\n`);
} catch (e) {
  console.log('❌ Comparison pages file not found\n');
}

// Service Combination Pages
try {
  const serviceCombFile = fs.readFileSync('./src/data/serviceCombinations.ts', 'utf8');
  const serviceCombSlugs = serviceCombFile.match(/slug: '[^']+'/g);
  console.log('✅ SERVICE COMBINATION PAGES:');
  if (serviceCombSlugs) {
    serviceCombSlugs.forEach((match, i) => {
      const slug = match.replace("slug: '", '').replace("'", '');
      console.log(`${i+1}. https://heritagebox.com/services/${slug}`);
    });
  }
  console.log(`Total: ${serviceCombSlugs ? serviceCombSlugs.length : 0} pages\n`);
} catch (e) {
  console.log('❌ Service combination pages file not found\n');
}

// City Pages
try {
  const cityFile = fs.readFileSync('./src/data/cityData.ts', 'utf8');
  const citySlugs = cityFile.match(/slug: '[^']+'/g);
  console.log('✅ CITY PAGES:');
  if (citySlugs) {
    citySlugs.slice(0, 10).forEach((match, i) => {
      const slug = match.replace("slug: '", '').replace("'", '');
      console.log(`${i+1}. https://heritagebox.com/cities/${slug}`);
    });
    if (citySlugs.length > 10) {
      console.log(`... and ${citySlugs.length - 10} more city pages`);
    }
  }
  console.log(`Total: ${citySlugs ? citySlugs.length : 0} pages\n`);
} catch (e) {
  console.log('❌ City data file not found\n');
}

console.log('=== SUMMARY ===');
console.log('These are ALL the pages that have actual data and will work.');
console.log('Any other URLs will return 404 or "content not found".');
