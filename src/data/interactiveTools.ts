export interface InteractiveTool {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: 'calculator' | 'estimator' | 'quiz' | 'checklist' | 'assessment';
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
    instructions: string[];
    benefits: string[];
    resultsBenefits: string[];
    ctaMessage: string;
  };
  toolConfig: {
    inputs: ToolInput[];
    calculations: ToolCalculation[];
    results: ToolResult[];
  };
  businessData: {
    searchVolume: number;
    competition: 'low' | 'medium' | 'high';
    conversionPotential: number; // 1-10 scale
    engagementScore: number; // 1-10 scale
  };
}

export interface ToolInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox' | 'radio' | 'range';
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
  helpText?: string;
}

export interface ToolCalculation {
  id: string;
  formula: string;
  conditions?: string[];
  multipliers?: { [key: string]: number };
}

export interface ToolResult {
  id: string;
  type: 'cost' | 'time' | 'recommendation' | 'score';
  label: string;
  format: string; // e.g., '${{value}}', '{{value}} days', '{{value}}/10'
  ranges?: ToolResultRange[];
}

export interface ToolResultRange {
  min: number;
  max: number;
  message: string;
  recommendation: string;
  urgency: 'low' | 'medium' | 'high';
}

export const interactiveToolsData: InteractiveTool[] = [
  // Digitization Cost Calculator
  {
    id: 'digitization-cost-calculator',
    slug: 'digitization-cost-calculator',
    title: 'Digitization Cost Calculator - Estimate Your Project Cost',
    description: 'Calculate the cost of your digitization project with our interactive cost calculator. Get instant estimates for photos, VHS, and more.',
    type: 'calculator',
    serviceSlug: 'all',
    locationSlug: 'all',
    serviceName: 'All Services',
    locationName: 'All Locations',
    seoData: {
      title: 'Digitization Cost Calculator | Estimate Your Project Cost | HeritageBox',
      description: 'Free digitization cost calculator. Get instant estimates for photo scanning, VHS conversion, and video digitization projects.',
      keywords: [
        'digitization cost calculator',
        'photo scanning cost calculator',
        'VHS conversion cost calculator',
        'digitization price estimator',
        'memory preservation cost'
      ],
      focusKeyword: 'digitization cost calculator',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Digitization Cost Calculator',
        description: 'Interactive calculator to estimate digitization project costs',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web Browser'
      }
    },
    content: {
      heroTitle: 'Digitization Cost Calculator',
      heroSubtitle: 'Get an instant estimate for your memory preservation project',
      instructions: [
        'Select the types of media you want to digitize',
        'Enter the approximate quantities for each format',
        'Choose any additional services you need',
        'Get your instant cost estimate and timeline'
      ],
      benefits: [
        'Instant cost estimates for any project size',
        'Compare costs across different media formats',
        'Plan your budget before starting your project',
        'No hidden fees or surprise costs'
      ],
      resultsBenefits: [
        'Detailed breakdown of all costs',
        'Estimated timeline for your project',
        'Recommendations for cost savings',
        'Direct link to start your order'
      ],
      ctaMessage: 'Ready to preserve your memories? Start your order now with confidence!'
    },
    toolConfig: {
      inputs: [
        {
          id: 'photos',
          label: 'Number of Photos',
          type: 'number',
          required: false,
          min: 0,
          max: 10000,
          step: 1,
          defaultValue: 0,
          helpText: 'Include loose photos, photo albums, and slides'
        },
        {
          id: 'vhs_tapes',
          label: 'Number of VHS Tapes',
          type: 'number',
          required: false,
          min: 0,
          max: 500,
          step: 1,
          defaultValue: 0,
          helpText: 'Standard VHS cassettes (up to 2 hours each)'
        },
        {
          id: 'film_reels',
          label: 'Number of Film Reels (8mm/16mm)',
          type: 'number',
          required: false,
          min: 0,
          max: 200,
          step: 1,
          defaultValue: 0,
          helpText: '8mm, Super 8, or 16mm film reels'
        },
        {
          id: 'hi8_tapes',
          label: 'Number of Hi8/Digital8 Tapes',
          type: 'number',
          required: false,
          min: 0,
          max: 200,
          step: 1,
          defaultValue: 0,
          helpText: 'Hi8, Digital8, or Video8 cassettes'
        },
        {
          id: 'minidv_tapes',
          label: 'Number of MiniDV Tapes',
          type: 'number',
          required: false,
          min: 0,
          max: 200,
          step: 1,
          defaultValue: 0,
          helpText: 'MiniDV or HDV cassettes'
        },
        {
          id: 'rush_service',
          label: 'Rush Service Needed?',
          type: 'checkbox',
          required: false,
          helpText: 'Complete your project in 1-2 weeks instead of 2-3 weeks'
        },
        {
          id: 'photo_restoration',
          label: 'Photo Restoration Needed?',
          type: 'checkbox',
          required: false,
          helpText: 'Professional restoration of damaged or faded photos'
        },
        {
          id: 'delivery_format',
          label: 'Preferred Delivery Format',
          type: 'select',
          required: true,
          options: ['USB Drive', 'DVD', 'Cloud Download', 'All Formats'],
          defaultValue: 'USB Drive',
          helpText: 'How would you like to receive your digitized memories?'
        }
      ],
      calculations: [
        {
          id: 'base_cost',
          formula: '(photos * 0.35) + (vhs_tapes * 25) + (film_reels * 18) + (hi8_tapes * 20) + (minidv_tapes * 20)',
          multipliers: {
            rush_service: 1.5,
            photo_restoration: 2.0
          }
        },
        {
          id: 'delivery_cost',
          formula: 'delivery_format === "All Formats" ? 15 : delivery_format === "DVD" ? 5 : 0'
        },
        {
          id: 'total_items',
          formula: 'photos + vhs_tapes + film_reels + hi8_tapes + minidv_tapes'
        },
        {
          id: 'estimated_days',
          formula: 'rush_service ? 10 : 18',
          conditions: ['total_items > 0']
        }
      ],
      results: [
        {
          id: 'total_cost',
          type: 'cost',
          label: 'Estimated Total Cost',
          format: '${{value}}',
          ranges: [
            {
              min: 0,
              max: 100,
              message: 'Perfect starter project size',
              recommendation: 'Great way to test our service quality',
              urgency: 'low'
            },
            {
              min: 101,
              max: 500,
              message: 'Popular project size with great value',
              recommendation: 'Consider our bulk discount options',
              urgency: 'medium'
            },
            {
              min: 501,
              max: 9999,
              message: 'Large project - maximum value and savings',
              recommendation: 'Contact us for custom pricing and timeline',
              urgency: 'high'
            }
          ]
        },
        {
          id: 'timeline',
          type: 'time',
          label: 'Estimated Timeline',
          format: '{{value}} business days',
          ranges: [
            {
              min: 1,
              max: 12,
              message: 'Rush processing available',
              recommendation: 'Perfect for urgent projects and gifts',
              urgency: 'high'
            },
            {
              min: 13,
              max: 25,
              message: 'Standard processing time',
              recommendation: 'Our most popular processing option',
              urgency: 'medium'
            }
          ]
        }
      ]
    },
    businessData: {
      searchVolume: 10,
      competition: 'low',
      conversionPotential: 9,
      engagementScore: 8
    }
  },

  // VHS Conversion Quiz
  {
    id: 'vhs-conversion-quiz',
    slug: 'vhs-conversion-quiz',
    title: 'VHS Conversion Quiz - Find Your Perfect Digitization Solution',
    description: 'Take our VHS conversion quiz to discover the best digitization solution for your tapes. Get personalized recommendations.',
    type: 'quiz',
    serviceSlug: 'vhs',
    locationSlug: 'all',
    serviceName: 'VHS Conversion',
    locationName: 'All Locations',
    seoData: {
      title: 'VHS Conversion Quiz | Find Your Perfect Solution | HeritageBox',
      description: 'Take our free VHS conversion quiz. Get personalized recommendations for digitizing your VHS tapes based on your needs.',
      keywords: [
        'VHS conversion quiz',
        'VHS digitization quiz',
        'VHS tape conversion test',
        'video digitization quiz',
        'VHS to digital quiz'
      ],
      focusKeyword: 'VHS conversion quiz',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: 'VHS Conversion Quiz',
        description: 'Interactive quiz to find the perfect VHS digitization solution',
        educationalLevel: 'Beginner'
      }
    },
    content: {
      heroTitle: 'VHS Conversion Quiz',
      heroSubtitle: 'Discover the perfect digitization solution for your VHS collection',
      instructions: [
        'Answer 6 quick questions about your VHS tapes',
        'Tell us about your timeline and quality preferences',
        'Get personalized recommendations for your project',
        'Receive a custom quote based on your answers'
      ],
      benefits: [
        'Personalized recommendations for your needs',
        'Learn about different digitization options',
        'Get expert advice on preserving your tapes',
        'Discover the best value for your project'
      ],
      resultsBenefits: [
        'Custom digitization plan for your collection',
        'Recommended timeline and pricing',
        'Tips for preparing your tapes',
        'Direct link to start your project'
      ],
      ctaMessage: 'Get your personalized VHS conversion plan now!'
    },
    toolConfig: {
      inputs: [
        {
          id: 'tape_count',
          label: 'How many VHS tapes do you have?',
          type: 'radio',
          required: true,
          options: ['1-5 tapes', '6-15 tapes', '16-30 tapes', '31-50 tapes', '50+ tapes']
        },
        {
          id: 'tape_condition',
          label: 'What condition are your tapes in?',
          type: 'radio',
          required: true,
          options: ['Excellent - stored properly', 'Good - some wear', 'Fair - visible damage', 'Poor - significant damage']
        },
        {
          id: 'content_type',
          label: 'What type of content is on your tapes?',
          type: 'radio',
          required: true,
          options: ['Family videos/home movies', 'Recorded TV shows/movies', 'Wedding/special events', 'Mixed content']
        },
        {
          id: 'timeline',
          label: 'When do you need your project completed?',
          type: 'radio',
          required: true,
          options: ['ASAP (1-2 weeks)', 'Soon (2-4 weeks)', 'No rush (4-6 weeks)', 'Flexible timing']
        },
        {
          id: 'quality_priority',
          label: 'What\'s most important to you?',
          type: 'radio',
          required: true,
          options: ['Highest quality possible', 'Good quality at fair price', 'Basic quality, lowest cost', 'Fast turnaround time']
        },
        {
          id: 'tech_comfort',
          label: 'How comfortable are you with technology?',
          type: 'radio',
          required: true,
          options: ['Very comfortable', 'Somewhat comfortable', 'Not very comfortable', 'Prefer simple solutions']
        }
      ],
      calculations: [
        {
          id: 'recommendation_score',
          formula: 'calculateRecommendationScore(tape_count, tape_condition, timeline, quality_priority)'
        }
      ],
      results: [
        {
          id: 'recommendation',
          type: 'recommendation',
          label: 'Your Perfect Solution',
          format: '{{value}}',
          ranges: [
            {
              min: 0,
              max: 3,
              message: 'DIY Solution Recommended',
              recommendation: 'Consider our DIY guide for small projects with flexible timing',
              urgency: 'low'
            },
            {
              min: 4,
              max: 7,
              message: 'Standard Professional Service',
              recommendation: 'Our standard service offers the best balance of quality and value',
              urgency: 'medium'
            },
            {
              min: 8,
              max: 10,
              message: 'Premium Professional Service',
              recommendation: 'Our premium service with rush processing and highest quality',
              urgency: 'high'
            }
          ]
        }
      ]
    },
    businessData: {
      searchVolume: 5,
      competition: 'low',
      conversionPotential: 7,
      engagementScore: 9
    }
  },

  // Photo Scanning Time Estimator
  {
    id: 'photo-scanning-time-estimator',
    slug: 'photo-scanning-time-estimator',
    title: 'Photo Scanning Time Estimator - Project Timeline Calculator',
    description: 'Estimate how long your photo scanning project will take with our interactive time estimator. Plan your digitization timeline.',
    type: 'estimator',
    serviceSlug: 'photos',
    locationSlug: 'all',
    serviceName: 'Photo Scanning',
    locationName: 'All Locations',
    seoData: {
      title: 'Photo Scanning Time Estimator | Project Timeline Calculator | HeritageBox',
      description: 'Free photo scanning time estimator. Calculate how long your photo digitization project will take with our interactive tool.',
      keywords: [
        'photo scanning time estimator',
        'photo digitization timeline',
        'photo scanning duration calculator',
        'digitization time calculator',
        'photo preservation timeline'
      ],
      focusKeyword: 'photo scanning time estimator',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Photo Scanning Time Estimator',
        description: 'Calculate estimated timeline for photo scanning projects'
      }
    },
    content: {
      heroTitle: 'Photo Scanning Time Estimator',
      heroSubtitle: 'Get an accurate timeline estimate for your photo digitization project',
      instructions: [
        'Count your photos, albums, and slides',
        'Select any additional services needed',
        'Choose your preferred processing speed',
        'Get your personalized timeline estimate'
      ],
      benefits: [
        'Accurate timeline estimates for planning',
        'Factor in all variables affecting timing',
        'Plan around holidays and special events',
        'Understand rush processing options'
      ],
      resultsBenefits: [
        'Detailed timeline breakdown by service',
        'Tips for faster processing',
        'Optimal ordering timing recommendations',
        'Rush service availability and pricing'
      ],
      ctaMessage: 'Ready to start your photo preservation project?'
    },
    toolConfig: {
      inputs: [
        {
          id: 'loose_photos',
          label: 'Number of Loose Photos',
          type: 'number',
          required: false,
          min: 0,
          max: 5000,
          step: 1,
          defaultValue: 0,
          helpText: 'Individual photos not in albums'
        },
        {
          id: 'photo_albums',
          label: 'Number of Photo Albums',
          type: 'number',
          required: false,
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 0,
          helpText: 'Estimate 50-100 photos per album'
        },
        {
          id: 'slides',
          label: 'Number of Slides',
          type: 'number',
          required: false,
          min: 0,
          max: 2000,
          step: 1,
          defaultValue: 0,
          helpText: '35mm slides in frames or carousels'
        },
        {
          id: 'photo_restoration',
          label: 'Photo Restoration Needed?',
          type: 'checkbox',
          required: false,
          helpText: 'Adds 3-5 days for damaged photo repair'
        },
        {
          id: 'rush_processing',
          label: 'Rush Processing?',
          type: 'checkbox',
          required: false,
          helpText: 'Cut timeline in half with priority processing'
        },
        {
          id: 'season',
          label: 'When are you ordering?',
          type: 'select',
          required: true,
          options: ['January-March', 'April-June', 'July-September', 'October-December'],
          defaultValue: 'January-March',
          helpText: 'Holiday seasons may have longer processing times'
        }
      ],
      calculations: [
        {
          id: 'total_photos',
          formula: 'loose_photos + (photo_albums * 75) + slides'
        },
        {
          id: 'base_days',
          formula: 'Math.ceil(total_photos / 200) + 5',
          multipliers: {
            photo_restoration: 1.4,
            rush_processing: 0.5,
            holiday_season: 1.3
          }
        }
      ],
      results: [
        {
          id: 'estimated_timeline',
          type: 'time',
          label: 'Estimated Processing Time',
          format: '{{value}} business days',
          ranges: [
            {
              min: 1,
              max: 10,
              message: 'Quick turnaround project',
              recommendation: 'Perfect for urgent needs or gifts',
              urgency: 'high'
            },
            {
              min: 11,
              max: 20,
              message: 'Standard processing timeline',
              recommendation: 'Our most common project timeline',
              urgency: 'medium'
            },
            {
              min: 21,
              max: 999,
              message: 'Large project timeline',
              recommendation: 'Consider breaking into smaller batches',
              urgency: 'low'
            }
          ]
        }
      ]
    },
    businessData: {
      searchVolume: 5,
      competition: 'low',
      conversionPotential: 6,
      engagementScore: 7
    }
  },

  // Memory Preservation Checklist
  {
    id: 'memory-preservation-checklist',
    slug: 'memory-preservation-checklist',
    title: 'Memory Preservation Checklist - Complete Digitization Guide',
    description: 'Complete memory preservation checklist to ensure you don\'t miss any important family memories. Comprehensive digitization planning tool.',
    type: 'checklist',
    serviceSlug: 'all',
    locationSlug: 'all',
    serviceName: 'All Services',
    locationName: 'All Locations',
    seoData: {
      title: 'Memory Preservation Checklist | Complete Digitization Guide | HeritageBox',
      description: 'Free memory preservation checklist. Comprehensive guide to ensure you preserve all your important family memories and documents.',
      keywords: [
        'memory preservation checklist',
        'digitization checklist',
        'family memory preservation',
        'photo preservation checklist',
        'video preservation guide'
      ],
      focusKeyword: 'memory preservation checklist',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Memory Preservation Checklist',
        description: 'Complete checklist for preserving family memories and documents'
      }
    },
    content: {
      heroTitle: 'Memory Preservation Checklist',
      heroSubtitle: 'Ensure you preserve all your precious family memories with our comprehensive guide',
      instructions: [
        'Go through each category of memories',
        'Check off items you want to preserve',
        'Get recommendations for each type',
        'Create your complete preservation plan'
      ],
      benefits: [
        'Don\'t miss any important memories',
        'Organize your preservation project',
        'Learn about different media types',
        'Get expert preservation tips'
      ],
      resultsBenefits: [
        'Complete inventory of your memories',
        'Prioritized preservation plan',
        'Cost estimates for each category',
        'Timeline for your complete project'
      ],
      ctaMessage: 'Start preserving your complete family history today!'
    },
    toolConfig: {
      inputs: [
        {
          id: 'photos_loose',
          label: 'Loose Photos',
          type: 'checkbox',
          required: false,
          helpText: 'Individual photos in boxes, drawers, or envelopes'
        },
        {
          id: 'photo_albums',
          label: 'Photo Albums',
          type: 'checkbox',
          required: false,
          helpText: 'Traditional photo albums with mounted pictures'
        },
        {
          id: 'slides_35mm',
          label: '35mm Slides',
          type: 'checkbox',
          required: false,
          helpText: 'Slides in frames, carousels, or boxes'
        },
        {
          id: 'negatives',
          label: 'Photo Negatives',
          type: 'checkbox',
          required: false,
          helpText: 'Film negatives from developed photos'
        },
        {
          id: 'vhs_tapes',
          label: 'VHS Tapes',
          type: 'checkbox',
          required: false,
          helpText: 'Home movies and recorded content on VHS'
        },
        {
          id: 'film_8mm',
          label: '8mm/Super 8 Film',
          type: 'checkbox',
          required: false,
          helpText: 'Old film reels from movie cameras'
        },
        {
          id: 'hi8_digital8',
          label: 'Hi8/Digital8 Tapes',
          type: 'checkbox',
          required: false,
          helpText: 'Camcorder tapes from the 90s and 2000s'
        },
        {
          id: 'minidv',
          label: 'MiniDV Tapes',
          type: 'checkbox',
          required: false,
          helpText: 'Small digital video cassettes'
        },
        {
          id: 'audio_cassettes',
          label: 'Audio Cassettes',
          type: 'checkbox',
          required: false,
          helpText: 'Music, voice recordings, or interviews'
        },
        {
          id: 'vinyl_records',
          label: 'Vinyl Records',
          type: 'checkbox',
          required: false,
          helpText: 'LP records, 45s, or 78s with family recordings'
        },
        {
          id: 'documents',
          label: 'Important Documents',
          type: 'checkbox',
          required: false,
          helpText: 'Birth certificates, letters, or historical papers'
        }
      ],
      calculations: [
        {
          id: 'total_categories',
          formula: 'countCheckedItems()'
        },
        {
          id: 'preservation_score',
          formula: 'total_categories * 10'
        }
      ],
      results: [
        {
          id: 'completeness_score',
          type: 'score',
          label: 'Memory Preservation Completeness',
          format: '{{value}}%',
          ranges: [
            {
              min: 0,
              max: 30,
              message: 'Getting started with memory preservation',
              recommendation: 'Focus on your most important memories first',
              urgency: 'low'
            },
            {
              min: 31,
              max: 70,
              message: 'Good progress on memory preservation',
              recommendation: 'Consider expanding to additional formats',
              urgency: 'medium'
            },
            {
              min: 71,
              max: 100,
              message: 'Comprehensive memory preservation plan',
              recommendation: 'You\'re preserving your complete family history!',
              urgency: 'high'
            }
          ]
        }
      ]
    },
    businessData: {
      searchVolume: 8,
      competition: 'low',
      conversionPotential: 8,
      engagementScore: 9
    }
  }
];

export const getInteractiveToolBySlug = (slug: string): InteractiveTool | undefined => {
  return interactiveToolsData.find(tool => tool.slug === slug);
};

export const getInteractiveToolsByType = (type: string): InteractiveTool[] => {
  return interactiveToolsData.filter(tool => tool.type === type);
};

export const getInteractiveToolsByService = (serviceSlug: string): InteractiveTool[] => {
  return interactiveToolsData.filter(tool => 
    tool.serviceSlug === serviceSlug || tool.serviceSlug === 'all'
  );
};

export const getAllInteractiveTools = (): InteractiveTool[] => {
  return interactiveToolsData;
};
