const fs = require('fs');

console.log('=== TESTING FIXED SERVICE COMBINATIONS GENERATION ===\n');

try {
  // Read the updated serviceCombinations file
  const serviceCombinationsFile = fs.readFileSync('./src/data/serviceCombinations.ts', 'utf8');
  
  console.log('🔧 CHECKING UPDATED FILTERING LOGIC:');
  
  // Check if the old restrictive filter is gone
  if (serviceCombinationsFile.includes('digitalAdoption === \'high\' ||')) {
    console.log('❌ Old restrictive filter still present');
  } else {
    console.log('✅ Old restrictive filter removed');
  }
  
  // Check if new population-based sorting is present
  if (serviceCombinationsFile.includes('.sort((a, b) => b.population - a.population)')) {
    console.log('✅ New population-based sorting found');
  } else {
    console.log('❌ New population-based sorting not found');
  }
  
  if (serviceCombinationsFile.includes('.slice(0, 15)')) {
    console.log('✅ Top 15 locations filter found');
  } else {
    console.log('❌ Top 15 locations filter not found');
  }
  
  console.log('\n📊 EXPECTED GENERATION CALCULATION:');
  console.log('Top services: 5 (VHS, Photos, 8mm Film, Hi8, MiniDV)');
  console.log('Top locations: 15 (by population)');
  console.log('Expected service combinations: 5 × 15 = 75 pages');
  
  console.log('\n🔍 TESTING DEPENDENT PAGES:');
  
  // Test guidePages
  const guideFile = fs.readFileSync('./src/data/guidePages.ts', 'utf8');
  if (guideFile.includes('getTopServiceCombinations(20)')) {
    console.log('✅ Guide pages should generate ~20 pages (from top service combinations)');
  }
  
  // Test comparisonPages  
  const comparisonFile = fs.readFileSync('./src/data/comparisonPages.ts', 'utf8');
  if (comparisonFile.includes('getTopServiceCombinations(15)')) {
    console.log('✅ Comparison pages should generate ~45 pages (15 combinations × 3 competitors)');
  }
  
  console.log('\n📈 PROJECTED RESULTS AFTER FIX:');
  console.log('Service Combinations: 75 pages (was 0)');
  console.log('Guide Pages: ~20 pages (was 0)');
  console.log('Comparison Pages: ~45 pages (was 0)');
  console.log('Interactive Tools: 4 pages (unchanged)');
  console.log('Seasonal Content: 4 pages (unchanged)');
  console.log('City Data: Still needs to be created');
  console.log('');
  console.log('TOTAL EXPECTED: ~148 pages (up from 8 pages)');
  console.log('INCREASE: +140 pages');
  
  console.log('\n🚀 NEXT STEPS:');
  console.log('1. Test the actual generation with a verification script');
  console.log('2. Create city data for additional ~200 pages');
  console.log('3. Verify all pages have proper routing');
  console.log('4. Update sitemap with new pages');
  
} catch (error) {
  console.log('❌ Error:', error.message);
}
