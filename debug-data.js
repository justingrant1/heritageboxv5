// Debug script to check data generation
import { serviceCombinations, getTopServiceCombinations } from './src/data/serviceCombinations.ts';
import { comparisonPages } from './src/data/comparisonPages.ts';

console.log('=== Service Combinations ===');
console.log('Total service combinations:', serviceCombinations.length);
console.log('Top 5 combinations:');
getTopServiceCombinations(5).forEach((combo, i) => {
  console.log(`${i+1}. ${combo.serviceSlug} + ${combo.locationSlug}`);
  console.log(`   Service: ${combo.serviceName} in ${combo.locationName}`);
});

console.log('\n=== Comparison Pages ===');
console.log('Total comparison pages:', comparisonPages.length);
console.log('First 5 comparison page slugs:');
comparisonPages.slice(0, 5).forEach((page, index) => {
  console.log(`${index + 1}. ${page.slug}`);
});

console.log('\nLooking for California VHS pages:');
const californiaVHS = comparisonPages.filter(page => 
  page.slug.includes('california') && page.slug.includes('vhs')
);
console.log('Found', californiaVHS.length, 'California VHS comparison pages:');
californiaVHS.forEach(page => {
  console.log(`- ${page.slug}`);
});
