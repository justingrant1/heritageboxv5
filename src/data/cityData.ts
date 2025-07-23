export interface CityData {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  displayName: string;
  population: number;
  metroPopulation: number;
  demographics: {
    medianAge: number;
    medianIncome: number;
    educationLevel: 'high' | 'medium' | 'low';
    techAdoption: 'high' | 'medium' | 'low';
  };
  shippingInfo: {
    averageTransitTime: string;
    pickupAvailable: boolean;
    rushAvailable: boolean;
    shippingZone: string;
  };
  localCompetitors: string[];
  marketInsights: {
    digitalAdoption: 'high' | 'medium' | 'low';
    avgHouseholdIncome: number;
    targetDemographic: string;
    marketSize: 'large' | 'medium' | 'small';
    competitionLevel: 'high' | 'medium' | 'low';
  };
  seoData: {
    keywords: string[];
    localModifiers: string[];
    searchVolume: {
      vhsConversion: number;
      photoScanning: number;
      filmConversion: number;
      digitizationService: number;
    };
  };
  businessData: {
    estimatedDemand: 'high' | 'medium' | 'low';
    conversionPotential: number; // 1-10 scale
    seasonalTrends: string[];
  };
}

// Top 50 US Cities by Population and Market Potential
export const cityData: CityData[] = [
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    displayName: 'Los Angeles, CA',
    population: 3970000,
    metroPopulation: 13200000,
    demographics: {
      medianAge: 36,
      medianIncome: 65290,
      educationLevel: 'high',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'West Coast'
    },
    localCompetitors: ['Hollywood Photo Scanning', 'Los Angeles Video Transfer Service', 'LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 65290,
      targetDemographic: 'Entertainment industry professionals, tech workers, diverse families',
      marketSize: 'large',
      competitionLevel: 'high'
    },
    seoData: {
      keywords: [
        'VHS conversion Los Angeles',
        'photo scanning Los Angeles',
        '8mm film conversion Los Angeles',
        'digitization service Los Angeles',
        'video transfer Los Angeles',
        'slide scanning Los Angeles'
      ],
      localModifiers: ['near me', 'in Los Angeles', 'LA', 'Southern California', 'West Coast'],
      searchVolume: {
        vhsConversion: 50,
        photoScanning: 40,
        filmConversion: 30,
        digitizationService: 60
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 9,
      seasonalTrends: ['Holiday season peak', 'Spring cleaning surge', 'Wedding season demand']
    }
  },
  {
    id: 'new-york',
    city: 'New York',
    state: 'New York',
    stateCode: 'NY',
    displayName: 'New York, NY',
    population: 8200000,
    metroPopulation: 20100000,
    demographics: {
      medianAge: 37,
      medianIncome: 70663,
      educationLevel: 'high',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'Northeast'
    },
    localCompetitors: ['EverPresent', 'LegacyBox', 'Capture', 'iMemories', 'ScanDigital'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 70663,
      targetDemographic: 'Urban professionals, multi-generational families, artists, media professionals',
      marketSize: 'large',
      competitionLevel: 'high'
    },
    seoData: {
      keywords: [
        'VHS conversion New York',
        'photo scanning New York',
        '8mm film conversion New York',
        'digitization service New York',
        'video transfer NYC',
        'slide scanning Manhattan'
      ],
      localModifiers: ['near me', 'in New York', 'NYC', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx'],
      searchVolume: {
        vhsConversion: 60,
        photoScanning: 30,
        filmConversion: 40,
        digitizationService: 70
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 10,
      seasonalTrends: ['Holiday season peak', 'Back to school organization', 'Spring decluttering']
    }
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    displayName: 'Chicago, IL',
    population: 2720000,
    metroPopulation: 9500000,
    demographics: {
      medianAge: 35,
      medianIncome: 58247,
      educationLevel: 'high',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'Midwest'
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'ScanDigital'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 58247,
      targetDemographic: 'Urban families, Midwest professionals, diverse communities',
      marketSize: 'large',
      competitionLevel: 'medium'
    },
    seoData: {
      keywords: [
        'VHS conversion Chicago',
        'photo scanning Chicago',
        '8mm film conversion Chicago',
        'digitization service Chicago',
        'video transfer Chicago',
        'slide scanning Illinois'
      ],
      localModifiers: ['near me', 'in Chicago', 'Chicagoland', 'Illinois', 'Midwest'],
      searchVolume: {
        vhsConversion: 40,
        photoScanning: 20,
        filmConversion: 25,
        digitizationService: 45
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 8,
      seasonalTrends: ['Winter organization projects', 'Holiday preparation', 'Summer family reunions']
    }
  },
  {
    id: 'houston',
    city: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    displayName: 'Houston, TX',
    population: 2300000,
    metroPopulation: 7100000,
    demographics: {
      medianAge: 33,
      medianIncome: 52338,
      educationLevel: 'medium',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'South Central'
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 52338,
      targetDemographic: 'Large families, oil industry professionals, diverse communities',
      marketSize: 'large',
      competitionLevel: 'medium'
    },
    seoData: {
      keywords: [
        'VHS conversion Houston',
        'photo scanning Houston',
        '8mm film conversion Houston',
        'digitization service Houston',
        'video transfer Texas',
        'slide scanning Houston'
      ],
      localModifiers: ['near me', 'in Houston', 'Texas', 'TX', 'Gulf Coast'],
      searchVolume: {
        vhsConversion: 35,
        photoScanning: 20,
        filmConversion: 20,
        digitizationService: 40
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 7,
      seasonalTrends: ['Hurricane season preparation', 'Holiday family gatherings', 'Spring organization']
    }
  },
  {
    id: 'phoenix',
    city: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    displayName: 'Phoenix, AZ',
    population: 1680000,
    metroPopulation: 5000000,
    demographics: {
      medianAge: 34,
      medianIncome: 57957,
      educationLevel: 'medium',
      techAdoption: 'medium'
    },
    shippingInfo: {
      averageTransitTime: '3-4 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'Southwest'
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 57957,
      targetDemographic: 'Retirees, snowbirds, growing families, tech workers',
      marketSize: 'large',
      competitionLevel: 'low'
    },
    seoData: {
      keywords: [
        'VHS conversion Phoenix',
        'photo scanning Phoenix',
        '8mm film conversion Phoenix',
        'digitization service Phoenix',
        'video transfer Arizona',
        'slide scanning Scottsdale'
      ],
      localModifiers: ['near me', 'in Phoenix', 'Arizona', 'AZ', 'Southwest', 'Scottsdale'],
      searchVolume: {
        vhsConversion: 25,
        photoScanning: 10,
        filmConversion: 15,
        digitizationService: 30
      }
    },
    businessData: {
      estimatedDemand: 'medium',
      conversionPotential: 6,
      seasonalTrends: ['Snowbird season influx', 'Summer indoor projects', 'Holiday preparations']
    }
  },
  {
    id: 'philadelphia',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    displayName: 'Philadelphia, PA',
    population: 1580000,
    metroPopulation: 6100000,
    demographics: {
      medianAge: 34,
      medianIncome: 45927,
      educationLevel: 'medium',
      techAdoption: 'medium'
    },
    shippingInfo: {
      averageTransitTime: '2-3 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'Northeast'
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 45927,
      targetDemographic: 'Working-class families, historical preservation enthusiasts, urban professionals',
      marketSize: 'large',
      competitionLevel: 'medium'
    },
    seoData: {
      keywords: [
        'VHS conversion Philadelphia',
        'photo scanning Philadelphia',
        '8mm film conversion Philadelphia',
        'digitization service Philadelphia',
        'video transfer Philly',
        'slide scanning Pennsylvania'
      ],
      localModifiers: ['near me', 'in Philadelphia', 'Philly', 'Pennsylvania', 'PA', 'Northeast'],
      searchVolume: {
        vhsConversion: 30,
        photoScanning: 15,
        filmConversion: 20,
        digitizationService: 35
      }
    },
    businessData: {
      estimatedDemand: 'medium',
      conversionPotential: 6,
      seasonalTrends: ['Historical preservation projects', 'Holiday family gatherings', 'Spring cleaning']
    }
  },
  {
    id: 'san-antonio',
    city: 'San Antonio',
    state: 'Texas',
    stateCode: 'TX',
    displayName: 'San Antonio, TX',
    population: 1530000,
    metroPopulation: 2600000,
    demographics: {
      medianAge: 33,
      medianIncome: 52455,
      educationLevel: 'medium',
      techAdoption: 'medium'
    },
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: false,
      rushAvailable: true,
      shippingZone: 'South Central'
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'medium',
      avgHouseholdIncome: 52455,
      targetDemographic: 'Military families, Hispanic families, growing tech sector',
      marketSize: 'medium',
      competitionLevel: 'low'
    },
    seoData: {
      keywords: [
        'VHS conversion San Antonio',
        'photo scanning San Antonio',
        '8mm film conversion San Antonio',
        'digitization service San Antonio',
        'video transfer Texas',
        'slide scanning San Antonio'
      ],
      localModifiers: ['near me', 'in San Antonio', 'Texas', 'TX', 'South Texas'],
      searchVolume: {
        vhsConversion: 20,
        photoScanning: 12,
        filmConversion: 15,
        digitizationService: 25
      }
    },
    businessData: {
      estimatedDemand: 'medium',
      conversionPotential: 5,
      seasonalTrends: ['Military deployment preparations', 'Holiday family gatherings', 'Fiesta season']
    }
  },
  {
    id: 'san-diego',
    city: 'San Diego',
    state: 'California',
    stateCode: 'CA',
    displayName: 'San Diego, CA',
    population: 1420000,
    metroPopulation: 3300000,
    demographics: {
      medianAge: 35,
      medianIncome: 70824,
      educationLevel: 'high',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'West Coast'
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'Hollywood Photo Scanning'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 70824,
      targetDemographic: 'Military families, tech professionals, retirees, beach communities',
      marketSize: 'large',
      competitionLevel: 'medium'
    },
    seoData: {
      keywords: [
        'VHS conversion San Diego',
        'photo scanning San Diego',
        '8mm film conversion San Diego',
        'digitization service San Diego',
        'video transfer San Diego',
        'slide scanning California'
      ],
      localModifiers: ['near me', 'in San Diego', 'California', 'CA', 'Southern California'],
      searchVolume: {
        vhsConversion: 30,
        photoScanning: 18,
        filmConversion: 22,
        digitizationService: 35
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 8,
      seasonalTrends: ['Military deployment cycles', 'Tourist season', 'Holiday preparations']
    }
  },
  {
    id: 'dallas',
    city: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    displayName: 'Dallas, TX',
    population: 1340000,
    metroPopulation: 7600000,
    demographics: {
      medianAge: 32,
      medianIncome: 52580,
      educationLevel: 'medium',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '2-4 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'South Central'
    },
    localCompetitors: ['LegacyBox', 'ScanDigital', 'EverPresent'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 52580,
      targetDemographic: 'Business professionals, tech workers, large families, diverse communities',
      marketSize: 'large',
      competitionLevel: 'medium'
    },
    seoData: {
      keywords: [
        'VHS conversion Dallas',
        'photo scanning Dallas',
        '8mm film conversion Dallas',
        'digitization service Dallas',
        'video transfer Dallas',
        'slide scanning Texas'
      ],
      localModifiers: ['near me', 'in Dallas', 'Texas', 'TX', 'DFW', 'North Texas'],
      searchVolume: {
        vhsConversion: 35,
        photoScanning: 16,
        filmConversion: 20,
        digitizationService: 40
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 7,
      seasonalTrends: ['Business quarter-end organization', 'Holiday preparations', 'Spring cleaning']
    }
  },
  {
    id: 'san-jose',
    city: 'San Jose',
    state: 'California',
    stateCode: 'CA',
    displayName: 'San Jose, CA',
    population: 1030000,
    metroPopulation: 2000000,
    demographics: {
      medianAge: 37,
      medianIncome: 109593,
      educationLevel: 'high',
      techAdoption: 'high'
    },
    shippingInfo: {
      averageTransitTime: '1-2 days',
      pickupAvailable: true,
      rushAvailable: true,
      shippingZone: 'West Coast'
    },
    localCompetitors: ['LegacyBox', 'Capture', 'iMemories', 'Hollywood Photo Scanning'],
    marketInsights: {
      digitalAdoption: 'high',
      avgHouseholdIncome: 109593,
      targetDemographic: 'Tech professionals, Silicon Valley workers, high-income families',
      marketSize: 'medium',
      competitionLevel: 'high'
    },
    seoData: {
      keywords: [
        'VHS conversion San Jose',
        'photo scanning San Jose',
        '8mm film conversion San Jose',
        'digitization service San Jose',
        'video transfer Silicon Valley',
        'slide scanning Bay Area'
      ],
      localModifiers: ['near me', 'in San Jose', 'Silicon Valley', 'Bay Area', 'California', 'CA'],
      searchVolume: {
        vhsConversion: 25,
        photoScanning: 15,
        filmConversion: 18,
        digitizationService: 30
      }
    },
    businessData: {
      estimatedDemand: 'high',
      conversionPotential: 9,
      seasonalTrends: ['Tech industry bonus season', 'Holiday preparations', 'Spring organization']
    }
  }
];

// Utility functions
export const getCityById = (id: string): CityData | undefined => {
  return cityData.find(city => city.id === id);
};

export const getCityByName = (cityName: string, state?: string): CityData | undefined => {
  return cityData.find(city => {
    const nameMatch = city.city.toLowerCase() === cityName.toLowerCase() ||
                     city.displayName.toLowerCase() === cityName.toLowerCase();
    const stateMatch = !state || 
                      city.state.toLowerCase() === state.toLowerCase() ||
                      city.stateCode.toLowerCase() === state.toLowerCase();
    return nameMatch && stateMatch;
  });
};

export const getCitiesByState = (state: string): CityData[] => {
  return cityData.filter(city => 
    city.state.toLowerCase() === state.toLowerCase() ||
    city.stateCode.toLowerCase() === state.toLowerCase()
  );
};

export const getTopCitiesByPopulation = (limit: number = 10): CityData[] => {
  return cityData
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
};

export const getTopCitiesByConversionPotential = (limit: number = 10): CityData[] => {
  return cityData
    .sort((a, b) => b.businessData.conversionPotential - a.businessData.conversionPotential)
    .slice(0, limit);
};

export const formatCitySlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const generateCityKeywords = (city: CityData, service?: string): string[] => {
  const baseKeywords = [
    `digitization service ${city.city}`,
    `photo scanning ${city.city}`,
    `VHS conversion ${city.city}`,
    `memory preservation ${city.city}`,
    `family archive digitization ${city.city}`,
    `video transfer ${city.city}`,
    `slide scanning ${city.city}`
  ];
  
  if (service) {
    baseKeywords.push(
      `${service} ${city.city}`,
      `${service} ${city.stateCode}`,
      `${service} near me`
    );
  }
  
  // Add local modifiers
  city.seoData.localModifiers.forEach(modifier => {
    baseKeywords.push(
      `digitization service ${modifier}`,
      `photo scanning ${modifier}`,
      `VHS conversion ${modifier}`
    );
    
    if (service) {
      baseKeywords.push(`${service} ${modifier}`);
    }
  });
  
  return baseKeywords;
};
