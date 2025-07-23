// Since we can't directly import TypeScript, let's manually check what slugs should exist
// Based on the comparisonPages.ts logic

const serviceFormats = [
  { formatType: 'VHS Tapes', slug: 'vhs' },
  { formatType: 'Photos', slug: 'photos' },
  { formatType: '8mm Film', slug: '8mm-film' },
  { formatType: 'Hi8 Tapes', slug: 'hi8' },
  { formatType: 'MiniDV', slug: 'minidv' }
];

const locations = [
  { state: 'New York', slug: 'new-york' },
  { state: 'California', slug: 'california' },
  { state: 'Texas', slug: 'texas' },
  { state: 'Florida', slug: 'florida' }
];

const competitors = ['legacybox', 'capture', 'imemories'];

console.log('Expected Comparison Page Slugs (based on logic):');
console.log('Format: {service}-vs-{competitor}-{location}');
console.log('');

// Generate some example slugs
let count = 0;
for (const service of serviceFormats.slice(0, 2)) {
  for (const location of locations.slice(0, 2)) {
    for (const competitor of competitors.slice(0, 1)) {
      const slug = `${service.slug}-vs-${competitor}-${location.slug}`;
      console.log(`${++count}. ${slug}`);
    }
  }
}

console.log('\nLet\'s test one of these URLs...');
