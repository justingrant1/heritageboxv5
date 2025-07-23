const fs = require('fs');

console.log('=== TESTING GENERATION FUNCTION IN ISOLATION ===\n');

// Create a simplified version of the generation function with error handling
function testGeneration() {
  try {
    console.log('🔧 SIMULATING SERVICE COMBINATIONS GENERATION:\n');
    
    // Mock the data structures based on what we found
    const mockServices = [
      { formatType: 'VHS', displayName: 'VHS Tape Digitization', id: 'vhs' },
      { formatType: 'Hi8', displayName: 'Hi8 Tape Digitization', id: 'hi8' },
      { formatType: 'MiniDV', displayName: 'MiniDV Tape Digitization', id: 'minidv' },
      { formatType: '8mm Film', displayName: '8mm Film Transfer', id: '8mm-film' },
      { formatType: 'Photos', displayName: 'Photo Scanning Service', id: 'photos' }
    ];
    
    const mockLocations = [
      { state: 'California', population: 39538223, id: 'california' },
      { state: 'Texas', population: 29145505, id: 'texas' },
      { state: 'Florida', population: 21538187, id: 'florida' },
      { state: 'New York', population: 20201249, id: 'new-york' },
      { state: 'Pennsylvania', population: 13002700, id: 'pennsylvania' }
    ];
    
    console.log('📊 MOCK DATA:');
    console.log(`Services: ${mockServices.length}`);
    console.log(`Locations: ${mockLocations.length}`);
    
    // Test the filtering logic
    console.log('\n🔍 TESTING SERVICE FILTERING:');
    const topServiceTypes = ['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV'];
    const topServices = mockServices.filter(service => 
      topServiceTypes.includes(service.formatType)
    );
    console.log(`Filtered services: ${topServices.length}`);
    topServices.forEach((service, i) => {
      console.log(`  ${i+1}. ${service.formatType} (${service.id})`);
    });
    
    // Test the location filtering
    console.log('\n🔍 TESTING LOCATION FILTERING:');
    const topMarkets = mockLocations
      .sort((a, b) => b.population - a.population)
      .slice(0, 15); // This will just be all 5 since we only have 5 mock locations
    console.log(`Filtered locations: ${topMarkets.length}`);
    topMarkets.forEach((location, i) => {
      console.log(`  ${i+1}. ${location.state} (${location.population.toLocaleString()})`);
    });
    
    // Test the nested loops
    console.log('\n🔧 TESTING NESTED LOOPS:');
    const combinations = [];
    let loopCount = 0;
    
    topServices.forEach((service, serviceIndex) => {
      console.log(`\n  Processing service ${serviceIndex + 1}: ${service.formatType}`);
      
      topMarkets.forEach((location, locationIndex) => {
        loopCount++;
        console.log(`    Processing location ${locationIndex + 1}: ${location.state}`);
        
        // Simulate the combination creation
        const combination = {
          id: `${service.id}-${location.id}`,
          serviceSlug: service.id,
          locationSlug: location.id,
          serviceName: service.displayName,
          locationName: location.state
        };
        
        combinations.push(combination);
        console.log(`      Created: ${combination.id}`);
      });
    });
    
    console.log(`\n📈 RESULTS:`);
    console.log(`Total loop iterations: ${loopCount}`);
    console.log(`Total combinations created: ${combinations.length}`);
    console.log(`Expected: ${topServices.length} × ${topMarkets.length} = ${topServices.length * topMarkets.length}`);
    
    if (combinations.length === topServices.length * topMarkets.length) {
      console.log('✅ Nested loops working correctly in isolation');
      console.log('\n🤔 This means the issue is likely:');
      console.log('1. Import/export chain broken in the actual file');
      console.log('2. TypeScript compilation error');
      console.log('3. Runtime error in the actual function');
      console.log('4. Data format mismatch in real data vs expected format');
    } else {
      console.log('❌ Even the isolated test is failing');
    }
    
    console.log('\n🔍 SAMPLE COMBINATIONS:');
    combinations.slice(0, 5).forEach((combo, i) => {
      console.log(`${i+1}. ${combo.id} (${combo.serviceName} in ${combo.locationName})`);
    });
    
    return combinations;
    
  } catch (error) {
    console.log('❌ Error in isolated test:', error.message);
    console.log('Stack:', error.stack);
  }
}

// Run the test
const result = testGeneration();

console.log('\n🔧 NEXT STEPS:');
console.log('1. If isolated test works, the issue is in the actual file');
console.log('2. Add console.log statements to the real generation function');
console.log('3. Check for TypeScript compilation errors');
console.log('4. Verify the actual data format matches expectations');
