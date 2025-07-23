// Test the actual generation by importing the TypeScript module
import { serviceCombinations, comparisonPages } from './src/data/serviceCombinations.ts';
import { guidePages } from './src/data/guidePages.ts';
import { cityData } from './src/data/cityData.ts';
import { seasonalContent } from './src/data/seasonalContent.ts';
import { interactiveTools } from './src/data/interactiveTools.ts';

console.log('=== TESTING ACTUAL TYPESCRIPT GENERATION ===\n');

console.log('📊 SERVICE COMBINATIONS:');
console.log(`   Generated: ${serviceCombinations.length} pages`);
if (serviceCombinations.length > 0) {
  console.log('   Sample pages:');
  serviceCombinations.slice(0, 5).forEach((combo, i) => {
    console.log(`   ${i+1}. ${combo.id} - ${combo.seoData.title}`);
  });
}

console.log('\n📊 COMPARISON PAGES:');
console.log(`   Generated: ${comparisonPages.length} pages`);
if (comparisonPages.length > 0) {
  console.log('   Sample pages:');
  comparisonPages.slice(0, 3).forEach((comp, i) => {
    console.log(`   ${i+1}. ${comp.id} - ${comp.title}`);
  });
}

console.log('\n📊 GUIDE PAGES:');
console.log(`   Generated: ${guidePages.length} pages`);

console.log('\n📊 CITY DATA:');
console.log(`   Generated: ${cityData.length} pages`);

console.log('\n📊 SEASONAL CONTENT:');
console.log(`   Generated: ${seasonalContent.length} pages`);

console.log('\n📊 INTERACTIVE TOOLS:');
console.log(`   Generated: ${interactiveTools.length} pages`);

const totalPages = serviceCombinations.length + comparisonPages.length + guidePages.length + 
                  cityData.length + seasonalContent.length + interactiveTools.length;

console.log('\n=== SUMMARY ===');
console.log(`Total pages generated: ${totalPages}`);

if (serviceCombinations.length === 75) {
  console.log('✅ SERVICE COMBINATIONS: Perfect! 75 pages generated (5 services × 15 locations)');
} else {
  console.log(`❌ SERVICE COMBINATIONS: Expected 75, got ${serviceCombinations.length}`);
}

if (totalPages > 100) {
  console.log('✅ OVERALL: Excellent page generation for programmatic SEO');
} else if (totalPages > 50) {
  console.log('⚠️ OVERALL: Good page generation, could be expanded');
} else {
  console.log('❌ OVERALL: Low page count, needs investigation');
}
