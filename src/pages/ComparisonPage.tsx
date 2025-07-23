import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getComparisonPage } from '../data/comparisonPages';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, X, Star, Shield, Trophy, Users, Clock, Phone } from 'lucide-react';

const ComparisonPage: React.FC = () => {
  const { comparisonSlug } = useParams<{ comparisonSlug: string }>();

  if (!comparisonSlug) {
    return <Navigate to="/404" replace />;
  }

  const comparison = getComparisonPage(comparisonSlug);

  if (!comparison) {
    return <Navigate to="/404" replace />;
  }

  const handleGetStarted = () => {
    window.location.href = '/checkout';
  };

  const getAdvantageIcon = (advantage: 'heritageBox' | 'competitor' | 'tie') => {
    switch (advantage) {
      case 'heritageBox':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'competitor':
        return <X className="w-5 h-5 text-red-500" />;
      case 'tie':
        return <div className="w-5 h-5 bg-yellow-400 rounded-full" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{comparison.seoData.title}</title>
        <meta name="description" content={comparison.seoData.description} />
        <meta name="keywords" content={comparison.seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://heritagebox.com/compare/${comparisonSlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={comparison.seoData.title} />
        <meta property="og:description" content={comparison.seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://heritagebox.com/compare/${comparisonSlug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={comparison.seoData.title} />
        <meta name="twitter:description" content={comparison.seoData.description} />
        
        {/* Comparison Schema */}
        <script type="application/ld+json">
          {JSON.stringify(comparison.seoData.schema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Trophy className="w-4 h-4 mr-2" />
                Service Comparison
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {comparison.content.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {comparison.content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Choose HeritageBox
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Questions
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {comparison.businessData.winProbability}/10
                  </div>
                  <div className="text-sm text-gray-600">Win Probability</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {comparison.businessData.competitorStrength.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">Competitor Strength</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {comparison.businessData.marketShare}%
                  </div>
                  <div className="text-sm text-gray-600">Market Share</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Feature-by-Feature Comparison
              </h2>
              <p className="text-lg text-gray-600">
                See how HeritageBox compares to {comparison.competitor}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-blue-600 uppercase tracking-wider">
                      HeritageBox
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {comparison.competitor}
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Winner
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparison.content.comparisonTable.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {row.heritageBox}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">
                        {row.competitor}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getAdvantageIcon(row.advantage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HeritageBox Advantages */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose HeritageBox Over {comparison.competitor}?
              </h2>
              <p className="text-lg text-gray-600">
                Here's what makes HeritageBox the better choice
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comparison.content.advantages.map((advantage, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Customers Say About the Difference
              </h2>
              <p className="text-lg text-gray-600">
                Real experiences from customers who switched to HeritageBox
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {comparison.content.testimonials.map((testimonial, index) => (
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

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about choosing between HeritageBox and {comparison.competitor}
              </p>
            </div>

            <div className="space-y-6">
              {comparison.content.faq.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience the HeritageBox Difference?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied customers who chose HeritageBox over {comparison.competitor}
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
              30-day satisfaction guarantee • Free shipping both ways • Professional quality assured
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ComparisonPage;
