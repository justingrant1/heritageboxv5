import { ServiceFormat } from '../data/serviceFormats';
import { LocationData } from '../data/locationData';

export interface TemplateSection {
  id: string;
  type: 'hero' | 'features' | 'technical' | 'pricing' | 'benefits' | 'faq' | 'cta' | 'testimonials';
  title?: string;
  content: string;
  variables: string[];
  conditional?: {
    field: string;
    value: any;
    operator: 'equals' | 'includes' | 'greaterThan' | 'exists';
  };
}

export interface ContentTemplate {
  id: string;
  type: 'service' | 'location' | 'guide' | 'comparison';
  name: string;
  sections: TemplateSection[];
  seoTemplate: {
    title: string;
    description: string;
    keywords: string[];
    schema?: any;
  };
}

export class TemplateEngine {
  private templates: Map<string, ContentTemplate> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // Service page template
    const serviceTemplate: ContentTemplate = {
      id: 'service-page',
      type: 'service',
      name: 'Service Page Template',
      sections: [
        {
          id: 'hero',
          type: 'hero',
          title: 'Hero Section',
          content: `
            <div class="hero-section bg-gradient-to-br from-cream via-cream to-cream/80 py-20">
              <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                  <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6">
                    Professional {{displayName}} Service
                  </h1>
                  <p class="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                    {{longDescription}}
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/package-selected?package=Popular" class="btn-primary">
                      Get Started Today
                    </a>
                    <a href="/#how-it-works" class="btn-secondary">
                      See How It Works
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['displayName', 'longDescription']
        },
        {
          id: 'features',
          type: 'features',
          title: 'Key Features',
          content: `
            <div class="features-section py-16 bg-white">
              <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Why Choose Our {{displayName}} Service?</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {{#each benefits}}
                  <div class="feature-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">{{this}}</h3>
                    <p class="text-gray-600">Professional {{../formatType}} conversion with guaranteed quality.</p>
                  </div>
                  {{/each}}
                </div>
              </div>
            </div>
          `,
          variables: ['displayName', 'benefits', 'formatType']
        },
        {
          id: 'technical',
          type: 'technical',
          title: 'Technical Specifications',
          content: `
            <div class="technical-section py-16 bg-gray-50">
              <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold text-center mb-12">Technical Specifications</h2>
                  <div class="grid md:grid-cols-2 gap-8">
                    <div class="spec-card bg-white p-6 rounded-lg shadow-sm">
                      <h3 class="text-xl font-semibold mb-4">Output Quality</h3>
                      <p class="text-lg text-primary font-medium">{{resolution}}</p>
                      <p class="text-gray-600 mt-2">Professional-grade resolution ensuring maximum detail preservation.</p>
                    </div>
                    <div class="spec-card bg-white p-6 rounded-lg shadow-sm">
                      <h3 class="text-xl font-semibold mb-4">Processing Time</h3>
                      <p class="text-lg text-primary font-medium">{{processingTime}}</p>
                      <p class="text-gray-600 mt-2">Careful processing ensures the highest quality results.</p>
                    </div>
                    <div class="spec-card bg-white p-6 rounded-lg shadow-sm">
                      <h3 class="text-xl font-semibold mb-4">Equipment Used</h3>
                      <ul class="text-gray-700">
                        {{#each equipment}}
                        <li class="flex items-center mb-2">
                          <span class="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          {{this}}
                        </li>
                        {{/each}}
                      </ul>
                    </div>
                    <div class="spec-card bg-white p-6 rounded-lg shadow-sm">
                      <h3 class="text-xl font-semibold mb-4">Output Formats</h3>
                      <ul class="text-gray-700">
                        {{#each outputFormats}}
                        <li class="flex items-center mb-2">
                          <span class="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          {{this}}
                        </li>
                        {{/each}}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['resolution', 'processingTime', 'equipment', 'outputFormats']
        },
        {
          id: 'pricing',
          type: 'pricing',
          title: 'Package Information',
          content: `
            <div class="pricing-section py-16 bg-white">
              <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">{{displayName}} Package Availability</h2>
                <div class="max-w-4xl mx-auto">
                  <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <h3 class="font-semibold text-blue-900 mb-2">Package Conversion Rate</h3>
                    <p class="text-blue-800">
                      1 {{formatType}} = {{conversionRate}} photos in your package allowance.
                      {{#if (gt conversionRate 25)}}
                      This format requires more processing time and counts as {{conversionRate}} photos.
                      {{/if}}
                    </p>
                  </div>
                  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {{#if starterIncluded}}
                    <div class="package-card border-2 border-primary rounded-lg p-6">
                      <h4 class="text-lg font-semibold text-primary mb-2">Starter Package</h4>
                      <p class="text-gray-600">✓ {{displayName}} included</p>
                    </div>
                    {{/if}}
                    {{#if popularIncluded}}
                    <div class="package-card border-2 border-secondary rounded-lg p-6 bg-secondary/5">
                      <h4 class="text-lg font-semibold text-secondary mb-2">Popular Package</h4>
                      <p class="text-gray-600">✓ {{displayName}} included</p>
                      <span class="text-sm bg-secondary text-white px-2 py-1 rounded mt-2 inline-block">Most Popular</span>
                    </div>
                    {{/if}}
                    {{#if dustyRoseIncluded}}
                    <div class="package-card border-2 border-rose-500 rounded-lg p-6">
                      <h4 class="text-lg font-semibold text-rose-500 mb-2">Dusty Rose Package</h4>
                      <p class="text-gray-600">✓ {{displayName}} included</p>
                    </div>
                    {{/if}}
                    {{#if eternalIncluded}}
                    <div class="package-card border-2 border-blue-400 rounded-lg p-6">
                      <h4 class="text-lg font-semibold text-blue-400 mb-2">Eternal Package</h4>
                      <p class="text-gray-600">✓ {{displayName}} included</p>
                    </div>
                    {{/if}}
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['displayName', 'formatType', 'conversionRate', 'starterIncluded', 'popularIncluded', 'dustyRoseIncluded', 'eternalIncluded']
        },
        {
          id: 'faq',
          type: 'faq',
          title: 'Common Issues & Solutions',
          content: `
            <div class="faq-section py-16 bg-gray-50">
              <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Common {{formatType}} Issues We Handle</h2>
                <div class="max-w-3xl mx-auto">
                  {{#each commonIssues}}
                  <div class="faq-item bg-white rounded-lg p-6 mb-4 shadow-sm">
                    <h3 class="text-lg font-semibold mb-3">{{this}}</h3>
                    <p class="text-gray-600">Our professional equipment and expertise can handle {{this}} issues that commonly affect {{../formatType}} media.</p>
                  </div>
                  {{/each}}
                </div>
              </div>
            </div>
          `,
          variables: ['formatType', 'commonIssues']
        },
        {
          id: 'cta',
          type: 'cta',
          title: 'Call to Action',
          content: `
            <div class="cta-section py-16 bg-primary text-white">
              <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-6">Ready to Preserve Your {{formatType}} Memories?</h2>
                <p class="text-xl mb-8 opacity-90">
                  Don't let your precious {{formatType}} memories fade away. Start your digitization project today.
                </p>
                <a href="/package-selected?package=Popular" class="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                  Choose Your Package
                </a>
              </div>
            </div>
          `,
          variables: ['formatType']
        }
      ],
      seoTemplate: {
        title: 'Professional {{displayName}} | HeritageBox Digital Conversion',
        description: 'Convert your {{formatType}} to digital with HeritageBox\'s professional {{displayName.toLowerCase()}}. {{resolution}} quality, secure processing, satisfaction guaranteed.',
        keywords: ['{{focusKeyword}}', '{{formatType}} to digital', '{{formatType}} conversion service', 'digitize {{formatType}}', '{{formatType}} transfer'],
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "{{displayName}}",
          "description": "{{longDescription}}",
          "provider": {
            "@type": "Organization",
            "name": "HeritageBox",
            "url": "https://heritagebox.com"
          },
          "serviceType": "{{displayName}}",
          "areaServed": "United States"
        }
      }
    };

    // Location page template
    const locationTemplate: ContentTemplate = {
      id: 'location-page',
      type: 'location',
      name: 'Location Page Template',
      sections: [
        {
          id: 'hero',
          type: 'hero',
          title: 'Location Hero',
          content: `
            <div class="hero-section bg-gradient-to-br from-cream via-cream to-cream/80 py-20">
              <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                  <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6">
                    Professional Memory Digitization Services in {{displayName}}
                  </h1>
                  <p class="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                    HeritageBox provides secure, professional digitization services to families and businesses throughout {{state}}. Ship your precious memories to us with confidence.
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/package-selected?package=Popular" class="btn-primary">
                      Get Started Today
                    </a>
                    <a href="/#how-it-works" class="btn-secondary">
                      See How It Works
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['displayName', 'state']
        },
        {
          id: 'services',
          type: 'features',
          title: 'Local Services',
          content: `
            <div class="services-section py-16 bg-white">
              <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Digitization Services Available in {{state}}</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div class="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">VHS to Digital</h3>
                    <p class="text-gray-600">Convert your VHS tapes to digital format with professional quality.</p>
                  </div>
                  <div class="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Photo Scanning</h3>
                    <p class="text-gray-600">High-resolution scanning of your precious family photographs.</p>
                  </div>
                  <div class="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Film Transfer</h3>
                    <p class="text-gray-600">Professional 8mm and Super 8 film to digital conversion.</p>
                  </div>
                  <div class="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Slide Digitization</h3>
                    <p class="text-gray-600">Convert 35mm slides to high-resolution digital images.</p>
                  </div>
                  <div class="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Camcorder Tapes</h3>
                    <p class="text-gray-600">Hi8, Digital8, and MiniDV tape conversion services.</p>
                  </div>
                  <div class="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 class="text-xl font-semibold mb-3">Audio Digitization</h3>
                    <p class="text-gray-600">Convert cassette tapes and other audio formats to digital.</p>
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['state']
        },
        {
          id: 'shipping',
          type: 'technical',
          title: 'Shipping Information',
          content: `
            <div class="shipping-section py-16 bg-gray-50">
              <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto">
                  <h2 class="text-3xl font-bold text-center mb-12">Shipping to {{state}}</h2>
                  <div class="grid md:grid-cols-2 gap-8">
                    <div class="shipping-card bg-white p-6 rounded-lg shadow-sm">
                      <h3 class="text-xl font-semibold mb-4">Transit Time</h3>
                      <p class="text-lg text-primary font-medium">{{averageTransitTime}}</p>
                      <p class="text-gray-600 mt-2">Average shipping time from {{state}} to our processing facility.</p>
                    </div>
                    <div class="shipping-card bg-white p-6 rounded-lg shadow-sm">
                      <h3 class="text-xl font-semibold mb-4">Shipping Options</h3>
                      <ul class="text-gray-700">
                        <li class="flex items-center mb-2">
                          <span class="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          Free prepaid shipping label
                        </li>
                        <li class="flex items-center mb-2">
                          <span class="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          Secure packaging included
                        </li>
                        {{#if pickupAvailable}}
                        <li class="flex items-center mb-2">
                          <span class="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          Local pickup available
                        </li>
                        {{/if}}
                        {{#if rushAvailable}}
                        <li class="flex items-center mb-2">
                          <span class="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          Rush processing available
                        </li>
                        {{/if}}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['state', 'averageTransitTime', 'pickupAvailable', 'rushAvailable']
        },
        {
          id: 'cities',
          type: 'features',
          title: 'Major Cities Served',
          content: `
            <div class="cities-section py-16 bg-white">
              <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Serving Major Cities in {{state}}</h2>
                <div class="max-w-4xl mx-auto">
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {{#each majorCities}}
                    <div class="city-card p-4 rounded-lg border border-gray-200 text-center">
                      <h3 class="text-lg font-semibold">{{this}}</h3>
                      <p class="text-gray-600 text-sm">Professional digitization services</p>
                    </div>
                    {{/each}}
                  </div>
                  <div class="text-center mt-8">
                    <p class="text-gray-600">
                      Don't see your city? We serve all of {{state}} with our mail-in digitization service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `,
          variables: ['state', 'majorCities']
        }
      ],
      seoTemplate: {
        title: 'Professional Memory Digitization Services in {{displayName}} | HeritageBox',
        description: 'HeritageBox provides professional digitization services throughout {{state}}. Convert VHS, photos, and film to digital. Free shipping, secure processing.',
        keywords: ['digitization service {{state}}', 'photo scanning {{stateCode}}', 'VHS conversion {{state}}', 'memory preservation {{state}}'],
        schema: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "HeritageBox - {{state}} Digitization Services",
          "description": "Professional memory digitization services serving {{state}}",
          "areaServed": {
            "@type": "State",
            "name": "{{state}}"
          },
          "serviceArea": {
            "@type": "State",
            "name": "{{state}}"
          }
        }
      }
    };

    this.templates.set('service-page', serviceTemplate);
    this.templates.set('location-page', locationTemplate);
  }

  processTemplate(templateId: string, data: any): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    let processedContent = '';
    
    template.sections.forEach(section => {
      // Check conditional rendering
      if (section.conditional) {
        const { field, value, operator } = section.conditional;
        const fieldValue = this.getNestedValue(data, field);
        
        if (!this.evaluateCondition(fieldValue, value, operator)) {
          return; // Skip this section
        }
      }

      // Process template variables
      let sectionContent = section.content;
      
      // Simple variable replacement
      sectionContent = sectionContent.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
        const value = this.getNestedValue(data, variable.trim());
        return value !== undefined ? String(value) : match;
      });

      // Handle Handlebars-style each loops
      sectionContent = sectionContent.replace(/\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayName, loopContent) => {
        const array = this.getNestedValue(data, arrayName.trim());
        if (!Array.isArray(array)) return '';
        
        return array.map(item => {
          let itemContent = loopContent;
          if (typeof item === 'string') {
            itemContent = itemContent.replace(/\{\{this\}\}/g, item);
            itemContent = itemContent.replace(/\{\{\.\.\/([^}]+)\}\}/g, (match, parentVar) => {
              const parentValue = this.getNestedValue(data, parentVar);
              return parentValue !== undefined ? String(parentValue) : match;
            });
          }
          return itemContent;
        }).join('');
      });

      // Handle conditional blocks
      sectionContent = sectionContent.replace(/\{\{#if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
        const conditionValue = this.getNestedValue(data, condition.trim());
        return conditionValue ? content : '';
      });

      processedContent += sectionContent;
    });

    return processedContent;
  }

  processSEOTemplate(templateId: string, data: any): any {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const seoTemplate = template.seoTemplate;
    const processedSEO: any = {};

    // Process title
    processedSEO.title = seoTemplate.title.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
      const value = this.getNestedValue(data, variable.trim());
      return value !== undefined ? String(value) : match;
    });

    // Process description
    processedSEO.description = seoTemplate.description.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
      const value = this.getNestedValue(data, variable.trim());
      return value !== undefined ? String(value) : match;
    });

    // Process keywords
    processedSEO.keywords = seoTemplate.keywords.map(keyword => 
      keyword.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
        const value = this.getNestedValue(data, variable.trim());
        return value !== undefined ? String(value) : match;
      })
    );

    // Process schema
    if (seoTemplate.schema) {
      processedSEO.schema = [this.processSchemaTemplate(seoTemplate.schema, data)];
    }

    return processedSEO;
  }

  private processSchemaTemplate(schema: any, data: any): any {
    const processValue = (value: any): any => {
      if (typeof value === 'string') {
        return value.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
          const val = this.getNestedValue(data, variable.trim());
          return val !== undefined ? String(val) : match;
        });
      }
      if (Array.isArray(value)) {
        return value.map(processValue);
      }
      if (typeof value === 'object' && value !== null) {
        const processed: any = {};
        Object.keys(value).forEach(key => {
          processed[key] = processValue(value[key]);
        });
        return processed;
      }
      return value;
    };

    return processValue(schema);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  private evaluateCondition(fieldValue: any, expectedValue: any, operator: string): boolean {
    switch (operator) {
      case 'equals':
        return fieldValue === expectedValue;
      case 'includes':
        return Array.isArray(fieldValue) ? fieldValue.includes(expectedValue) : false;
      case 'greaterThan':
        return typeof fieldValue === 'number' && fieldValue > expectedValue;
      case 'exists':
        return fieldValue !== undefined && fieldValue !== null;
      default:
        return false;
    }
  }

  getTemplate(templateId: string): ContentTemplate | undefined {
    return this.templates.get(templateId);
  }

  getAllTemplates(): ContentTemplate[] {
    return Array.from(this.templates.values());
  }
}

export const templateEngine = new TemplateEngine();
