export interface LocationData {
  id: string;
  state: string;
  stateCode: string;
  displayName: string;
  majorCities: string[];
  population: number;
  shippingInfo: {
    averageTransitTime: string;
    pickupAvailable: boolean;
    rushAvailable: boolean;
  };
  localCompetitors: string[];
  marketInsights: {
    digitalAdoption: 'high' | 'medium' | 'low';
    avgHouseholdIncome: number;
    targetDemographic: string;
  };
  seoData: {
    keywords: string[];
    localModifiers: string[];
  };
}

export const locationData: LocationData[] = [
  {
    id: 'california',
    state: 'California',
    stateCode: 'CA',
    displayName: 'California',
    majorCities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose', 'Fresno'],
    population: 39538223,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 84097,
      targetDemographic: 'Tech-savvy families, entertainment industry professionals'
    },
    seoData: {
      keywords: ['California digitization service', 'CA photo scanning', 'Los Angeles VHS conversion'],
      localModifiers: ['near me', 'in California', 'CA', 'West Coast']
    }
  },
  {
    id: 'texas',
    state: 'Texas',
    stateCode: 'TX',
    displayName: 'Texas',
    majorCities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'],
    population: 29145505,
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 64034,
      targetDemographic: 'Large families, military families, oil industry professionals'
    },
    seoData: {
      keywords: ['Texas memory preservation', 'TX digitization service', 'Dallas photo scanning'],
      localModifiers: ['near me', 'in Texas', 'TX', 'Lone Star State']
    }
  },
  {
    id: 'florida',
    state: 'Florida',
    stateCode: 'FL',
    displayName: 'Florida',
    majorCities: ['Miami', 'Tampa', 'Orlando', 'Jacksonville', 'St. Petersburg', 'Hialeah'],
    population: 21538187,
    shippingInfo: {
      averageTransitTime: '3-4 days',
      pickupAvailable: false,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 59227,
      targetDemographic: 'Retirees, vacation home owners, Hispanic families'
    },
    seoData: {
      keywords: ['Florida digitization service', 'FL photo scanning', 'Miami VHS conversion'],
      localModifiers: ['near me', 'in Florida', 'FL', 'Sunshine State']
    }
  },
  {
    id: 'new-york',
    state: 'New York',
    stateCode: 'NY',
    displayName: 'New York',
    majorCities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany'],
    population: 19453561,
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'ScanDigital'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 72108,
      targetDemographic: 'Urban professionals, multi-generational families, artists'
    },
    seoData: {
      keywords: ['New York digitization service', 'NY photo scanning', 'NYC VHS conversion'],
      localModifiers: ['near me', 'in New York', 'NY', 'NYC', 'Empire State']
    }
  },
  {
    id: 'pennsylvania',
    state: 'Pennsylvania',
    stateCode: 'PA',
    displayName: 'Pennsylvania',
    majorCities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton'],
    population: 13002700,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 63463,
      targetDemographic: 'Working-class families, historical preservation enthusiasts'
    },
    seoData: {
      keywords: ['Pennsylvania digitization service', 'PA photo scanning', 'Philadelphia VHS conversion'],
      localModifiers: ['near me', 'in Pennsylvania', 'PA', 'Keystone State']
    }
  },
  {
    id: 'illinois',
    state: 'Illinois',
    stateCode: 'IL',
    displayName: 'Illinois',
    majorCities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield'],
    population: 12812508,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 69187,
      targetDemographic: 'Urban families, Midwest professionals, diverse communities'
    },
    seoData: {
      keywords: ['Illinois digitization service', 'IL photo scanning', 'Chicago VHS conversion'],
      localModifiers: ['near me', 'in Illinois', 'IL', 'Prairie State', 'Chicagoland']
    }
  },
  {
    id: 'ohio',
    state: 'Ohio',
    stateCode: 'OH',
    displayName: 'Ohio',
    majorCities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'],
    population: 11799448,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 58642,
      targetDemographic: 'Middle-class families, manufacturing workers, college towns'
    },
    seoData: {
      keywords: ['Ohio digitization service', 'OH photo scanning', 'Columbus VHS conversion'],
      localModifiers: ['near me', 'in Ohio', 'OH', 'Buckeye State']
    }
  },
  {
    id: 'georgia',
    state: 'Georgia',
    stateCode: 'GA',
    displayName: 'Georgia',
    majorCities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens'],
    population: 10711908,
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 61980,
      targetDemographic: 'Southern families, Atlanta professionals, military families'
    },
    seoData: {
      keywords: ['Georgia digitization service', 'GA photo scanning', 'Atlanta VHS conversion'],
      localModifiers: ['near me', 'in Georgia', 'GA', 'Peach State']
    }
  },
  {
    id: 'north-carolina',
    state: 'North Carolina',
    stateCode: 'NC',
    displayName: 'North Carolina',
    majorCities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville'],
    population: 10439388,
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: false,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 57341,
      targetDemographic: 'Research Triangle professionals, rural families, military'
    },
    seoData: {
      keywords: ['North Carolina digitization service', 'NC photo scanning', 'Charlotte VHS conversion'],
      localModifiers: ['near me', 'in North Carolina', 'NC', 'Tar Heel State']
    }
  },
  {
    id: 'michigan',
    state: 'Michigan',
    stateCode: 'MI',
    displayName: 'Michigan',
    majorCities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing', 'Ann Arbor'],
    population: 10037261,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 59584,
      targetDemographic: 'Auto industry families, Great Lakes communities, college towns'
    },
    seoData: {
      keywords: ['Michigan digitization service', 'MI photo scanning', 'Detroit VHS conversion'],
      localModifiers: ['near me', 'in Michigan', 'MI', 'Great Lakes State']
    }
  }
];

// Phase 2 States - Complete expansion to all 50 states
export const phase2LocationData: LocationData[] = [
  {
    id: 'new-jersey',
    state: 'New Jersey',
    stateCode: 'NJ',
    displayName: 'New Jersey',
    majorCities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison', 'Woodbridge'],
    population: 9288994,
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'ScanDigital'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 85751,
      targetDemographic: 'Suburban families, NYC commuters, diverse communities'
    },
    seoData: {
      keywords: ['New Jersey digitization service', 'NJ photo scanning', 'Newark VHS conversion'],
      localModifiers: ['near me', 'in New Jersey', 'NJ', 'Garden State']
    }
  },
  {
    id: 'virginia',
    state: 'Virginia',
    stateCode: 'VA',
    displayName: 'Virginia',
    majorCities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria'],
    population: 8631393,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 76456,
      targetDemographic: 'Military families, government workers, historical enthusiasts'
    },
    seoData: {
      keywords: ['Virginia digitization service', 'VA photo scanning', 'Richmond VHS conversion'],
      localModifiers: ['near me', 'in Virginia', 'VA', 'Old Dominion']
    }
  },
  {
    id: 'washington',
    state: 'Washington',
    stateCode: 'WA',
    displayName: 'Washington',
    majorCities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent'],
    population: 7705281,
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 78687,
      targetDemographic: 'Tech professionals, outdoor enthusiasts, Pacific Northwest families'
    },
    seoData: {
      keywords: ['Washington digitization service', 'WA photo scanning', 'Seattle VHS conversion'],
      localModifiers: ['near me', 'in Washington', 'WA', 'Evergreen State', 'Pacific Northwest']
    }
  },
  {
    id: 'arizona',
    state: 'Arizona',
    stateCode: 'AZ',
    displayName: 'Arizona',
    majorCities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale'],
    population: 7151502,
    shippingInfo: {
      averageTransitTime: '3-4 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 62055,
      targetDemographic: 'Retirees, snowbirds, growing families, tech workers'
    },
    seoData: {
      keywords: ['Arizona digitization service', 'AZ photo scanning', 'Phoenix VHS conversion'],
      localModifiers: ['near me', 'in Arizona', 'AZ', 'Grand Canyon State']
    }
  },
  {
    id: 'massachusetts',
    state: 'Massachusetts',
    stateCode: 'MA',
    displayName: 'Massachusetts',
    majorCities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton'],
    population: 7001399,
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'ScanDigital'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 85843,
      targetDemographic: 'Educated professionals, historical families, university communities'
    },
    seoData: {
      keywords: ['Massachusetts digitization service', 'MA photo scanning', 'Boston VHS conversion'],
      localModifiers: ['near me', 'in Massachusetts', 'MA', 'Bay State', 'New England']
    }
  },
  {
    id: 'tennessee',
    state: 'Tennessee',
    stateCode: 'TN',
    displayName: 'Tennessee',
    majorCities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro'],
    population: 6910840,
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 56071,
      targetDemographic: 'Music industry families, Southern heritage enthusiasts, military'
    },
    seoData: {
      keywords: ['Tennessee digitization service', 'TN photo scanning', 'Nashville VHS conversion'],
      localModifiers: ['near me', 'in Tennessee', 'TN', 'Volunteer State']
    }
  },
  {
    id: 'indiana',
    state: 'Indiana',
    stateCode: 'IN',
    displayName: 'Indiana',
    majorCities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers'],
    population: 6785528,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 57603,
      targetDemographic: 'Midwest families, manufacturing workers, racing enthusiasts'
    },
    seoData: {
      keywords: ['Indiana digitization service', 'IN photo scanning', 'Indianapolis VHS conversion'],
      localModifiers: ['near me', 'in Indiana', 'IN', 'Hoosier State']
    }
  },
  {
    id: 'maryland',
    state: 'Maryland',
    stateCode: 'MD',
    displayName: 'Maryland',
    majorCities: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring', 'Waldorf', 'Glen Burnie'],
    population: 6177224,
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'ScanDigital'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 86738,
      targetDemographic: 'Government workers, DC commuters, educated professionals'
    },
    seoData: {
      keywords: ['Maryland digitization service', 'MD photo scanning', 'Baltimore VHS conversion'],
      localModifiers: ['near me', 'in Maryland', 'MD', 'Old Line State']
    }
  },
  {
    id: 'missouri',
    state: 'Missouri',
    stateCode: 'MO',
    displayName: 'Missouri',
    majorCities: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit'],
    population: 6196010,
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 57409,
      targetDemographic: 'Midwest families, agricultural communities, urban professionals'
    },
    seoData: {
      keywords: ['Missouri digitization service', 'MO photo scanning', 'Kansas City VHS conversion'],
      localModifiers: ['near me', 'in Missouri', 'MO', 'Show Me State']
    }
  },
  {
    id: 'wisconsin',
    state: 'Wisconsin',
    stateCode: 'WI',
    displayName: 'Wisconsin',
    majorCities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton'],
    population: 5893718,
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 64168,
      targetDemographic: 'Dairy farming families, Great Lakes communities, college towns'
    },
    seoData: {
      keywords: ['Wisconsin digitization service', 'WI photo scanning', 'Milwaukee VHS conversion'],
      localModifiers: ['near me', 'in Wisconsin', 'WI', 'Badger State']
    }
  }
];

// Combine all location data
export const allLocationData = [...locationData, ...phase2LocationData];

export const getLocationById = (id: string): LocationData | undefined => {
  return allLocationData.find(location => location.id === id);
};

export const getLocationByState = (state: string): LocationData | undefined => {
  return allLocationData.find(location => 
    location.state.toLowerCase() === state.toLowerCase() ||
    location.stateCode.toLowerCase() === state.toLowerCase() ||
    location.id === state.toLowerCase().replace(/\s+/g, '-')
  );
};

export const getCityData = (state: string, city: string): { state: LocationData; city: string } | null => {
  const stateData = getLocationByState(state);
  if (!stateData) return null;
  
  const cityMatch = stateData.majorCities.find(c => 
    c.toLowerCase().replace(/\s+/g, '-') === city.toLowerCase().replace(/\s+/g, '-')
  );
  
  if (!cityMatch) return null;
  
  return { state: stateData, city: cityMatch };
};

export const formatLocationSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const generateLocationKeywords = (location: LocationData, service?: string): string[] => {
  const baseKeywords = [
    `digitization service ${location.state}`,
    `photo scanning ${location.stateCode}`,
    `VHS conversion ${location.state}`,
    `memory preservation ${location.state}`,
    `family archive digitization ${location.state}`
  ];
  
  if (service) {
    baseKeywords.push(
      `${service} ${location.state}`,
      `${service} ${location.stateCode}`,
      `${service} near me`
    );
  }
  
  // Add major city keywords
  location.majorCities.forEach(city => {
    baseKeywords.push(
      `digitization service ${city}`,
      `photo scanning ${city}`,
      `VHS conversion ${city}`
    );
    
    if (service) {
      baseKeywords.push(`${service} ${city}`);
    }
  });
  
  return baseKeywords;
};
