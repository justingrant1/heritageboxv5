import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PackageComparison from '@/components/PackageComparison';
import Testimonials from '@/components/Testimonials';
import SEOHelmet from '@/components/SEOHelmet';
import { getLocationByState, getCityData, formatLocationSlug, generateLocationKeywords } from '@/data/locationData';
import { templateEngine } from '@/utils/templateEngine';
import { MapPin, Truck, Clock, Shield, Star, Award } from 'lucide-react';

const LocationPage: React.FC = () => {
  const { state, city } = useParams<{ state: string; city?: string }>();
  
  const locationData = useMemo(() => {
    if (!state) return null;
    
    if (city) {
      return getCityData(state, city);
    } else {
      const stateData = getLocationByState(state);
      return stateData ? { state: stateData, city: null } : null;
    }
  }, [state, city]);

  const seoData = useMemo(() => {
    if (!locationData) return null;
    
    const data = {
      ...locationData.state,
      ...locationData.state.shippingInfo,
      displayName: city ? `${locationData.city}, ${locationData.state.state}` : locationData.state.state,
      keywords: generateLocationKeywords(locationData.state)
    };
    
    return templateEngine.processSEOTemplate('location-page', data);
  }, [locationData, city]);

  if (!locationData) {
    return <Navigate to="/404" replace />;
  }

  const { state: stateData, city: cityName } = locationData;
  const displayName = cityName ? `${cityName}, ${stateData.state}` : stateData.state;
  const urlPath = cityName ? `${formatLocationSlug(stateData.state)}/${formatLocationSlug(cityName)}` : formatLocationSlug(stateData.state);

  return (
    <div className="min-h-screen">
      {seoData && (
        <SEOHelmet
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords.join(', ')}
          canonical={`https://heritagebox.com/locations/${urlPath}`}
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
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Serving {displayName}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary mb-6">
                Professional Memory Digitization Services in {displayName}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                HeritageBox provides secure, professional digitization services to families and businesses throughout {stateData.state}. Ship your precious memories to us with confidence.
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

        {/* Services Available */}
        <section className="py-16 bg-white">
          <div className="container mx-auto container-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Digitization Services Available in {stateData.state}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">VHS to Digital</h3>
                <p className="text-gray-600">Convert your VHS tapes to digital format with professional quality equipment and secure handling.</p>
              </div>
              
              <div className="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Photo Scanning</h3>
                <p className="text-gray-600">High-resolution scanning of your precious family photographs with color restoration and dust removal.</p>
              </div>
              
              <div className="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Film Transfer</h3>
                <p className="text-gray-600">Professional 8mm and Super 8 film to digital conversion with frame-by-frame scanning.</p>
              </div>
              
              <div className="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Slide Digitization</h3>
                <p className="text-gray-600">Convert 35mm slides to high-resolution digital images with professional color correction.</p>
              </div>
              
              <div className="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Camcorder Tapes</h3>
                <p className="text-gray-600">Hi8, Digital8, and MiniDV tape conversion services with professional equipment.</p>
              </div>
              
              <div className="service-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Audio Digitization</h3>
                <p className="text-gray-600">Convert cassette tapes and other audio formats to digital with noise reduction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto container-padding">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
                Shipping to {stateData.state}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="shipping-card bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">Transit Time</h3>
                  </div>
                  <p className="text-2xl text-primary font-bold mb-2">{stateData.shippingInfo.averageTransitTime}</p>
                  <p className="text-gray-600">Average shipping time from {stateData.state} to our secure processing facility.</p>
                </div>
                
                <div className="shipping-card bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-semibold text-gray-900">Shipping Options</h3>
                  </div>
                  <ul className="text-gray-700 space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                      Free prepaid shipping label included
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                      Secure packaging materials provided
                    </li>
                    {stateData.shippingInfo.pickupAvailable && (
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                        Local pickup service available
                      </li>
                    )}
                    {stateData.shippingInfo.rushAvailable && (
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                        Rush processing option available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="py-16 bg-white">
          <div className="container mx-auto container-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
                Why {stateData.state} Families Choose HeritageBox
              </h2>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                We understand the unique needs of {stateData.marketInsights.targetDemographic.toLowerCase()} in {stateData.state}. 
                Our professional digitization services are trusted by thousands of families across the state.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="stat-card p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stateData.population.toLocaleString()}</div>
                  <div className="text-gray-600">Residents served in {stateData.state}</div>
                </div>
                <div className="stat-card p-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stateData.shippingInfo.averageTransitTime}</div>
                  <div className="text-gray-600">Average shipping time</div>
                </div>
                <div className="stat-card p-6">
                  <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-gray-600">Customer satisfaction rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Cities Served */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto container-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Serving Major Cities in {stateData.state}
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stateData.majorCities.map((cityName, index) => (
                  <div key={index} className="city-card p-6 rounded-lg border border-gray-200 text-center bg-white hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cityName}</h3>
                    <p className="text-gray-600 text-sm">Professional digitization services available</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
                  <p className="text-blue-800 font-medium">
                    Don't see your city? We serve all of {stateData.state} with our secure mail-in digitization service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto container-padding">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              What {stateData.state} Customers Say
            </h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="testimonial-card bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "HeritageBox made it so easy to digitize our family's VHS collection. The shipping to {stateData.state} was fast and secure, and the quality exceeded our expectations."
                </p>
                <div className="font-semibold text-gray-900">Sarah M.</div>
                <div className="text-sm text-gray-600">{stateData.majorCities[0]}, {stateData.stateCode}</div>
              </div>
              
              <div className="testimonial-card bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Professional service from start to finish. They handled our old 8mm films with such care, and now we can share these memories with our grandchildren."
                </p>
                <div className="font-semibold text-gray-900">Robert K.</div>
                <div className="text-sm text-gray-600">{stateData.majorCities[1] || stateData.majorCities[0]}, {stateData.stateCode}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Comparison */}
        <PackageComparison />

        {/* CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto container-padding text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Preserve Your Memories in {stateData.state}?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of {stateData.state} families who trust HeritageBox with their precious memories. 
              Start your digitization project today with free shipping throughout {stateData.state}.
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

export default LocationPage;
