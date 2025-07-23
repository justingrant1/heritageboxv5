const fs = require('fs');

console.log('=== DEBUGGING SERVICE COMBINATIONS GENERATION ===\n');

// First, let's manually test the imports and data
console.log('1. Testing data imports...\n');

try {
  // Read the files as text and simulate the imports
  const serviceFormatsFile = fs.readFileSync('./src/data/serviceFormats.ts', 'utf8');
  const locationDataFile = fs.readFileSync('./src/data/locationData.ts', 'utf8');
  const serviceCombinationsFile = fs.readFileSync('./src/data/serviceCombinations.ts', 'utf8');

  // Check serviceFormats data
  console.log('📊 SERVICE FORMATS DATA:');
  const serviceMatches = serviceFormatsFile.match(/id: '[^']+'/g);
  if (serviceMatches) {
    console.log(`✅ Found ${serviceMatches.length} services:`);
    serviceMatches.forEach((match, i) => {
      const id = match.replace("id: '", '').replace("'", '');
      console.log(`  ${i+1}. ${id}`);
    });
  } else {
    console.log('❌ No service IDs found');
  }

  // Check which services should be "top services"
  console.log('\n🔍 CHECKING TOP SERVICES FILTER:');
  const topServiceTypes = ['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV'];
  console.log('Looking for these formatTypes:', topServiceTypes);
  
  topServiceTypes.forEach(type => {
    if (serviceFormatsFile.includes(`formatType: '${type}'`)) {
      console.log(`✅ Found: ${type}`);
    } else {
      console.log(`❌ Missing: ${type}`);
    }
  });

  // Check locationData
  console.log('\n📍 LOCATION DATA:');
  const locationMatches = locationDataFile.match(/id: '[^']+'/g);
  if (locationMatches) {
    console.log(`✅ Found ${locationMatches.length} locations:`);
    locationMatches.slice(0, 5).forEach((match, i) => {
      const id = match.replace("id: '", '').replace("'", '');
      console.log(`  ${i+1}. ${id}`);
    });
    if (locationMatches.length > 5) {
      console.log(`  ... and ${locationMatches.length - 5} more`);
    }
  } else {
    console.log('❌ No location IDs found');
  }

  // Check high digital adoption filter
  console.log('\n🔍 CHECKING HIGH DIGITAL ADOPTION FILTER:');
  const highAdoptionMatches = locationDataFile.match(/digitalAdoption: 'high'/g);
  console.log(`Found ${highAdoptionMatches ? highAdoptionMatches.length : 0} locations with high digital adoption`);

  // Check large population filter  
  const populationMatches = locationDataFile.match(/population: (\d+)/g);
  if (populationMatches) {
    console.log('\n📈 POPULATION ANALYSIS:');
    const populations = populationMatches.map(match => {
      const pop = parseInt(match.replace('population: ', ''));
      return pop;
    });
    const over7M = populations.filter(pop => pop > 7000000);
    console.log(`Locations with population > 7M: ${over7M.length}`);
    console.log(`Total locations: ${populations.length}`);
  }

  // Check the generation function logic
  console.log('\n🔧 GENERATION FUNCTION ANALYSIS:');
  if (serviceCombinationsFile.includes('generateServiceCombinations')) {
    console.log('✅ generateServiceCombinations function found');
    
    // Check the filtering logic
    if (serviceCombinationsFile.includes("['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV']")) {
      console.log('✅ Top services filter found');
    } else {
      console.log('❌ Top services filter not found or different');
    }
    
    if (serviceCombinationsFile.includes('digitalAdoption === \'high\'')) {
      console.log('✅ Digital adoption filter found');
    } else {
      console.log('❌ Digital adoption filter not found');
    }
    
    if (serviceCombinationsFile.includes('population > 7000000')) {
      console.log('✅ Population filter found');
    } else {
      console.log('❌ Population filter not found');
    }
  } else {
    console.log('❌ generateServiceCombinations function not found');
  }

  // Check if the export is happening
  console.log('\n📤 EXPORT ANALYSIS:');
  if (serviceCombinationsFile.includes('export const serviceCombinations = generateServiceCombinations()')) {
    console.log('✅ serviceCombinations export found');
  } else {
    console.log('❌ serviceCombinations export not found');
  }

  console.log('\n=== DIAGNOSIS ===');
  console.log('The issue is likely one of these:');
  console.log('1. Filtering criteria too restrictive (no locations meet both high adoption AND >7M population)');
  console.log('2. Service format filtering not matching actual formatType values');
  console.log('3. Import/export chain broken');
  console.log('4. Function execution failing silently');
  
  console.log('\n🔍 NEXT STEPS:');
  console.log('1. Check if any locations meet BOTH criteria (high adoption AND >7M pop)');
  console.log('2. Verify exact formatType strings match the filter');
  console.log('3. Test the generation function in isolation');

} catch (error) {
  console.log('❌ Error reading files:', error.message);
}
