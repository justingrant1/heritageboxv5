const fs = require('fs');

console.log('=== DEBUGGING SERVICE FILTERING ISSUE ===\n');

try {
  // Read serviceFormats to check the actual data structure
  const serviceFormatsContent = fs.readFileSync('./src/data/serviceFormats.ts', 'utf8');
  
  console.log('🔍 ANALYZING SERVICE FORMATS DATA:\n');
  
  // Extract all service objects
  const serviceBlocks = serviceFormatsContent.split('{').slice(1);
  
  console.log('📊 ALL SERVICES IN serviceFormats:');
  let allServices = [];
  let topServiceMatches = [];
  
  serviceBlocks.forEach((block, index) => {
    if (block.includes('id:') && block.includes('formatType:')) {
      const idMatch = block.match(/id: '([^']+)'/);
      const formatTypeMatch = block.match(/formatType: '([^']+)'/);
      const displayNameMatch = block.match(/displayName: '([^']+)'/);
      
      if (idMatch && formatTypeMatch) {
        const service = {
          id: idMatch[1],
          formatType: formatTypeMatch[1],
          displayName: displayNameMatch ? displayNameMatch[1] : 'Unknown'
        };
        
        allServices.push(service);
        console.log(`${index}. ${service.formatType} (${service.id}) - "${service.displayName}"`);
        
        // Check if this matches our filter
        const topServiceTypes = ['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV'];
        if (topServiceTypes.includes(service.formatType)) {
          topServiceMatches.push(service);
          console.log(`   ✅ MATCHES TOP SERVICE FILTER`);
        } else {
          console.log(`   ❌ Does not match filter`);
        }
      }
    }
  });
  
  console.log(`\n📈 FILTERING RESULTS:`);
  console.log(`Total services found: ${allServices.length}`);
  console.log(`Services matching top filter: ${topServiceMatches.length}`);
  
  if (topServiceMatches.length !== 5) {
    console.log(`\n🚨 PROBLEM IDENTIFIED!`);
    console.log(`Expected 5 top services, but found ${topServiceMatches.length}`);
    console.log(`This explains why only ${topServiceMatches.length} combinations are generated!`);
    
    console.log(`\n🔍 TOP SERVICES THAT MATCHED:`);
    topServiceMatches.forEach((service, i) => {
      console.log(`${i+1}. ${service.formatType} (${service.displayName})`);
    });
    
    console.log(`\n🔍 EXPECTED TOP SERVICES:`);
    const expected = ['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV'];
    expected.forEach((type, i) => {
      const found = topServiceMatches.find(s => s.formatType === type);
      console.log(`${i+1}. ${type} - ${found ? '✅ Found' : '❌ Missing'}`);
    });
    
    console.log(`\n💡 POSSIBLE CAUSES:`);
    console.log(`1. formatType values don't exactly match the filter strings`);
    console.log(`2. Case sensitivity issues`);
    console.log(`3. Extra spaces or characters in formatType`);
    console.log(`4. Services are missing from serviceFormats data`);
    
  } else {
    console.log(`\n✅ Service filtering appears correct`);
    console.log(`The issue must be in location filtering or the nested loops`);
  }
  
  // Also check location data briefly
  console.log(`\n🔍 QUICK LOCATION CHECK:`);
  const locationContent = fs.readFileSync('./src/data/locationData.ts', 'utf8');
  const locationBlocks = locationContent.split('{').slice(1);
  const locationCount = locationBlocks.filter(block => 
    block.includes('id:') && block.includes('state:')
  ).length;
  
  console.log(`Total locations found: ${locationCount}`);
  console.log(`Expected after filtering: 15 (top by population)`);
  
  if (topServiceMatches.length > 0 && locationCount >= 15) {
    console.log(`\n🤔 MYSTERY:`);
    console.log(`Both services (${topServiceMatches.length}) and locations (${locationCount}) exist`);
    console.log(`Expected combinations: ${topServiceMatches.length} × 15 = ${topServiceMatches.length * 15}`);
    console.log(`Actual combinations: 5`);
    console.log(`This suggests the nested loops or data processing is failing`);
  }
  
} catch (error) {
  console.log('❌ Error:', error.message);
}
