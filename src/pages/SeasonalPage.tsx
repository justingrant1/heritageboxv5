import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSeasonalContentBySlug, SeasonalContent } from '../data/seasonalContent';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Clock, MapPin, Gift, Star, CheckCircle } from 'lucide-react';

const SeasonalPage: React.FC = () => {
  const { seasonalSlug } = useParams<{ seasonalSlug: string }>();
  
  if (!seasonalSlug) {
    return <div>Seasonal content not found</div>;
  }

  const seasonalContent = getSeasonalContentBySlug(seasonalSlug);
  
  if (!seasonalContent) {
    return <div>Seasonal content not found</div>;
  }

  const {
    seoData,
    content,
    businessData,
    timing,
    season,
    holiday,
    serviceName,
    locationName
  } = seasonalContent;

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'bg-green-100 text-green-800';
      case 'summer': return 'bg-yellow-100 text-yellow-800';
      case 'fall': return 'bg-orange-100 text-orange-800';
      case 'winter': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (multiplier: number) => {
    if (multiplier >= 5) return 'text-red-600';
    if (multiplier >= 3) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://heritagebox.com/seasonal/${seasonalSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify(seoData.schema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  {/* Seasonal Badge */}
                  <div className="flex items-center gap-2 mb-4 sm:justify-center lg:justify-start">
                    <Badge className={getSeasonColor(season)}>
                      {season.charAt(0).toUpperCase() + season.slice(1)} Special
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Serving {locationName}
                    </Badge>
                  </div>

                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">{content.heroTitle}</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    {content.heroSubtitle}
                  </p>

                  {/* Urgency Message */}
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-red-600 mr-2" />
                      <p className={`font-semibold ${getUrgencyColor(businessData.seasonalMultiplier)}`}>
                        {content.urgencyMessage}
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-8 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Button size="lg" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                        Get Started Today
                      </Button>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Button variant="outline" size="lg" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                        Call 1-800-HERITAGE
                      </Button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="h-56 w-full bg-gradient-to-r from-blue-500 to-purple-600 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8 text-white text-center">
                <div>
                  <div className="text-3xl font-bold">{businessData.peakSearchVolume.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Peak Monthly Searches</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{businessData.seasonalMultiplier}x</div>
                  <div className="text-sm opacity-90">Seasonal Demand</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{businessData.conversionPotential}/10</div>
                  <div className="text-sm opacity-90">Conversion Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{holiday}</div>
                  <div className="text-sm opacity-90">Perfect For</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal Benefits Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                {holiday} Special Benefits
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose HeritageBox for {holiday}?
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {content.seasonalBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-lg leading-6 font-medium text-gray-900">
                        {benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gift Ideas Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Perfect {holiday} Gifts
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Meaningful Memory Gifts
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.giftIdeas.map((idea, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-lg">Gift Idea #{index + 1}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{idea}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Local Considerations */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                {locationName} Advantage
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Local Expertise & Fast Service
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {content.localConsiderations.map((consideration, index) => (
                <div key={index} className="flex items-start p-6 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-lg leading-6 text-gray-900">
                      {consideration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Customer Stories
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {holiday} Success Stories
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {content.testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial}"</p>
                    <div className="mt-4 text-sm text-gray-500">
                      - Verified {locationName} Customer
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to Create Perfect {holiday} Gifts?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              Don't wait - {content.urgencyMessage.toLowerCase()}
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Your Order
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeasonalPage;
