import { serviceCombinations, getTopServiceCombinations } from './serviceCombinations';
import { allLocationData, formatLocationSlug } from './locationData';
import { serviceFormats, formatSlug } from './serviceFormats';

export interface ComparisonPage {
  id: string;
  slug: string;
  title: string;
  description: string;
  focusKeyword: string;
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  locationName: string;
  competitor: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    schema: any;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    comparisonTable: ComparisonTableRow[];
    advantages: string[];
    testimonials: string[];
    faq: FAQ[];
  };
  businessData: {
    competitorStrength: 'high' | 'medium' | 'low';
    winProbability: number; // 1-10 scale
    marketShare: number; // Estimated percentage
  };
}

export interface ComparisonTableRow {
  feature: string;
  heritageBox: string;
  competitor: string;
  advantage: 'heritageBox' | 'competitor' | 'tie';
}

export interface FAQ {
  question: string;
  answer: string;
}

// Generate comparison pages for top service combinations
export const generateComparisonPages = (): ComparisonPage[] => {
  const comparisons: ComparisonPage[] = [];
  const topCombinations = getTopServiceCombinations(15); // Focus on top 15 combinations
  
  // Major competitors to compare against
  const majorCompetitors = [
    {
      name: 'LegacyBox',
      strengths: ['Brand recognition', 'Marketing budget'],
      weaknesses: ['Higher prices', 'Less technical depth', 'Slower processing']
    },
    {
      name: 'Capture',
      strengths: ['Professional equipment', 'Quality focus'],
      weaknesses: ['Limited locations', 'Higher cost', 'Less variety']
    },
    {
      name: 'iMemories',
      strengths: ['Digital platform', 'Storage solutions'],
      weaknesses: ['Less personal service', 'Technical issues', 'Limited formats']
    }
  ];

  topCombinations.forEach(combination => {
    const location = allLocationData.find(loc => 
      formatLocationSlug(loc.state) === combination.locationSlug
    );
    
    if (location) {
      // Create comparison pages for each major competitor
      majorCompetitors.forEach(competitor => {
        const comparisonId = `${combination.serviceSlug}-${combination.locationSlug}-vs-${competitor.name.toLowerCase().replace(/\s+/g, '-')}`;
        
        comparisons.push({
          id: comparisonId,
          slug: `${combination.serviceSlug}-vs-${competitor.name.toLowerCase().replace(/\s+/g, '-')}-${combination.locationSlug}`,
          title: `HeritageBox vs ${competitor.name} for ${combination.serviceName} in ${combination.locationName}`,
          description: `Compare HeritageBox and ${competitor.name} for ${combination.serviceName.toLowerCase()} in ${combination.locationName}. See detailed comparison of pricing, quality, and service.`,
          focusKeyword: `${combination.serviceName.toLowerCase()} ${competitor.name.toLowerCase()} vs heritagebox ${combination.locationName.toLowerCase()}`,
          serviceSlug: combination.serviceSlug,
          locationSlug: combination.locationSlug,
          serviceName: combination.serviceName,
          locationName: combination.locationName,
          competitor: competitor.name,
          seoData: {
            title: `HeritageBox vs ${competitor.name}: ${combination.serviceName} in ${combination.locationName} | 2024 Comparison`,
            description: `Detailed comparison of HeritageBox vs ${competitor.name} for ${combination.serviceName.toLowerCase()} in ${combination.locationName}. Compare pricing, quality, turnaround time, and customer service.`,
            keywords: [
              `heritageBox vs ${competitor.name.toLowerCase()}`,
              `${combination.serviceName.toLowerCase()} ${competitor.name.toLowerCase()} comparison`,
              `best ${combination.serviceName.toLowerCase()} service ${combination.locationName.toLowerCase()}`,
              `${competitor.name.toLowerCase()} alternative ${combination.locationName.toLowerCase()}`,
              `${combination.serviceName.toLowerCase()} digitization comparison ${combination.locationName.toLowerCase()}`,
              `heritageBox ${competitor.name.toLowerCase()} ${combination.locationName.toLowerCase()}`,
              `professional ${combination.serviceName.toLowerCase()} ${combination.locationName.toLowerCase()} comparison`
            ],
            schema: generateComparisonSchema(combination, competitor.name, location)
          },
          content: {
            heroTitle: `HeritageBox vs ${competitor.name}: ${combination.serviceName} in ${combination.locationName}`,
            heroSubtitle: `Comprehensive comparison to help you choose the best ${combination.serviceName.toLowerCase()} service in ${combination.locationName}`,
            comparisonTable: generateComparisonTable(combination, competitor),
            advantages: generateAdvantages(combination, competitor, location),
            testimonials: generateComparisonTestimonials(combination, competitor.name),
            faq: generateComparisonFAQ(combination, competitor.name)
          },
          businessData: {
            competitorStrength: assessCompetitorStrength(competitor.name, location),
            winProbability: calculateWinProbability(combination, competitor, location),
            marketShare: estimateMarketShare(competitor.name, location)
          }
        });
      });
    }
  });

  return comparisons;
};

// Helper functions
const generateComparisonTable = (combination: any, competitor: any): ComparisonTableRow[] => {
  const service = serviceFormats.find(s => formatSlug(s.formatType) === combination.serviceSlug);
  
  return [
    {
      feature: 'Resolution Quality',
      heritageBox: service?.technicalSpecs.resolution || '4K Ultra HD',
      competitor: 'HD Quality',
      advantage: 'heritageBox'
    },
    {
      feature: 'Processing Time',
      heritageBox: service?.technicalSpecs.processingTime || '7-10 business days',
      competitor: '14-21 business days',
      advantage: 'heritageBox'
    },
    {
      feature: 'Equipment Used',
      heritageBox: service?.technicalSpecs.equipment?.join(', ') || 'Professional broadcast equipment',
      competitor: 'Consumer-grade equipment',
      advantage: 'heritageBox'
    },
    {
      feature: 'Output Formats',
      heritageBox: service?.technicalSpecs.outputFormats?.join(', ') || 'MP4, MOV, AVI',
      competitor: 'MP4 only',
      advantage: 'heritageBox'
    },
    {
      feature: 'Customer Support',
      heritageBox: '24/7 phone and email support',
      competitor: 'Email support only',
      advantage: 'heritageBox'
    },
    {
      feature: 'Pricing Transparency',
      heritageBox: 'Clear, upfront pricing',
      competitor: 'Hidden fees and charges',
      advantage: 'heritageBox'
    },
    {
      feature: 'Local Presence',
      heritageBox: `Serving ${combination.locationName} locally`,
      competitor: 'National service only',
      advantage: 'heritageBox'
    },
    {
      feature: 'Insurance Coverage',
      heritageBox: 'Full insurance on all items',
      competitor: 'Limited coverage',
      advantage: 'heritageBox'
    }
  ];
};

const generateAdvantages = (combination: any, competitor: any, location: any): string[] => {
  return [
    `Superior ${combination.serviceName.toLowerCase()} quality with professional equipment`,
    `Faster turnaround times in ${location.state}`,
    `Local ${location.state} expertise and understanding`,
    `Transparent pricing with no hidden fees`,
    `Better customer service and communication`,
    `More output format options than ${competitor.name}`,
    `Comprehensive insurance coverage`,
    `Established reputation in ${location.state} market`,
    `Technical expertise in ${combination.serviceName.toLowerCase()}`,
    `Personalized service for ${location.state} customers`
  ];
};

const generateComparisonTestimonials = (combination: any, competitorName: string): string[] => {
  return [
    `"I tried ${competitorName} first but wasn't happy with the quality. HeritageBox's ${combination.serviceName.toLowerCase()} was so much better - crystal clear and professional." - Maria K., ${combination.locationName}`,
    `"HeritageBox was faster and cheaper than ${competitorName}. The customer service was outstanding and they kept me updated throughout the process." - David R., ${combination.locationName}`,
    `"After comparing ${competitorName} and HeritageBox, the choice was clear. HeritageBox delivered superior quality and better value for ${combination.serviceName.toLowerCase()}." - Jennifer L., ${combination.locationName}`
  ];
};

const generateComparisonFAQ = (combination: any, competitorName: string): FAQ[] => {
  return [
    {
      question: `How does HeritageBox compare to ${competitorName} for ${combination.serviceName.toLowerCase()}?`,
      answer: `HeritageBox offers superior quality, faster processing times, and better customer service than ${competitorName}. Our professional equipment and local expertise in ${combination.locationName} ensure the best results for your ${combination.serviceName.toLowerCase()}.`
    },
    {
      question: `Is HeritageBox more expensive than ${competitorName}?`,
      answer: `HeritageBox offers competitive pricing with transparent, upfront costs. Unlike ${competitorName}, we don't have hidden fees, and our superior quality and faster service provide better overall value.`
    },
    {
      question: `Why should I choose HeritageBox over ${competitorName} in ${combination.locationName}?`,
      answer: `HeritageBox provides local expertise in ${combination.locationName}, faster shipping times, superior technical quality, and personalized customer service that ${competitorName} cannot match.`
    },
    {
      question: `What makes HeritageBox's ${combination.serviceName.toLowerCase()} better than ${competitorName}'s?`,
      answer: `Our professional broadcast equipment, higher resolution output, faster processing times, and comprehensive quality control process ensure superior results compared to ${competitorName}'s consumer-grade approach.`
    }
  ];
};

const generateComparisonSchema = (combination: any, competitorName: string, location: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    "name": `HeritageBox vs ${competitorName} for ${combination.serviceName} in ${location.state}`,
    "description": `Detailed comparison of HeritageBox and ${competitorName} for ${combination.serviceName.toLowerCase()} services in ${location.state}`,
    "mainEntity": [
      {
        "@type": "LocalBusiness",
        "name": "HeritageBox",
        "serviceType": combination.serviceName,
        "areaServed": location.state
      },
      {
        "@type": "LocalBusiness", 
        "name": competitorName,
        "serviceType": combination.serviceName,
        "areaServed": "United States"
      }
    ]
  };
};

const assessCompetitorStrength = (competitorName: string, location: any): 'high' | 'medium' | 'low' => {
  const competitorStrengths: { [key: string]: 'high' | 'medium' | 'low' } = {
    'LegacyBox': 'high',
    'Capture': 'medium', 
    'iMemories': 'medium'
  };
  
  return competitorStrengths[competitorName] || 'low';
};

const calculateWinProbability = (combination: any, competitor: any, location: any): number => {
  let score = 7; // Base confidence score
  
  // Adjust based on our strengths
  if (combination.businessData.conversionPotential >= 8) score += 1;
  if (location.marketInsights.digitalAdoption === 'high') score += 1;
  
  // Adjust based on competitor strength
  const competitorStrength = assessCompetitorStrength(competitor.name, location);
  if (competitorStrength === 'high') score -= 1;
  if (competitorStrength === 'low') score += 1;
  
  return Math.min(10, Math.max(1, score));
};

const estimateMarketShare = (competitorName: string, location: any): number => {
  const marketShares: { [key: string]: number } = {
    'LegacyBox': 35,
    'Capture': 15,
    'iMemories': 20
  };
  
  return marketShares[competitorName] || 5;
};

// Export generated comparison pages
export const comparisonPages = generateComparisonPages();

// Utility functions
export const getComparisonPage = (slug: string): ComparisonPage | undefined => {
  return comparisonPages.find(page => page.slug === slug);
};

export const getComparisonsByService = (serviceSlug: string): ComparisonPage[] => {
  return comparisonPages.filter(page => page.serviceSlug === serviceSlug);
};

export const getComparisonsByLocation = (locationSlug: string): ComparisonPage[] => {
  return comparisonPages.filter(page => page.locationSlug === locationSlug);
};

export const getTopComparisonPages = (limit: number = 10): ComparisonPage[] => {
  return comparisonPages
    .sort((a, b) => b.businessData.winProbability - a.businessData.winProbability)
    .slice(0, limit);
};
