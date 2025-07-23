import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PackageComparison from '@/components/PackageComparison';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import SEOHelmet from '@/components/SEOHelmet';
import { getServiceBySlug, getRelatedServices, formatSlug } from '@/data/serviceFormats';
import { templateEngine } from '@/utils/templateEngine';
import { Check, Star, Shield, Award } from 'lucide-react';

const ServicePage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  const serviceData = useMemo(() => {
    if (!serviceSlug) return null;
    return getServiceBySlug(serviceSlug);
  }, [serviceSlug]);

  const relatedServices = useMemo(() => {
    if (!serviceData) return [];
    return getRelatedServices(serviceData.id, 3);
  }, [serviceData]);

  const seoData = useMemo(() => {
    if (!serviceData) return null;
    return templateEngine.processSEOTemplate('service-page', {
      ...serviceData,
      ...serviceData.seoData,
      ...serviceData.technicalSpecs,
      ...serviceData.pricing
    });
  }, [serviceData]);

  if (!serviceData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen">
      {seoData && (
        <SEOHelmet
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords.join(', ')}
          canonical={`https://heritagebox.com/services/${serviceSlug}`}
          schema={seoData.schema}
        />
      )}
      
      <NavBar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-cream via-cream to-cream/80 relative overflow-hidden">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm rounded-full px-4 py-2 border border-secondary/20 mb-6">
                <Award className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Professional {serviceData.formatType} Service</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary mb-6">
                Professional {serviceData.displayName}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                {serviceData.longDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href="/package-selected?package=Popular" 
                  className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                </a>
                <a 
                  href="/#how-it-works" 
                  className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-200"
                >
                  See How It Works
                </a>
              </div>

              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Secure & Insured</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                  <span className="ml-2 font-semibold text-gray-900">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-secondary/30 to-rose/20 rounded-full filter blur-3xl animate-pulse overflow-hidden"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 md:w-80 md:h-80 bg-gradient-to-tr from-primary/20 to-secondary/30 rounded-full filter blur-3xl overflow-hidden"></div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto container-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Why Choose Our {serviceData.displayName}?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {serviceData.benefits.map((benefit, index) => (
                <div key={index} className="feature-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                  <div className="flex items-start gap-3 mb-3">
                    <Check className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                    <h3 className="text-xl font-semibold text-gray-900">{benefit}</h3>
                  </div>
                  <p className="text-gray-600">
                    Professional {serviceData.formatType} conversion with guaranteed quality and secure handling.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto container-padding">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
                Technical Specifications
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="spec-card bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Output Quality</h3>
                  <p className="text-2xl text-primary font-bold mb-2">{serviceData.technicalSpecs.resolution}</p>
                  <p className="text-gray-600">Professional-grade resolution ensuring maximum detail preservation for your {serviceData.formatType} memories.</p>
                </div>
                
                <div className="spec-card bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Processing Time</h3>
                  <p className="text-2xl text-primary font-bold mb-2">{serviceData.technicalSpecs.processingTime}</p>
                  <p className="text-gray-600">Careful processing timeline ensures the highest quality results for your precious memories.</p>
                </div>
                
                <div className="spec-card bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Professional Equipment</h3>
                  <ul className="text-gray-700 space-y-2">
                    {serviceData.technicalSpecs.equipment.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="spec-card bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Output Formats</h3>
                  <ul className="text-gray-700 space-y-2">
                    {serviceData.technicalSpecs.outputFormats.map((format, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                        {format}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Availability */}
        <section className="py-16 bg-white">
          <div className="container mx-auto container-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              {serviceData.displayName} Package Availability
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">Package Conversion Rate</h3>
                <p className="text-blue-800">
                  1 {serviceData.formatType} = {serviceData.pricing.conversionRate} photos in your package allowance.
                  {serviceData.pricing.conversionRate > 25 && (
                    <span className="block mt-1">
                      This format requires more processing time and counts as {serviceData.pricing.conversionRate} photos.
                    </span>
                  )}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceData.pricing.starterIncluded && (
                  <div className="package-card border-2 border-primary rounded-lg p-6 bg-primary/5">
                    <h4 className="text-lg font-semibold text-primary mb-2">Starter Package</h4>
                    <p className="text-gray-600">✓ {serviceData.displayName} included</p>
                    <p className="text-sm text-gray-500 mt-2">$69 - Perfect for small collections</p>
                  </div>
                )}
                
                {serviceData.pricing.popularIncluded && (
                  <div className="package-card border-2 border-secondary rounded-lg p-6 bg-secondary/5 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>
                    </div>
                    <h4 className="text-lg font-semibold text-secondary mb-2 mt-2">Popular Package</h4>
                    <p className="text-gray-600">✓ {serviceData.displayName} included</p>
                    <p className="text-sm text-gray-500 mt-2">$179 - Great for growing families</p>
                  </div>
                )}
                
                {serviceData.pricing.dustyRoseIncluded && (
                  <div className="package-card border-2 border-rose-500 rounded-lg p-6 bg-rose-50">
                    <h4 className="text-lg font-semibold text-rose-500 mb-2">Dusty Rose Package</h4>
                    <p className="text-gray-600">✓ {serviceData.displayName} included</p>
                    <p className="text-sm text-gray-500 mt-2">$349 - For larger collections</p>
                  </div>
                )}
                
                {serviceData.pricing.eternalIncluded && (
                  <div className="package-card border-2 border-blue-400 rounded-lg p-6 bg-blue-50">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Eternal Package</h4>
                    <p className="text-gray-600">✓ {serviceData.displayName} included</p>
                    <p className="text-sm text-gray-500 mt-2">$599 - Lifetime of memories</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues We Handle */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto container-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Common {serviceData.formatType} Issues We Handle
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {serviceData.commonIssues.map((issue, index) => (
                <div key={index} className="issue-card bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{issue}</h3>
                  <p className="text-gray-600">
                    Our professional equipment and expertise can handle {issue.toLowerCase()} issues that commonly affect {serviceData.formatType} media, ensuring the best possible results.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto container-padding">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
                Related Services
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedServices.map((service) => (
                  <div key={service.id} className="related-service-card bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.displayName}</h3>
                    <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                    <a 
                      href={`/services/${formatSlug(service.formatType)}`}
                      className="text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Package Comparison */}
        <PackageComparison />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto container-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Preserve Your {serviceData.formatType} Memories?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Don't let your precious {serviceData.formatType} memories fade away. Start your digitization project today with our professional {serviceData.displayName.toLowerCase()}.
            </p>
            <a 
              href="/package-selected?package=Popular" 
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Choose Your Package
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;
