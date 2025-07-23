import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCityById, formatCitySlug } from '../data/cityData';
import { serviceFormats } from '../data/serviceFormats';
import SEOHelmet from '../components/SEOHelmet';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MapPin, Clock, Truck, Shield, Star, Users, TrendingUp } from 'lucide-react';

export const CityPage: React.FC = () => {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug?: string }>();
  
  if (!citySlug) {
    return <Navigate to="/404" replace />;
  }

  const city = getCityById(citySlug);
  
  if (!city) {
    return <Navigate to="/404" replace />;
  }

  // If serviceSlug is provided, find the specific service
  const specificService = serviceSlug 
    ? serviceFormats.find(s => s.formatType.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === serviceSlug)
    : null;

  // If serviceSlug provided but service not found, redirect to 404
  if (serviceSlug && !specificService) {
    return <Navigate to="/404" replace />;
  }

  const topServices = specificService ? [specificService] : serviceFormats.slice(0, 5);
  const isServiceSpecific = !!specificService;

  const seoData = {
    title: isServiceSpecific 
      ? `${specificService!.displayName} in ${city.displayName} | HeritageBox`
      : `${city.displayName} Digitization Services | HeritageBox`,
    description: isServiceSpecific
      ? `Professional ${specificService!.displayName.toLowerCase()} in ${city.displayName}. ${specificService!.shortDescription} Fast ${city.shippingInfo.averageTransitTime} shipping to ${city.city}.`
      : `Professional digitization services in ${city.displayName}. VHS conversion, photo scanning, and media preservation for ${city.city} residents. ${city.shippingInfo.averageTransitTime} shipping.`,
    keywords: isServiceSpecific
      ? [
          ...city.seoData.keywords,
          `${specificService!.formatType.toLowerCase()} ${city.city.toLowerCase()}`,
          `${specificService!.displayName.toLowerCase()} ${city.city.toLowerCase()}`,
          `${specificService!.formatType.toLowerCase()} conversion ${city.city.toLowerCase()}`
        ]
      : city.seoData.keywords,
    canonicalUrl: isServiceSpecific
      ? `https://heritagebox.com/cities/${citySlug}/${serviceSlug}`
      : `https://heritagebox.com/cities/${citySlug}`,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `HeritageBox - ${city.displayName}`,
      "description": `Professional digitization services serving ${city.displayName}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.city,
        "addressRegion": city.stateCode,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressLocality": city.city,
        "addressRegion": city.state
      },
      "url": `https://heritagebox.com/cities/${citySlug}`,
      "telephone": "1-800-HERITAGE",
      "priceRange": "$$",
      "serviceArea": {
        "@type": "City",
        "name": city.city
      }
    }
  };

  return (
    <>
      <SEOHelmet 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords.join(', ')}
        canonical={seoData.canonicalUrl}
        schema={[seoData.schema]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                Local Service
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Professional Digitization Services in{' '}
                <span className="text-blue-600">{city.city}</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your precious memories with HeritageBox's professional digitization services. 
                Trusted by families across {city.displayName} for quality, security, and convenience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Started Today
                </Button>
                <Button size="lg" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Get Free Quote
                </Button>
              </div>
            </div>

            {/* City Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {(city.population / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-sm text-gray-600">Residents Served</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {city.shippingInfo.averageTransitTime}
                  </div>
                  <div className="text-sm text-gray-600">Shipping Time</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Insured & Secure</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">{city.city} Reviews</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Services in {city.city}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional digitization services tailored for {city.displayName} residents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">
                          {service.formatType.charAt(0)}
                        </span>
                      </div>
                      {service.displayName}
                    </CardTitle>
                    <CardDescription>
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Conversion Rate:</span>
                        <span className="font-semibold">{service.pricing.conversionRate}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Quality:</span>
                        <span className="font-semibold">{service.technicalSpecs.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Processing:</span>
                        <span className="font-semibold">{service.technicalSpecs.processingTime}</span>
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        variant="outline"
                        onClick={() => window.location.href = `/${formatCitySlug(service.formatType)}/${citySlug}`}
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Local Benefits Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why {city.city} Families Choose HeritageBox
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Fast {city.shippingInfo.averageTransitTime} Shipping</h3>
                      <p className="text-gray-600">Quick turnaround times specifically for {city.displayName} residents</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Local Market Understanding</h3>
                      <p className="text-gray-600">{city.marketInsights.targetDemographic}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {city.shippingInfo.pickupAvailable ? 'Local Pickup Available' : 'Convenient Mail-In Service'}
                      </h3>
                      <p className="text-gray-600">
                        {city.shippingInfo.pickupAvailable 
                          ? `Pickup service available in select ${city.city} areas`
                          : `Secure mail-in service with prepaid shipping labels`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {city.shippingInfo.rushAvailable ? 'Rush Processing Available' : 'Standard Processing Timeline'}
                      </h3>
                      <p className="text-gray-600">
                        {city.shippingInfo.rushAvailable 
                          ? `Expedited service for urgent needs in ${city.city}`
                          : `Reliable standard processing with quality guarantee`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {city.city} Market Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Population:</span>
                    <span className="font-semibold">{(city.population / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Metro Area:</span>
                    <span className="font-semibold">{(city.metroPopulation / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Digital Adoption:</span>
                    <Badge variant={city.marketInsights.digitalAdoption === 'high' ? 'default' : 'secondary'}>
                      {city.marketInsights.digitalAdoption.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Market Size:</span>
                    <Badge variant={city.marketInsights.marketSize === 'large' ? 'default' : 'secondary'}>
                      {city.marketInsights.marketSize.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Potential:</span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="font-semibold">{city.businessData.conversionPotential}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Trends Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {city.city} Seasonal Trends
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Understanding local patterns helps us serve you better
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {city.businessData.seasonalTrends.map((trend, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{trend}</h3>
                    <p className="text-sm text-gray-600">
                      Peak demand period for {city.city} residents
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Preserve Your {city.city} Memories?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers in {city.displayName} who trust HeritageBox 
              with their precious memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Call for Questions
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
