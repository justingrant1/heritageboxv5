// Debug script to check comparison pages
const { comparisonPages } = require('./src/data/comparisonPages.ts');

console.log('Total comparison pages:', comparisonPages.length);
console.log('\nFirst 5 comparison page slugs:');
comparisonPages.slice(0, 5).forEach((page, index) => {
  console.log(`${index + 1}. ${page.slug}`);
});

console.log('\nLooking for California VHS pages:');
const californiaVHS = comparisonPages.filter(page => 
  page.slug.includes('california') && page.slug.includes('vhs')
);
californiaVHS.forEach(page => {
  console.log(`- ${page.slug}`);
});
