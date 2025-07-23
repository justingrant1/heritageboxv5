const fs = require('fs');

console.log('=== DEBUGGING LOCATION FILTERING CRITERIA ===\n');

try {
  const locationDataFile = fs.readFileSync('./src/data/locationData.ts', 'utf8');
  
  // Extract location data manually
  console.log('🔍 ANALYZING WHICH LOCATIONS MEET BOTH CRITERIA:\n');
  console.log('Criteria: digitalAdoption === "high" AND population > 7,000,000\n');
  
  // Find all location blocks
  const locationBlocks = locationDataFile.split('{').slice(1); // Skip first split
  
  let qualifyingLocations = [];
  let totalLocations = 0;
  
  locationBlocks.forEach(block => {
    if (block.includes('id:') && block.includes('state:')) {
      totalLocations++;
      
      // Extract key data
      const idMatch = block.match(/id: '([^']+)'/);
      const stateMatch = block.match(/state: '([^']+)'/);
      const populationMatch = block.match(/population: (\d+)/);
      const digitalAdoptionMatch = block.match(/digitalAdoption: '([^']+)'/);
      
      if (idMatch && stateMatch && populationMatch && digitalAdoptionMatch) {
        const id = idMatch[1];
        const state = stateMatch[1];
        const population = parseInt(populationMatch[1]);
        const digitalAdoption = digitalAdoptionMatch[1];
        
        console.log(`📍 ${state} (${id}):`);
        console.log(`   Population: ${population.toLocaleString()}`);
        console.log(`   Digital Adoption: ${digitalAdoption}`);
        
        const meetsPopulation = population > 7000000;
        const meetsDigital = digitalAdoption === 'high';
        
        console.log(`   Meets Population (>7M): ${meetsPopulation ? '✅' : '❌'}`);
        console.log(`   Meets Digital (high): ${meetsDigital ? '✅' : '❌'}`);
        
        if (meetsPopulation && meetsDigital) {
          console.log(`   🎯 QUALIFIES FOR GENERATION!`);
          qualifyingLocations.push({ id, state, population, digitalAdoption });
        } else {
          console.log(`   ❌ Does not qualify`);
        }
        console.log('');
      }
    }
  });
  
  console.log('=== SUMMARY ===');
  console.log(`Total locations analyzed: ${totalLocations}`);
  console.log(`Locations meeting BOTH criteria: ${qualifyingLocations.length}`);
  
  if (qualifyingLocations.length === 0) {
    console.log('\n🚨 PROBLEM IDENTIFIED!');
    console.log('NO locations meet both criteria (high digital adoption AND >7M population)');
    console.log('This explains why serviceCombinations generates 0 pages!');
    
    console.log('\n💡 SOLUTIONS:');
    console.log('1. Relax population filter (e.g., >5M instead of >7M)');
    console.log('2. Remove digital adoption requirement');
    console.log('3. Use OR instead of AND (high adoption OR large population)');
    console.log('4. Use top 10-15 locations by population regardless of digital adoption');
  } else {
    console.log('\n✅ Qualifying locations:');
    qualifyingLocations.forEach((loc, i) => {
      console.log(`${i+1}. ${loc.state} (${loc.population.toLocaleString()}, ${loc.digitalAdoption})`);
    });
  }
  
  // Also check what happens if we relax the criteria
  console.log('\n🔧 ALTERNATIVE FILTERING ANALYSIS:');
  
  // Count high digital adoption only
  const highDigitalCount = locationBlocks.filter(block => 
    block.includes("digitalAdoption: 'high'")
  ).length;
  
  // Count >5M population
  const over5MCount = locationBlocks.filter(block => {
    const popMatch = block.match(/population: (\d+)/);
    return popMatch && parseInt(popMatch[1]) > 5000000;
  }).length;
  
  console.log(`Locations with high digital adoption: ${highDigitalCount}`);
  console.log(`Locations with >5M population: ${over5MCount}`);
  console.log(`Locations with >7M population: 15 (from previous analysis)`);
  
} catch (error) {
  console.log('❌ Error:', error.message);
}
