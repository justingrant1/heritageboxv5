import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getServiceCombination } from '../data/serviceCombinations';
import { getLocationByState } from '../data/locationData';
import { serviceFormats, formatSlug } from '../data/serviceFormats';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, Star, Shield, Clock, MapPin, Phone } from 'lucide-react';

const ServiceCombinationPage: React.FC = () => {
  const { serviceSlug, locationSlug } = useParams<{ serviceSlug: string; locationSlug: string }>();

  if (!serviceSlug || !locationSlug) {
    return <Navigate to="/404" replace />;
  }

  const combination = getServiceCombination(serviceSlug, locationSlug);
  const locationData = getLocationByState(locationSlug.replace(/-/g, ' '));
  const serviceData = serviceFormats.find(s => formatSlug(s.formatType) === serviceSlug);

  if (!combination || !locationData || !serviceData) {
    return <Navigate to="/404" replace />;
  }

  const handleGetStarted = () => {
    window.location.href = '/checkout';
  };

  return (
    <>
      <Helmet>
        <title>{combination.seoData.title}</title>
        <meta name="description" content={combination.seoData.description} />
        <meta name="keywords" content={combination.seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://heritagebox.com/services/${serviceSlug}/${locationSlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={combination.seoData.title} />
        <meta property="og:description" content={combination.seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://heritagebox.com/services/${serviceSlug}/${locationSlug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={combination.seoData.title} />
        <meta name="twitter:description" content={combination.seoData.description} />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "HeritageBox",
            "description": combination.seoData.description,
            "url": `https://heritagebox.com/services/${serviceSlug}/${locationSlug}`,
            "areaServed": {
              "@type": "State",
              "name": locationData.state
            },
            "serviceType": combination.serviceName,
            "priceRange": "$$$",
            "telephone": "+1-800-HERITAGE",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": locationData.stateCode,
              "addressCountry": "US"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                Serving {locationData.state}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {combination.content.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {combination.content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Get Started Today
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 1-800-HERITAGE
                </Button>
              </div>
            </div>

            {/* Service Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {serviceData.technicalSpecs.resolution}
                  </div>
                  <div className="text-sm text-gray-600">Resolution</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {locationData.shippingInfo.averageTransitTime}
                  </div>
                  <div className="text-sm text-gray-600">Shipping Time</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {serviceData.technicalSpecs.processingTime}
                  </div>
                  <div className="text-sm text-gray-600">Processing</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {locationData.majorCities.length}+
                  </div>
                  <div className="text-sm text-gray-600">Cities Served</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Local Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose HeritageBox in {locationData.state}?
              </h2>
              <p className="text-lg text-gray-600">
                We understand the unique needs of {locationData.state} families
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combination.content.localBenefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                    <p className="text-gray-700">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional {combination.serviceName} Service
              </h2>
              <p className="text-lg text-gray-600">
                Industry-leading quality and service standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {combination.content.competitiveAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        {combination.content.localTestimonials && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What {locationData.state} Families Say
                </h2>
                <p className="text-lg text-gray-600">
                  Real reviews from satisfied customers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {combination.content.localTestimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">"{testimonial}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Service Details */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {combination.serviceName} Technical Specifications
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Resolution:</span>
                    <span>{serviceData.technicalSpecs.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Equipment:</span>
                    <span>{serviceData.technicalSpecs.equipment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Processing Time:</span>
                    <span>{serviceData.technicalSpecs.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Output Formats:</span>
                    <span>{serviceData.technicalSpecs.outputFormats.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {locationData.state} Service Area
                </h2>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium">Major Cities Served:</span>
                    <p className="text-gray-600 mt-1">
                      {locationData.majorCities.join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Shipping Time:</span>
                    <p className="text-gray-600 mt-1">
                      {locationData.shippingInfo.averageTransitTime}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Local Pickup:</span>
                    <p className="text-gray-600 mt-1">
                      {locationData.shippingInfo.pickupAvailable ? 'Available in select cities' : 'Mail-in service only'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Rush Service:</span>
                    <p className="text-gray-600 mt-1">
                      {locationData.shippingInfo.rushAvailable ? 'Available' : 'Standard processing only'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Preserve Your {serviceData.formatType} Memories?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of {locationData.state} families who trust HeritageBox with their precious memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={handleGetStarted}>
                <Clock className="w-4 h-4 mr-2" />
                Start Your Order
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Get Free Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceCombinationPage;
