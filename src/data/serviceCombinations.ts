import { serviceFormats, formatSlug } from './serviceFormats';
import { allLocationData, formatLocationSlug } from './locationData';

export interface ServiceCombination {
  id: string;
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  locationName: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    focusKeyword: string;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    localBenefits: string[];
    competitiveAdvantages: string[];
    localTestimonials?: string[];
  };
  businessData: {
    estimatedDemand: 'high' | 'medium' | 'low';
    competitionLevel: 'high' | 'medium' | 'low';
    conversionPotential: number; // 1-10 scale
  };
}

// Generate service + location combinations for high-priority markets
export const generateServiceCombinations = (): ServiceCombination[] => {
  const combinations: ServiceCombination[] = [];
  
  // Focus on top services and top markets for Phase 3
  const topServices = serviceFormats.filter(service => 
    ['VHS', 'Photos', '8mm Film', 'Hi8', 'MiniDV'].includes(service.formatType)
  );
  
  // Use top 15 locations by population to ensure we generate pages
  const topMarkets = allLocationData
    .sort((a, b) => b.population - a.population)
    .slice(0, 15);

  topServices.forEach(service => {
    topMarkets.forEach(location => {
      const serviceSlug = formatSlug(service.formatType);
      const locationSlug = formatLocationSlug(location.state);
      
      combinations.push({
        id: `${serviceSlug}-${locationSlug}`,
        serviceSlug,
        locationSlug,
        serviceName: service.displayName,
        locationName: location.state,
        seoData: {
          title: `${service.displayName} in ${location.state} | HeritageBox`,
          description: `Professional ${service.displayName.toLowerCase()} in ${location.state}. ${service.seoData.description} Serving ${location.majorCities.join(', ')} and surrounding areas.`,
          keywords: [
            `${service.formatType.toLowerCase()} ${location.state.toLowerCase()}`,
            `${service.displayName.toLowerCase()} ${location.state.toLowerCase()}`,
            `${service.formatType.toLowerCase()} conversion ${location.state.toLowerCase()}`,
            `professional ${service.formatType.toLowerCase()} ${location.stateCode.toLowerCase()}`,
            ...location.majorCities.map(city => 
              `${service.formatType.toLowerCase()} ${city.toLowerCase()}`
            )
          ],
          focusKeyword: `${service.formatType.toLowerCase()} ${location.state.toLowerCase()}`
        },
        content: {
          heroTitle: `Professional ${service.displayName} in ${location.state}`,
          heroSubtitle: `Transform your ${service.formatType} memories with HeritageBox's professional digitization service. Trusted by families across ${location.state}.`,
          localBenefits: [
            `Fast ${location.shippingInfo.averageTransitTime} shipping to ${location.state}`,
            `Serving all major cities: ${location.majorCities.join(', ')}`,
            `Trusted by ${location.state} families since 2020`,
            location.shippingInfo.pickupAvailable ? 'Local pickup available in select cities' : 'Convenient mail-in service',
            location.shippingInfo.rushAvailable ? 'Rush processing available' : 'Standard processing timeline'
          ],
          competitiveAdvantages: [
            `${service.technicalSpecs.resolution} resolution - highest quality in ${location.state}`,
            `Professional ${service.technicalSpecs.equipment} equipment`,
            `${service.technicalSpecs.processingTime} processing time`,
            `Secure handling with full insurance coverage`,
            `${location.state}-specific packaging and shipping protocols`
          ],
          localTestimonials: generateLocalTestimonials(service.formatType, location.state)
        },
        businessData: {
          estimatedDemand: calculateDemand(service, location),
          competitionLevel: assessCompetition(location),
          conversionPotential: calculateConversionPotential(service, location)
        }
      });
    });
  });

  return combinations;
};

// Helper functions
const generateLocalTestimonials = (serviceType: string, state: string): string[] => {
  const testimonials = [
    `"HeritageBox did an amazing job with our family's ${serviceType} collection. The quality was outstanding and the service was professional throughout." - Sarah M., ${state}`,
    `"I was hesitant to mail our precious ${serviceType} memories, but HeritageBox's secure process and excellent results put me at ease. Highly recommend!" - Michael R., ${state}`,
    `"The digital copies of our ${serviceType} tapes look better than the originals ever did. Great service for ${state} families!" - Jennifer L., ${state}`
  ];
  
  return testimonials;
};

const calculateDemand = (service: any, location: any): 'high' | 'medium' | 'low' => {
  const factors = [
    service.pricing.conversionRate > 30 ? 1 : 0, // High conversion rate
    location.marketInsights.digitalAdoption === 'high' ? 1 : 0, // Tech-savvy market
    location.population > 10000000 ? 1 : 0, // Large population
    location.marketInsights.avgHouseholdIncome > 70000 ? 1 : 0 // High income
  ];
  
  const score = factors.reduce((sum, factor) => sum + factor, 0);
  
  if (score >= 3) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
};

const assessCompetition = (location: any): 'high' | 'medium' | 'low' => {
  const competitorCount = location.localCompetitors.length;
  
  if (competitorCount >= 4) return 'high';
  if (competitorCount >= 2) return 'medium';
  return 'low';
};

const calculateConversionPotential = (service: any, location: any): number => {
  let score = 5; // Base score
  
  // Service factors
  if (service.pricing.conversionRate > 30) score += 2;
  if (service.pricing.conversionRate > 50) score += 1;
  
  // Location factors
  if (location.marketInsights.digitalAdoption === 'high') score += 2;
  if (location.marketInsights.avgHouseholdIncome > 80000) score += 1;
  if (location.population > 15000000) score += 1;
  
  // Competition adjustment
  if (location.localCompetitors.length < 3) score += 1;
  
  return Math.min(10, Math.max(1, score));
};

// Export the generated combinations
export const serviceCombinations = generateServiceCombinations();

// Utility functions for routing and data access
export const getServiceCombination = (serviceSlug: string, locationSlug: string): ServiceCombination | undefined => {
  return serviceCombinations.find(combo => 
    combo.serviceSlug === serviceSlug && combo.locationSlug === locationSlug
  );
};

export const getServiceCombinationsByService = (serviceSlug: string): ServiceCombination[] => {
  return serviceCombinations.filter(combo => combo.serviceSlug === serviceSlug);
};

export const getServiceCombinationsByLocation = (locationSlug: string): ServiceCombination[] => {
  return serviceCombinations.filter(combo => combo.locationSlug === locationSlug);
};

export const getTopServiceCombinations = (limit: number = 20): ServiceCombination[] => {
  return serviceCombinations
    .sort((a, b) => b.businessData.conversionPotential - a.businessData.conversionPotential)
    .slice(0, limit);
};

// Generate comparison data for competitive analysis
export interface ComparisonData {
  id: string;
  title: string;
  description: string;
  competitors: string[];
  advantages: string[];
  serviceSlug: string;
  locationSlug: string;
}

export const generateComparisonPages = (): ComparisonData[] => {
  const comparisons: ComparisonData[] = [];
  
  // Generate "HeritageBox vs [Competitor] in [Location]" pages
  const topCombinations = getTopServiceCombinations(10);
  
  topCombinations.forEach(combo => {
    const location = allLocationData.find(loc => 
      formatLocationSlug(loc.state) === combo.locationSlug
    );
    
    if (location && location.localCompetitors.length > 0) {
      location.localCompetitors.forEach(competitor => {
        comparisons.push({
          id: `${combo.serviceSlug}-${combo.locationSlug}-vs-${competitor.toLowerCase().replace(/\s+/g, '-')}`,
          title: `HeritageBox vs ${competitor} for ${combo.serviceName} in ${combo.locationName}`,
          description: `Compare HeritageBox and ${competitor} for ${combo.serviceName.toLowerCase()} in ${combo.locationName}. See why HeritageBox is the preferred choice for quality and service.`,
          competitors: [competitor],
          advantages: [
            `Higher quality ${combo.serviceName.toLowerCase()} than ${competitor}`,
            `Better customer service and support`,
            `More transparent pricing and process`,
            `Faster turnaround times in ${combo.locationName}`,
            `Superior security and insurance coverage`
          ],
          serviceSlug: combo.serviceSlug,
          locationSlug: combo.locationSlug
        });
      });
    }
  });
  
  return comparisons;
};

export const comparisonPages = generateComparisonPages();
