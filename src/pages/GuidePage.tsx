import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getGuidePage } from '../data/guidePages';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, BookOpen, AlertTriangle, MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

const GuidePage: React.FC = () => {
  const { guideSlug } = useParams<{ guideSlug: string }>();

  if (!guideSlug) {
    return <Navigate to="/404" replace />;
  }

  const guide = getGuidePage(guideSlug);

  if (!guide) {
    return <Navigate to="/404" replace />;
  }

  const handleGetStarted = () => {
    window.location.href = '/checkout';
  };

  const getDifficultyColor = (difficulty: 'low' | 'medium' | 'high') => {
    switch (difficulty) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>{guide.seoData.title}</title>
        <meta name="description" content={guide.seoData.description} />
        <meta name="keywords" content={guide.seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://heritagebox.com/guides/${guideSlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={guide.seoData.title} />
        <meta property="og:description" content={guide.seoData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://heritagebox.com/guides/${guideSlug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.seoData.title} />
        <meta name="twitter:description" content={guide.seoData.description} />
        
        {/* HowTo Schema */}
        <script type="application/ld+json">
          {JSON.stringify(guide.seoData.schema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Complete Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {guide.content.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {guide.content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Skip the DIY - Get Professional Service
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Get Expert Advice
                </Button>
              </div>
            </div>

            {/* Guide Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {guide.locationName}
                  </div>
                  <div className="text-sm text-gray-600">Location Focus</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(guide.businessData.difficulty)}`}>
                    {guide.businessData.difficulty.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">Difficulty Level</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    2-3 weeks
                  </div>
                  <div className="text-sm text-gray-600">Typical Timeline</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {guide.content.introduction}
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Step-by-Step Process
              </h2>
              <p className="text-lg text-gray-600">
                Follow these detailed steps for successful {guide.serviceName.toLowerCase()}
              </p>
            </div>

            <div className="space-y-8">
              {guide.content.steps.map((step, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.stepNumber}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pro Tips for Success
              </h2>
              <p className="text-lg text-gray-600">
                Expert advice to get the best results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guide.content.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 bg-red-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Mistakes to Avoid
              </h2>
              <p className="text-lg text-gray-600">
                Learn from others' experiences and avoid these pitfalls
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guide.content.commonMistakes.map((mistake, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-red-200">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Considerations */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {guide.locationName} Specific Considerations
              </h2>
              <p className="text-lg text-gray-600">
                Important factors for {guide.locationName} residents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guide.content.localConsiderations.map((consideration, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{consideration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {guide.content.conclusion}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Skip the Hassle - Let the Professionals Handle It
                </h3>
                <p className="text-gray-600 mb-6">
                  While this guide shows you how to do it yourself, HeritageBox offers professional {guide.serviceName.toLowerCase()} with guaranteed quality and security.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Get Professional Service
                  </Button>
                  <Button size="lg" variant="outline">
                    Compare DIY vs Professional
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Professional {guide.serviceName} in {guide.locationName}
            </h2>
            <p className="text-xl mb-8">
              Save time and ensure quality with HeritageBox's professional service
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
            <p className="text-sm mt-6 opacity-90">
              Professional quality • Secure handling • Satisfaction guaranteed
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default GuidePage;
