const fs = require('fs');

console.log('=== DEBUGGING ACTUAL SERVICE COMBINATIONS GENERATION ===\n');

try {
  // Read the serviceCombinations file and try to understand what's happening
  const content = fs.readFileSync('./src/data/serviceCombinations.ts', 'utf8');
  
  console.log('🔍 ANALYZING GENERATION FUNCTION:\n');
  
  // Extract the generation function
  const functionStart = content.indexOf('export const generateServiceCombinations');
  const functionEnd = content.indexOf('export const serviceCombinations = generateServiceCombinations()');
  
  if (functionStart !== -1 && functionEnd !== -1) {
    const functionCode = content.substring(functionStart, functionEnd);
    console.log('✅ Found generation function');
    
    // Check the filtering logic
    if (functionCode.includes('.sort((a, b) => b.population - a.population)')) {
      console.log('✅ Population sorting found');
    } else {
      console.log('❌ Population sorting missing');
    }
    
    if (functionCode.includes('.slice(0, 15)')) {
      console.log('✅ Top 15 slice found');
    } else {
      console.log('❌ Top 15 slice missing');
    }
    
    // Check service filtering
    if (functionCode.includes("['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV']")) {
      console.log('✅ Top services filter found');
    } else {
      console.log('❌ Top services filter missing or different');
    }
    
    // Check the loops
    if (functionCode.includes('topServices.forEach') && functionCode.includes('topMarkets.forEach')) {
      console.log('✅ Nested loops found');
    } else {
      console.log('❌ Nested loops missing');
    }
    
  } else {
    console.log('❌ Could not extract generation function');
  }
  
  console.log('\n🔍 CHECKING ACTUAL EXPORT:\n');
  
  // Look at what's actually being exported
  const exportMatch = content.match(/export const serviceCombinations = ([^;]+);/);
  if (exportMatch) {
    console.log('✅ Export statement found:', exportMatch[1]);
  } else {
    console.log('❌ Export statement not found');
  }
  
  console.log('\n🔍 COUNTING ACTUAL GENERATED DATA:\n');
  
  // Try to count the actual objects in the generated data
  // Look for patterns that indicate generated combinations
  const serviceSlugMatches = content.match(/serviceSlug:/g);
  const locationSlugMatches = content.match(/locationSlug:/g);
  const idMatches = content.match(/id: `[^`]+`/g);
  
  console.log(`serviceSlug occurrences: ${serviceSlugMatches ? serviceSlugMatches.length : 0}`);
  console.log(`locationSlug occurrences: ${locationSlugMatches ? locationSlugMatches.length : 0}`);
  console.log(`id template literals: ${idMatches ? idMatches.length : 0}`);
  
  // The issue might be that the function is defined but not actually generating data
  // Let's check if there are any syntax errors or issues
  
  console.log('\n🔍 CHECKING FOR POTENTIAL ISSUES:\n');
  
  // Check imports
  if (content.includes("import { serviceFormats, formatSlug } from './serviceFormats'")) {
    console.log('✅ serviceFormats import found');
  } else {
    console.log('❌ serviceFormats import missing or incorrect');
  }
  
  if (content.includes("import { allLocationData, formatLocationSlug } from './locationData'")) {
    console.log('✅ locationData import found');
  } else {
    console.log('❌ locationData import missing or incorrect');
  }
  
  // Check if the function is actually being called
  if (content.includes('generateServiceCombinations()')) {
    console.log('✅ Function is being called');
  } else {
    console.log('❌ Function is not being called');
  }
  
  console.log('\n💡 HYPOTHESIS:');
  console.log('The function might be defined correctly but:');
  console.log('1. Import dependencies might be broken');
  console.log('2. The function might be throwing an error silently');
  console.log('3. The data might not be matching the expected format');
  console.log('4. TypeScript compilation might be failing');
  
  console.log('\n🔧 NEXT STEPS:');
  console.log('1. Check if serviceFormats and locationData are properly imported');
  console.log('2. Test the function in isolation');
  console.log('3. Add error handling to see what\'s failing');
  console.log('4. Verify the data format matches expectations');
  
} catch (error) {
  console.log('❌ Error:', error.message);
}
