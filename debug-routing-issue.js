// Debug the routing issue for service combination pages
console.log('=== DEBUGGING ROUTING ISSUE ===\n');

// Test the URL patterns and data matching
const testUrls = [
  '/services/vhs/california',
  '/services/hi8/texas',
  '/services/photos/florida'
];

console.log('Testing URL patterns:');
testUrls.forEach(url => {
  const parts = url.split('/');
  const serviceSlug = parts[2];
  const locationSlug = parts[3];
  
  console.log(`URL: ${url}`);
  console.log(`  Service Slug: ${serviceSlug}`);
  console.log(`  Location Slug: ${locationSlug}`);
  console.log('');
});

// Check if the issue is in the ServiceCombinationPage component
console.log('Potential issues to check:');
console.log('1. getServiceCombination function not finding matches');
console.log('2. getLocationByState function not working with slug format');
console.log('3. serviceFormats.find not matching correctly');
console.log('4. Route parameter extraction issue');

console.log('\nNext steps:');
console.log('1. Add debug logging to ServiceCombinationPage');
console.log('2. Test the lookup functions directly');
console.log('3. Verify slug formatting consistency');
