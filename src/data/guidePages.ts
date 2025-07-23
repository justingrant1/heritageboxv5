import { serviceCombinations, getTopServiceCombinations } from './serviceCombinations';
import { allLocationData, formatLocationSlug } from './locationData';
import { serviceFormats, formatSlug } from './serviceFormats';

export interface GuidePage {
  id: string;
  slug: string;
  title: string;
  description: string;
  focusKeyword: string;
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  locationName: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    schema: any;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    introduction: string;
    steps: GuideStep[];
    tips: string[];
    commonMistakes: string[];
    localConsiderations: string[];
    conclusion: string;
  };
  businessData: {
    searchVolume: number;
    difficulty: 'low' | 'medium' | 'high';
    conversionPotential: number; // 1-10 scale
  };
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  image?: string;
}

// Generate guide pages for top service combinations
export const generateGuidePages = (): GuidePage[] => {
  const guides: GuidePage[] = [];
  const topCombinations = getTopServiceCombinations(20); // Focus on top 20 combinations
  
  topCombinations.forEach(combination => {
    const location = allLocationData.find(loc => 
      formatLocationSlug(loc.state) === combination.locationSlug
    );
    
    if (location) {
      const guideId = `how-to-${combination.serviceSlug}-${combination.locationSlug}`;
      
      guides.push({
        id: guideId,
        slug: `how-to-${combination.serviceSlug}-${combination.locationSlug}`,
        title: `How to ${combination.serviceName} in ${combination.locationName}`,
        description: `Complete guide to ${combination.serviceName.toLowerCase()} in ${combination.locationName}. Step-by-step instructions, tips, and local considerations.`,
        focusKeyword: `how to ${combination.serviceName.toLowerCase()} ${combination.locationName.toLowerCase()}`,
        serviceSlug: combination.serviceSlug,
        locationSlug: combination.locationSlug,
        serviceName: combination.serviceName,
        locationName: combination.locationName,
        seoData: {
          title: `How to ${combination.serviceName} in ${combination.locationName} | Complete Guide 2024`,
          description: `Complete guide to ${combination.serviceName.toLowerCase()} in ${combination.locationName}. Step-by-step process, local tips, costs, and best practices for ${combination.locationName} residents.`,
          keywords: [
            `how to ${combination.serviceName.toLowerCase()} ${combination.locationName.toLowerCase()}`,
            `${combination.serviceName.toLowerCase()} guide ${combination.locationName.toLowerCase()}`,
            `${combination.serviceName.toLowerCase()} process ${combination.locationName.toLowerCase()}`,
            `${combination.serviceName.toLowerCase()} steps ${combination.locationName.toLowerCase()}`,
            `${combination.serviceName.toLowerCase()} tutorial ${combination.locationName.toLowerCase()}`,
            `${combination.serviceName.toLowerCase()} instructions ${combination.locationName.toLowerCase()}`,
            `best way ${combination.serviceName.toLowerCase()} ${combination.locationName.toLowerCase()}`
          ],
          schema: generateGuideSchema(combination, location)
        },
        content: {
          heroTitle: `How to ${combination.serviceName} in ${combination.locationName}`,
          heroSubtitle: `Complete step-by-step guide to ${combination.serviceName.toLowerCase()} for ${combination.locationName} residents`,
          introduction: generateIntroduction(combination, location),
          steps: generateGuideSteps(combination, location),
          tips: generateTips(combination, location),
          commonMistakes: generateCommonMistakes(combination),
          localConsiderations: generateLocalConsiderations(combination, location),
          conclusion: generateConclusion(combination, location)
        },
        businessData: {
          searchVolume: estimateSearchVolume(combination, location),
          difficulty: assessKeywordDifficulty(combination, location),
          conversionPotential: combination.businessData.conversionPotential
        }
      });
    }
  });

  return guides;
};

// Helper functions
const generateIntroduction = (combination: any, location: any): string => {
  return `${combination.serviceName} is an important process for preserving your precious memories in ${location.state}. Whether you have old family ${combination.serviceName.toLowerCase()} or professional content, this comprehensive guide will walk you through everything you need to know about ${combination.serviceName.toLowerCase()} in ${location.state}. From understanding the process to choosing the right service provider, we'll cover all the essential steps to ensure your memories are preserved with the highest quality.`;
};

const generateGuideSteps = (combination: any, location: any): GuideStep[] => {
  const service = serviceFormats.find(s => formatSlug(s.formatType) === combination.serviceSlug);
  
  const baseSteps: GuideStep[] = [
    {
      stepNumber: 1,
      title: `Assess Your ${combination.serviceName} Collection`,
      description: `Start by evaluating what you have and determining the scope of your ${combination.serviceName.toLowerCase()} project.`,
      details: [
        `Count the number of items you need to convert`,
        `Check the condition of your ${combination.serviceName.toLowerCase()}`,
        `Identify any damaged or deteriorating items that need priority`,
        `Organize items by importance or chronological order`,
        `Take inventory photos for your records`
      ]
    },
    {
      stepNumber: 2,
      title: `Research ${combination.serviceName} Options in ${location.state}`,
      description: `Understand the different approaches available for ${combination.serviceName.toLowerCase()} in your area.`,
      details: [
        `Compare DIY vs professional services`,
        `Research local ${location.state} service providers`,
        `Understand quality differences and pricing`,
        `Read reviews from other ${location.state} customers`,
        `Consider turnaround times and shipping logistics`
      ]
    },
    {
      stepNumber: 3,
      title: `Prepare Your Items for Processing`,
      description: `Properly prepare your materials to ensure the best possible results.`,
      details: [
        `Clean items gently if needed (avoid harsh chemicals)`,
        `Remove items from damaged cases or containers`,
        `Label items clearly for identification`,
        `Create a detailed inventory list`,
        `Take photos of items before sending`
      ]
    },
    {
      stepNumber: 4,
      title: `Choose Your Service Provider`,
      description: `Select the right ${combination.serviceName.toLowerCase()} service for your needs and budget.`,
      details: [
        `Compare pricing and service packages`,
        `Verify insurance and security policies`,
        `Check equipment quality and technical specifications`,
        `Confirm turnaround times for ${location.state}`,
        `Review customer service and communication policies`
      ]
    },
    {
      stepNumber: 5,
      title: `Package and Ship Your Items`,
      description: `Safely prepare and send your precious memories for processing.`,
      details: [
        `Use provided shipping materials or sturdy boxes`,
        `Wrap items individually for protection`,
        `Include completed order forms and inventory`,
        `Take photos of packaged items`,
        `Use trackable shipping methods`
      ]
    },
    {
      stepNumber: 6,
      title: `Monitor Progress and Receive Results`,
      description: `Stay informed about your order and receive your digitized memories.`,
      details: [
        `Track your shipment to the processing facility`,
        `Monitor order status through customer portal`,
        `Review and approve any quality concerns`,
        `Receive digital files and original items back`,
        `Verify all items are returned safely`
      ]
    }
  ];

  // Add service-specific steps
  if (service?.technicalSpecs.resolution.includes('4K') || service?.technicalSpecs.resolution.includes('HD')) {
    baseSteps.push({
      stepNumber: 7,
      title: `Optimize Your Digital Files`,
      description: `Make the most of your newly digitized ${combination.serviceName.toLowerCase()}.`,
      details: [
        `Organize files with clear naming conventions`,
        `Create backup copies on multiple devices`,
        `Consider cloud storage for accessibility`,
        `Share with family members in ${location.state}`,
        `Create photo books or video compilations`
      ]
    });
  }

  return baseSteps;
};

const generateTips = (combination: any, location: any): string[] => {
  return [
    `Start with your most important or deteriorating ${combination.serviceName.toLowerCase()} first`,
    `Take advantage of ${location.state} local pickup services if available`,
    `Consider seasonal timing - avoid busy holiday periods for faster service`,
    `Bundle similar items together for potential volume discounts`,
    `Keep detailed records of what you send for insurance purposes`,
    `Ask about rush services if you need items back quickly`,
    `Inquire about ${location.state}-specific shipping options and timing`,
    `Consider the weather in ${location.state} when shipping sensitive materials`,
    `Join local ${location.state} groups or forums for recommendations`,
    `Plan ahead for special occasions when you might want the digitized content`
  ];
};

const generateCommonMistakes = (combination: any): string[] => {
  return [
    `Choosing the cheapest option without considering quality`,
    `Not researching the company's reputation and reviews`,
    `Failing to create an inventory before shipping items`,
    `Not taking photos of items before sending them`,
    `Ignoring insurance options for valuable or irreplaceable items`,
    `Rushing the selection process without comparing options`,
    `Not asking about the specific equipment and processes used`,
    `Forgetting to ask about file formats and delivery methods`,
    `Not understanding the turnaround time commitments`,
    `Failing to backup digital files once received`
  ];
};

const generateLocalConsiderations = (combination: any, location: any): string[] => {
  return [
    `${location.state} shipping times: Average ${location.shippingInfo.averageTransitTime} each way`,
    `Local pickup available: ${location.shippingInfo.pickupAvailable ? 'Yes, in select cities' : 'Mail-in service only'}`,
    `Rush processing: ${location.shippingInfo.rushAvailable ? 'Available for urgent needs' : 'Standard processing only'}`,
    `Weather considerations: Plan around ${location.state} weather patterns that might affect shipping`,
    `Local tax implications: Understand ${location.state} sales tax on services`,
    `Regional preferences: ${location.state} customers often prefer [specific format/quality options]`,
    `Insurance requirements: Consider ${location.state} regulations for valuable item shipping`,
    `Local competition: Compare with other ${location.state}-based service providers`,
    `Community resources: Check ${location.state} libraries or community centers for equipment`,
    `Seasonal demand: ${location.state} residents often have higher demand during [specific seasons]`
  ];
};

const generateConclusion = (combination: any, location: any): string => {
  return `${combination.serviceName} in ${location.state} doesn't have to be complicated when you follow the right steps. By carefully assessing your collection, researching your options, and choosing a reputable service provider, you can ensure your precious memories are preserved with the highest quality. Remember that the cheapest option isn't always the best - focus on finding a service that offers the right balance of quality, security, and value for your specific needs in ${location.state}. With proper planning and the right partner, you'll have your ${combination.serviceName.toLowerCase()} digitized and ready to share with family and friends for generations to come.`;
};

const generateGuideSchema = (combination: any, location: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to ${combination.serviceName} in ${location.state}`,
    "description": `Complete guide to ${combination.serviceName.toLowerCase()} in ${location.state}`,
    "totalTime": "PT2W",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "50-200"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": combination.serviceName
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Professional digitization service"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": `Assess Your ${combination.serviceName} Collection`,
        "text": `Evaluate your ${combination.serviceName.toLowerCase()} collection and determine the scope of your project.`
      },
      {
        "@type": "HowToStep", 
        "name": `Research Options in ${location.state}`,
        "text": `Compare different ${combination.serviceName.toLowerCase()} services available in ${location.state}.`
      },
      {
        "@type": "HowToStep",
        "name": "Prepare Your Items",
        "text": "Properly prepare your materials for the best possible results."
      }
    ]
  };
};

const estimateSearchVolume = (combination: any, location: any): number => {
  let baseVolume = 100;
  
  // Adjust based on service popularity
  if (combination.businessData.conversionPotential >= 8) baseVolume += 50;
  
  // Adjust based on location population
  if (location.population > 20000000) baseVolume += 100;
  else if (location.population > 10000000) baseVolume += 50;
  
  // Adjust based on digital adoption
  if (location.marketInsights.digitalAdoption === 'high') baseVolume += 30;
  
  return baseVolume;
};

const assessKeywordDifficulty = (combination: any, location: any): 'low' | 'medium' | 'high' => {
  let difficultyScore = 0;
  
  // Higher competition for popular services
  if (combination.businessData.conversionPotential >= 8) difficultyScore += 1;
  
  // Higher competition in large markets
  if (location.population > 15000000) difficultyScore += 1;
  
  // Higher competition in high digital adoption areas
  if (location.marketInsights.digitalAdoption === 'high') difficultyScore += 1;
  
  if (difficultyScore >= 2) return 'high';
  if (difficultyScore === 1) return 'medium';
  return 'low';
};

// Export generated guide pages
export const guidePages = generateGuidePages();

// Utility functions
export const getGuidePage = (slug: string): GuidePage | undefined => {
  return guidePages.find(page => page.slug === slug);
};

export const getGuidesByService = (serviceSlug: string): GuidePage[] => {
  return guidePages.filter(page => page.serviceSlug === serviceSlug);
};

export const getGuidesByLocation = (locationSlug: string): GuidePage[] => {
  return guidePages.filter(page => page.locationSlug === locationSlug);
};

export const getTopGuidePages = (limit: number = 10): GuidePage[] => {
  return guidePages
    .sort((a, b) => b.businessData.searchVolume - a.businessData.searchVolume)
    .slice(0, limit);
};
