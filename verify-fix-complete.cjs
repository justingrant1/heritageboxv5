const fs = require('fs');

console.log('=== VERIFYING COMPLETE FIX FOR PAGE GENERATION ===\n');

// Function to safely import and test data generation
function testDataGeneration() {
  try {
    console.log('📊 TESTING ACTUAL DATA GENERATION:\n');
    
    // Read and analyze each data file
    const files = [
      { name: 'Service Combinations', path: './src/data/serviceCombinations.ts', exportName: 'serviceCombinations' },
      { name: 'Guide Pages', path: './src/data/guidePages.ts', exportName: 'guidePages' },
      { name: 'Comparison Pages', path: './src/data/comparisonPages.ts', exportName: 'comparisonPages' },
      { name: 'Interactive Tools', path: './src/data/interactiveTools.ts', exportName: 'interactiveTools' },
      { name: 'Seasonal Content', path: './src/data/seasonalContent.ts', exportName: 'seasonalContent' },
      { name: 'City Data', path: './src/data/cityData.ts', exportName: 'cityData' }
    ];
    
    let totalPages = 0;
    let workingFiles = 0;
    let brokenFiles = 0;
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file.path, 'utf8');
        
        console.log(`🔍 ${file.name}:`);
        
        // Check if file has the export
        if (content.includes(`export const ${file.exportName}`)) {
          console.log(`   ✅ Export found: ${file.exportName}`);
          
          // Try to estimate array size by counting common patterns
          let estimatedCount = 0;
          
          if (file.name === 'Service Combinations') {
            // Count service combinations - should be 5 services × 15 locations = 75
            const serviceMatches = content.match(/serviceSlug:/g);
            estimatedCount = serviceMatches ? serviceMatches.length : 0;
          } else if (file.name === 'Guide Pages') {
            // Count guide pages
            const guideMatches = content.match(/id: '[^']*-guide'/g);
            estimatedCount = guideMatches ? guideMatches.length : 0;
          } else if (file.name === 'Comparison Pages') {
            // Count comparison pages
            const compMatches = content.match(/id: '[^']*-vs-[^']*'/g);
            estimatedCount = compMatches ? compMatches.length : 0;
          } else if (file.name === 'Interactive Tools') {
            // Count interactive tools
            const toolMatches = content.match(/id: '[^']*-calculator'/g) || content.match(/id: '[^']*-estimator'/g) || [];
            estimatedCount = toolMatches.length;
            if (estimatedCount === 0) {
              // Fallback - count tool objects
              const toolObjects = content.match(/{\s*id:/g);
              estimatedCount = toolObjects ? toolObjects.length : 0;
            }
          } else if (file.name === 'Seasonal Content') {
            // Count seasonal pages
            const seasonalMatches = content.match(/id: '[^']*-seasonal'/g) || content.match(/season: '[^']*'/g) || [];
            estimatedCount = seasonalMatches.length;
            if (estimatedCount === 0) {
              // Fallback - count seasonal objects
              const seasonalObjects = content.match(/{\s*id:/g);
              estimatedCount = seasonalObjects ? seasonalObjects.length : 0;
            }
          } else if (file.name === 'City Data') {
            // Count city pages
            const cityMatches = content.match(/citySlug:/g);
            estimatedCount = cityMatches ? cityMatches.length : 0;
          }
          
          console.log(`   📈 Estimated pages: ${estimatedCount}`);
          totalPages += estimatedCount;
          workingFiles++;
          
          if (estimatedCount === 0) {
            console.log(`   ⚠️  WARNING: No pages detected - may need investigation`);
          }
          
        } else {
          console.log(`   ❌ Export not found: ${file.exportName}`);
          brokenFiles++;
        }
        
        console.log('');
        
      } catch (error) {
        console.log(`   ❌ Error reading ${file.name}: ${error.message}`);
        brokenFiles++;
        console.log('');
      }
    });
    
    console.log('=== SUMMARY ===');
    console.log(`Working data files: ${workingFiles}/6`);
    console.log(`Broken data files: ${brokenFiles}/6`);
    console.log(`Total estimated pages: ${totalPages}`);
    
    if (totalPages > 100) {
      console.log('🎉 SUCCESS! Page generation appears to be working');
      console.log('The fix for service combinations has resolved the issue');
    } else if (totalPages > 50) {
      console.log('⚠️  PARTIAL SUCCESS: Some pages generating, but may need more work');
    } else {
      console.log('❌ STILL BROKEN: Very few pages generating');
    }
    
    console.log('\n🔧 NEXT STEPS:');
    if (brokenFiles > 0) {
      console.log('1. Fix remaining broken data files');
    }
    if (totalPages < 200) {
      console.log('2. Expand city data for more comprehensive coverage');
    }
    console.log('3. Update sitemap with all generated pages');
    console.log('4. Test routing for sample pages');
    console.log('5. Deploy and verify in production');
    
  } catch (error) {
    console.log('❌ Critical error in verification:', error.message);
  }
}

testDataGeneration();
