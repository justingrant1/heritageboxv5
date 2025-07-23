const { comparisonPages } = require('./src/data/comparisonPages.ts');

console.log('Generated Comparison Pages:');
console.log('Total pages:', comparisonPages.length);
console.log('\nFirst 10 comparison page slugs:');
comparisonPages.slice(0, 10).forEach((page, index) => {
  console.log(`${index + 1}. ${page.slug}`);
});

console.log('\nLegacyBox comparison pages:');
const legacyBoxPages = comparisonPages.filter(page => page.competitor === 'LegacyBox');
legacyBoxPages.slice(0, 5).forEach((page, index) => {
  console.log(`${index + 1}. ${page.slug}`);
});
