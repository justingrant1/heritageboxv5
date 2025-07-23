import { serviceFormats, formatSlug } from '../data/serviceFormats';
import { allLocationData, formatLocationSlug } from '../data/locationData';
import { serviceCombinations } from '../data/serviceCombinations';
import { comparisonPages } from '../data/comparisonPages';
import { guidePages } from '../data/guidePages';
import { cityData } from '../data/cityData';
import { seasonalContentData } from '../data/seasonalContent';
import { interactiveToolsData } from '../data/interactiveTools';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private lastmod: string;

  constructor(baseUrl: string = 'https://heritagebox.com') {
    this.baseUrl = baseUrl;
    this.lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  generateSitemap(): SitemapUrl[] {
    const urls: SitemapUrl[] = [];

    // Add static pages
    urls.push(...this.getStaticPages());

    // Add service pages
    urls.push(...this.getServicePages());

    // Add service combination pages
    urls.push(...this.getServiceCombinationPages());

    // Add location pages
    urls.push(...this.getLocationPages());

    // Add comparison pages
    urls.push(...this.getComparisonPages());

    // Add guide pages
    urls.push(...this.getGuidePages());

    // Add city pages
    urls.push(...this.getCityPages());

    // Add seasonal content pages
    urls.push(...this.getSeasonalPages());

    // Add interactive tool pages
    urls.push(...this.getInteractiveToolPages());

    return urls.sort((a, b) => b.priority - a.priority);
  }

  private getStaticPages(): SitemapUrl[] {
    const staticPages = [
      { path: '/', priority: 1.0, changefreq: 'weekly' as const },
      { path: '/about-us', priority: 0.8, changefreq: 'monthly' as const },
      { path: '/contact', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' as const },
      { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly' as const },
    ];

    return staticPages.map(page => ({
      loc: `${this.baseUrl}${page.path}`,
      lastmod: this.lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    }));
  }

  private getServicePages(): SitemapUrl[] {
    return serviceFormats.map(service => ({
      loc: `${this.baseUrl}/services/${formatSlug(service.formatType)}`,
      lastmod: this.lastmod,
      changefreq: 'monthly' as const,
      priority: 0.9
    }));
  }

  private getServiceCombinationPages(): SitemapUrl[] {
    return serviceCombinations.map(combination => ({
      loc: `${this.baseUrl}/services/${combination.serviceSlug}/${combination.locationSlug}`,
      lastmod: this.lastmod,
      changefreq: 'monthly' as const,
      priority: combination.businessData.conversionPotential >= 8 ? 0.95 : 0.85
    }));
  }

  private getLocationPages(): SitemapUrl[] {
    const urls: SitemapUrl[] = [];

    // Add state pages
    allLocationData.forEach(location => {
      urls.push({
        loc: `${this.baseUrl}/locations/${formatLocationSlug(location.state)}`,
        lastmod: this.lastmod,
        changefreq: 'monthly' as const,
        priority: 0.8
      });

      // Add city pages
      location.majorCities.forEach(city => {
        urls.push({
          loc: `${this.baseUrl}/locations/${formatLocationSlug(location.state)}/${formatLocationSlug(city)}`,
          lastmod: this.lastmod,
          changefreq: 'monthly' as const,
          priority: 0.7
        });
      });
    });

    return urls;
  }

  private getComparisonPages(): SitemapUrl[] {
    return comparisonPages.map(comparison => ({
      loc: `${this.baseUrl}/compare/${comparison.slug}`,
      lastmod: this.lastmod,
      changefreq: 'monthly' as const,
      priority: comparison.businessData.winProbability >= 8 ? 0.9 : 0.8
    }));
  }

  private getGuidePages(): SitemapUrl[] {
    return guidePages.map(guide => ({
      loc: `${this.baseUrl}/guides/${guide.slug}`,
      lastmod: this.lastmod,
      changefreq: 'monthly' as const,
      priority: guide.businessData.searchVolume >= 150 ? 0.85 : 0.75
    }));
  }

  private getCityPages(): SitemapUrl[] {
    return cityData.map(city => ({
      loc: `${this.baseUrl}/cities/${city.id}`,
      lastmod: this.lastmod,
      changefreq: 'monthly' as const,
      priority: city.businessData.conversionPotential >= 8 ? 0.9 : 0.8
    }));
  }

  private getSeasonalPages(): SitemapUrl[] {
    return seasonalContentData.map(seasonal => ({
      loc: `${this.baseUrl}/seasonal/${seasonal.slug}`,
      lastmod: this.lastmod,
      changefreq: 'monthly' as const,
      priority: seasonal.businessData.searchVolume >= 200 ? 0.85 : 0.75
    }));
  }

  private getInteractiveToolPages(): SitemapUrl[] {
    return interactiveToolsData.map(tool => ({
      loc: `${this.baseUrl}/tools/${tool.slug}`,
      lastmod: this.lastmod,
      changefreq: 'weekly' as const,
      priority: tool.businessData.conversionPotential >= 8 ? 0.9 : 0.8
    }));
  }

  generateXmlSitemap(): string {
    const urls = this.generateSitemap();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    return xml;
  }

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block admin and checkout pages from indexing
Disallow: /admin/
Disallow: /checkout/
Disallow: /order-confirmation/
Disallow: /api/

# Allow all service and location pages
Allow: /services/
Allow: /locations/
`;
  }

  getPageCount(): { total: number; services: number; locations: number; combinations: number; comparisons: number; guides: number; cities: number; seasonal: number; tools: number; static: number } {
    const services = serviceFormats.length;
    const combinations = serviceCombinations.length;
    const comparisons = comparisonPages.length;
    const guides = guidePages.length;
    const cities = cityData.length;
    const seasonal = seasonalContentData.length;
    const tools = interactiveToolsData.length;
    const states = allLocationData.length;
    const locationCities = allLocationData.reduce((total, location) => total + location.majorCities.length, 0);
    const locations = states + locationCities;
    const staticPages = 5; // Home, About, Contact, Privacy, Terms
    
    return {
      total: services + combinations + locations + comparisons + guides + cities + seasonal + tools + staticPages,
      services,
      combinations,
      locations,
      comparisons,
      guides,
      cities,
      seasonal,
      tools,
      static: staticPages
    };
  }

  generateKeywordReport(): { service: string; keywords: string[]; priority: number }[] {
    return serviceFormats.map(service => ({
      service: service.displayName,
      keywords: service.seoData.keywords,
      priority: service.pricing.conversionRate <= 25 ? 0.9 : 0.8 // Higher priority for common formats
    }));
  }

  generateLocationKeywordReport(): { location: string; keywords: string[]; population: number }[] {
    return allLocationData.map(location => ({
      location: location.state,
      keywords: location.seoData.keywords,
      population: location.population
    }));
  }
}

// Export singleton instance
export const sitemapGenerator = new SitemapGenerator();

// Utility function to generate and log sitemap statistics
export const logSitemapStats = (): void => {
  const stats = sitemapGenerator.getPageCount();
  console.log('=== HeritageBox Phase 5 SEO Sitemap Statistics ===');
  console.log(`Total Pages: ${stats.total}`);
  console.log(`Service Pages: ${stats.services}`);
  console.log(`Service Combination Pages: ${stats.combinations}`);
  console.log(`Comparison Pages: ${stats.comparisons}`);
  console.log(`Guide Pages: ${stats.guides}`);
  console.log(`City Pages: ${stats.cities}`);
  console.log(`Seasonal Content Pages: ${stats.seasonal}`);
  console.log(`Interactive Tool Pages: ${stats.tools}`);
  console.log(`Location Pages: ${stats.locations}`);
  console.log(`Static Pages: ${stats.static}`);
  console.log('====================================================');
  
  const keywordReport = sitemapGenerator.generateKeywordReport();
  console.log('\n=== Service Keyword Targeting ===');
  keywordReport.forEach(report => {
    console.log(`${report.service}: ${report.keywords.join(', ')}`);
  });
  
  const locationReport = sitemapGenerator.generateLocationKeywordReport();
  console.log('\n=== Location Keyword Targeting ===');
  locationReport.slice(0, 5).forEach(report => {
    console.log(`${report.location}: ${report.keywords.join(', ')}`);
  });
};
