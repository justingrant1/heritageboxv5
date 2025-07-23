export interface SeasonalContent {
  id: string;
  slug: string;
  title: string;
  description: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  holiday: string;
  peakMonths: number[];
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  locationName: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    focusKeyword: string;
    schema: any;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    seasonalBenefits: string[];
    giftIdeas: string[];
    urgencyMessage: string;
    testimonials: string[];
    localConsiderations: string[];
  };
  businessData: {
    searchVolume: number;
    peakSearchVolume: number;
    competition: 'low' | 'medium' | 'high';
    conversionPotential: number; // 1-10 scale
    seasonalMultiplier: number; // Traffic multiplier during peak season
  };
  timing: {
    contentLaunchDate: string; // When to publish content
    promotionStartDate: string; // When to start promoting
    peakPeriod: {
      start: string;
      end: string;
    };
  };
}

export const seasonalContentData: SeasonalContent[] = [
  // Christmas/Holiday Season
  {
    id: 'christmas-photos-california',
    slug: 'christmas-photo-gifts-california',
    title: 'Christmas Photo Gifts California - Holiday Memory Digitization',
    description: 'Transform old photos into perfect Christmas gifts in California. Professional photo digitization for holiday memories.',
    season: 'winter',
    holiday: 'Christmas',
    peakMonths: [11, 12],
    serviceSlug: 'photos',
    locationSlug: 'california',
    serviceName: 'Photo Scanning',
    locationName: 'California',
    seoData: {
      title: 'Christmas Photo Gifts California | Holiday Memory Digitization | HeritageBox',
      description: 'Create meaningful Christmas photo gifts in California. Professional photo digitization service with 1-2 day shipping. Perfect holiday memories preserved.',
      keywords: [
        'christmas photo gifts california',
        'holiday photo digitization',
        'christmas memory gifts',
        'photo scanning california christmas',
        'holiday photo restoration california'
      ],
      focusKeyword: 'christmas photo gifts california',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Christmas Photo Gifts California',
        description: 'Professional photo digitization service for Christmas gifts in California',
        provider: {
          '@type': 'LocalBusiness',
          name: 'HeritageBox',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'California'
          }
        }
      }
    },
    content: {
      heroTitle: 'Christmas Photo Gifts in California',
      heroSubtitle: 'Transform your precious memories into perfect holiday gifts with professional photo digitization',
      seasonalBenefits: [
        'Rush delivery available for Christmas deadlines',
        'Gift-ready packaging and presentation',
        'Digital copies perfect for sharing with family',
        'Preserve memories before they fade further',
        'Create lasting gifts that tell family stories'
      ],
      giftIdeas: [
        'Digital photo albums for grandparents',
        'Restored family portraits for wall display',
        'Memory USB drives with decades of photos',
        'Custom photo books from old family pictures',
        'Digital slideshows for holiday gatherings'
      ],
      urgencyMessage: 'Order by December 15th for guaranteed Christmas delivery in California',
      testimonials: [
        'HeritageBox saved our Christmas! They digitized 40 years of family photos in time for our holiday reunion.',
        'The best gift I ever gave my parents - all their memories preserved digitally.',
        'Professional quality and fast California shipping made this the perfect holiday solution.'
      ],
      localConsiderations: [
        'Fast 1-2 day shipping throughout California',
        'Local pickup available in major California cities',
        'California family-owned business understanding',
        'Holiday rush processing prioritization'
      ]
    },
    businessData: {
      searchVolume: 1600,
      peakSearchVolume: 6600,
      competition: 'low',
      conversionPotential: 9,
      seasonalMultiplier: 4.1
    },
    timing: {
      contentLaunchDate: '2024-10-01',
      promotionStartDate: '2024-10-15',
      peakPeriod: {
        start: '2024-11-01',
        end: '2024-12-20'
      }
    }
  },
  
  // Mother's Day
  {
    id: 'mothers-day-photos-california',
    slug: 'mothers-day-photo-gifts-california',
    title: 'Mother\'s Day Photo Gifts California - Memory Digitization',
    description: 'Create meaningful Mother\'s Day gifts with professional photo digitization in California. Preserve family memories for mom.',
    season: 'spring',
    holiday: 'Mother\'s Day',
    peakMonths: [4, 5],
    serviceSlug: 'photos',
    locationSlug: 'california',
    serviceName: 'Photo Scanning',
    locationName: 'California',
    seoData: {
      title: 'Mother\'s Day Photo Gifts California | Memory Digitization | HeritageBox',
      description: 'Perfect Mother\'s Day photo gifts in California. Professional photo digitization with fast shipping. Preserve mom\'s precious memories.',
      keywords: [
        'mothers day photo gifts california',
        'mother\'s day memory gifts',
        'photo digitization mothers day',
        'california mothers day photos',
        'memory preservation gifts mom'
      ],
      focusKeyword: 'mothers day photo gifts california',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Mother\'s Day Photo Gifts California',
        description: 'Professional photo digitization service for Mother\'s Day gifts in California'
      }
    },
    content: {
      heroTitle: 'Mother\'s Day Photo Gifts in California',
      heroSubtitle: 'Give mom the gift of preserved memories with professional photo digitization',
      seasonalBenefits: [
        'Express processing for Mother\'s Day deadline',
        'Beautiful gift presentation options',
        'Preserve mom\'s childhood and family photos',
        'Create digital albums she can easily share',
        'Professional restoration of faded photos'
      ],
      giftIdeas: [
        'Digitized photo collection of her childhood',
        'Restored wedding and family portraits',
        'Digital memory book with family history',
        'USB drive with decades of family photos',
        'Online gallery she can share with family'
      ],
      urgencyMessage: 'Order by May 1st for guaranteed Mother\'s Day delivery in California',
      testimonials: [
        'Mom cried happy tears when she saw her childhood photos restored and digitized.',
        'The perfect gift for the woman who has everything - her memories preserved forever.',
        'HeritageBox made Mother\'s Day extra special with their beautiful photo digitization.'
      ],
      localConsiderations: [
        'Fast California shipping for Mother\'s Day',
        'Local California family business values',
        'Understanding of California family traditions',
        'Priority processing for Mother\'s Day orders'
      ]
    },
    businessData: {
      searchVolume: 590,
      peakSearchVolume: 3600,
      competition: 'low',
      conversionPotential: 8,
      seasonalMultiplier: 6.1
    },
    timing: {
      contentLaunchDate: '2024-03-01',
      promotionStartDate: '2024-03-15',
      peakPeriod: {
        start: '2024-04-01',
        end: '2024-05-12'
      }
    }
  },

  // Father's Day
  {
    id: 'fathers-day-vhs-california',
    slug: 'fathers-day-memory-gifts-california',
    title: 'Father\'s Day Memory Gifts California - VHS Digitization',
    description: 'Perfect Father\'s Day gifts with VHS digitization in California. Preserve dad\'s memories and home videos professionally.',
    season: 'summer',
    holiday: 'Father\'s Day',
    peakMonths: [5, 6],
    serviceSlug: 'vhs',
    locationSlug: 'california',
    serviceName: 'VHS Conversion',
    locationName: 'California',
    seoData: {
      title: 'Father\'s Day Memory Gifts California | VHS Digitization | HeritageBox',
      description: 'Meaningful Father\'s Day memory gifts in California. Professional VHS digitization service. Preserve dad\'s home videos forever.',
      keywords: [
        'fathers day memory gifts california',
        'father\'s day vhs digitization',
        'dad memory gifts california',
        'vhs conversion fathers day',
        'california fathers day videos'
      ],
      focusKeyword: 'fathers day memory gifts california',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Father\'s Day Memory Gifts California',
        description: 'Professional VHS digitization service for Father\'s Day gifts in California'
      }
    },
    content: {
      heroTitle: 'Father\'s Day Memory Gifts in California',
      heroSubtitle: 'Honor dad with digitized memories - preserve his home videos and family moments',
      seasonalBenefits: [
        'Rush processing for Father\'s Day delivery',
        'Preserve dad\'s home videos and memories',
        'Digital copies he can easily watch and share',
        'Professional quality VHS conversion',
        'Gift presentation ready packaging'
      ],
      giftIdeas: [
        'Digitized collection of family home videos',
        'Dad\'s sports and hobby video memories',
        'Family vacation VHS tapes converted',
        'Digital USB with all his video memories',
        'Online video gallery for family sharing'
      ],
      urgencyMessage: 'Order by June 1st for guaranteed Father\'s Day delivery in California',
      testimonials: [
        'Dad was amazed to see his old home videos in perfect digital quality.',
        'The best Father\'s Day gift - all his memories preserved and easy to watch.',
        'HeritageBox brought back so many family memories dad thought were lost forever.'
      ],
      localConsiderations: [
        'Fast California shipping for Father\'s Day',
        'Understanding of California dad culture',
        'Local family business serving families',
        'Priority Father\'s Day order processing'
      ]
    },
    businessData: {
      searchVolume: 90,
      peakSearchVolume: 480,
      competition: 'high',
      conversionPotential: 7,
      seasonalMultiplier: 5.3
    },
    timing: {
      contentLaunchDate: '2024-04-01',
      promotionStartDate: '2024-04-15',
      peakPeriod: {
        start: '2024-05-01',
        end: '2024-06-16'
      }
    }
  },

  // Graduation Season
  {
    id: 'graduation-memories-california',
    slug: 'graduation-memory-preservation-california',
    title: 'Graduation Memory Preservation California - Video Digitization',
    description: 'Preserve graduation memories with professional video digitization in California. Perfect for graduation season memory preservation.',
    season: 'spring',
    holiday: 'Graduation',
    peakMonths: [5, 6],
    serviceSlug: 'video',
    locationSlug: 'california',
    serviceName: 'Video Conversion',
    locationName: 'California',
    seoData: {
      title: 'Graduation Memory Preservation California | Video Digitization | HeritageBox',
      description: 'Professional graduation memory preservation in California. Video digitization service for graduation ceremonies and school memories.',
      keywords: [
        'graduation memory preservation california',
        'graduation video digitization',
        'school memory preservation',
        'california graduation videos',
        'graduation ceremony digitization'
      ],
      focusKeyword: 'graduation memory preservation california',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Graduation Memory Preservation California',
        description: 'Professional video digitization service for graduation memories in California'
      }
    },
    content: {
      heroTitle: 'Graduation Memory Preservation in California',
      heroSubtitle: 'Preserve precious graduation memories with professional video digitization',
      seasonalBenefits: [
        'Fast processing for graduation season',
        'Preserve ceremony and school memories',
        'Digital copies for easy sharing with family',
        'Professional quality video conversion',
        'Perfect timing for graduation gifts'
      ],
      giftIdeas: [
        'Digitized graduation ceremony videos',
        'School years video memory collection',
        'Sports and activity video preservation',
        'Digital graduation memory album',
        'Family graduation video compilation'
      ],
      urgencyMessage: 'Perfect timing for graduation season - preserve these milestone memories',
      testimonials: [
        'So glad we preserved our daughter\'s graduation videos before they degraded further.',
        'HeritageBox helped us create the perfect graduation gift - all her school memories digitized.',
        'Professional quality made our graduation videos look better than ever.'
      ],
      localConsiderations: [
        'Understanding of California school systems',
        'Fast processing for graduation season',
        'Local California graduation traditions',
        'Family-focused service approach'
      ]
    },
    businessData: {
      searchVolume: 20,
      peakSearchVolume: 80,
      competition: 'low',
      conversionPotential: 6,
      seasonalMultiplier: 4.0
    },
    timing: {
      contentLaunchDate: '2024-03-15',
      promotionStartDate: '2024-04-01',
      peakPeriod: {
        start: '2024-05-01',
        end: '2024-06-30'
      }
    }
  }
];

export const getSeasonalContentBySlug = (slug: string): SeasonalContent | undefined => {
  return seasonalContentData.find(content => content.slug === slug);
};

export const getSeasonalContentByHoliday = (holiday: string): SeasonalContent[] => {
  return seasonalContentData.filter(content => content.holiday === holiday);
};

export const getCurrentSeasonalContent = (): SeasonalContent[] => {
  const currentMonth = new Date().getMonth() + 1;
  return seasonalContentData.filter(content => 
    content.peakMonths.includes(currentMonth) ||
    content.peakMonths.includes(currentMonth + 1) ||
    content.peakMonths.includes(currentMonth - 1)
  );
};

export const getUpcomingSeasonalContent = (): SeasonalContent[] => {
  const currentMonth = new Date().getMonth() + 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const monthAfter = nextMonth === 12 ? 1 : nextMonth + 1;
  
  return seasonalContentData.filter(content => 
    content.peakMonths.includes(nextMonth) ||
    content.peakMonths.includes(monthAfter)
  );
};
