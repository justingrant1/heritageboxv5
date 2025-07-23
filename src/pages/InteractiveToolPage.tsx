import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getInteractiveToolBySlug, InteractiveTool, ToolInput } from '../data/interactiveTools';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, Clock, DollarSign, CheckCircle, Star, TrendingUp } from 'lucide-react';

const InteractiveToolPage: React.FC = () => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [results, setResults] = useState<{ [key: string]: any }>({});
  const [showResults, setShowResults] = useState(false);
  
  if (!toolSlug) {
    return <div>Tool not found</div>;
  }

  const tool = getInteractiveToolBySlug(toolSlug);
  
  if (!tool) {
    return <div>Tool not found</div>;
  }

  const {
    seoData,
    content,
    toolConfig,
    businessData,
    type
  } = tool;

  // Initialize form data with default values
  useEffect(() => {
    const initialData: { [key: string]: any } = {};
    toolConfig.inputs.forEach(input => {
      if (input.defaultValue !== undefined) {
        initialData[input.id] = input.defaultValue;
      }
    });
    setFormData(initialData);
  }, [toolConfig.inputs]);

  const handleInputChange = (inputId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  const calculateResults = () => {
    const calculatedResults: { [key: string]: any } = {};
    
    // Simple calculation logic - in a real app, this would be more sophisticated
    toolConfig.calculations.forEach(calc => {
      let result = 0;
      
      // Basic formula evaluation (simplified)
      if (calc.id === 'base_cost') {
        result = (formData.photos || 0) * 0.35 + 
                (formData.vhs_tapes || 0) * 25 + 
                (formData.film_reels || 0) * 18 + 
                (formData.hi8_tapes || 0) * 20 + 
                (formData.minidv_tapes || 0) * 20;
        
        if (formData.rush_service) result *= 1.5;
        if (formData.photo_restoration) result *= 2.0;
      } else if (calc.id === 'delivery_cost') {
        if (formData.delivery_format === 'All Formats') result = 15;
        else if (formData.delivery_format === 'DVD') result = 5;
        else result = 0;
      } else if (calc.id === 'total_items') {
        result = (formData.photos || 0) + (formData.vhs_tapes || 0) + 
                (formData.film_reels || 0) + (formData.hi8_tapes || 0) + 
                (formData.minidv_tapes || 0);
      } else if (calc.id === 'estimated_days') {
        result = formData.rush_service ? 10 : 18;
      } else if (calc.id === 'total_photos') {
        result = (formData.loose_photos || 0) + 
                (formData.photo_albums || 0) * 75 + 
                (formData.slides || 0);
      } else if (calc.id === 'base_days') {
        const totalPhotos = calculatedResults.total_photos || 0;
        result = Math.ceil(totalPhotos / 200) + 5;
        if (formData.photo_restoration) result *= 1.4;
        if (formData.rush_processing) result *= 0.5;
        if (formData.season === 'October-December') result *= 1.3;
      } else if (calc.id === 'total_categories') {
        result = Object.values(formData).filter(value => value === true).length;
      } else if (calc.id === 'preservation_score') {
        result = calculatedResults.total_categories * 10;
      }
      
      calculatedResults[calc.id] = Math.round(result);
    });

    // Calculate final results
    const finalResults: { [key: string]: any } = {};
    
    toolConfig.results.forEach(resultConfig => {
      let value = 0;
      
      if (resultConfig.id === 'total_cost') {
        value = (calculatedResults.base_cost || 0) + (calculatedResults.delivery_cost || 0);
      } else if (resultConfig.id === 'timeline') {
        value = calculatedResults.estimated_days || calculatedResults.base_days || 0;
      } else if (resultConfig.id === 'estimated_timeline') {
        value = calculatedResults.base_days || 0;
      } else if (resultConfig.id === 'completeness_score') {
        value = Math.min(calculatedResults.preservation_score || 0, 100);
      } else if (resultConfig.id === 'recommendation') {
        // Simple recommendation logic
        const tapeCount = formData.tape_count || '';
        const condition = formData.tape_condition || '';
        const timeline = formData.timeline || '';
        
        let score = 5; // default
        if (tapeCount.includes('50+')) score += 2;
        if (condition.includes('Poor')) score += 2;
        if (timeline.includes('ASAP')) score += 2;
        if (formData.quality_priority?.includes('Highest')) score += 1;
        
        value = Math.min(score, 10);
      }
      
      finalResults[resultConfig.id] = value;
    });

    setResults(finalResults);
    setShowResults(true);
  };

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'calculator': return Calculator;
      case 'estimator': return Clock;
      case 'quiz': return Star;
      case 'checklist': return CheckCircle;
      default: return Calculator;
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderInput = (input: ToolInput) => {
    switch (input.type) {
      case 'number':
        return (
          <Input
            type="number"
            min={input.min}
            max={input.max}
            step={input.step}
            value={formData[input.id] || input.defaultValue || ''}
            onChange={(e) => handleInputChange(input.id, parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={input.id}
              checked={formData[input.id] || false}
              onCheckedChange={(checked) => handleInputChange(input.id, checked)}
            />
            <Label htmlFor={input.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Yes
            </Label>
          </div>
        );
      
      case 'select':
        return (
          <Select value={formData[input.id] || input.defaultValue} onValueChange={(value) => handleInputChange(input.id, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {input.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {input.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${input.id}-${option}`}
                  name={input.id}
                  value={option}
                  checked={formData[input.id] === option}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor={`${input.id}-${option}`} className="text-sm font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <Input
            value={formData[input.id] || ''}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
          />
        );
    }
  };

  const IconComponent = getToolIcon(type);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <link rel="canonical" href={`https://heritagebox.com/tools/${toolSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify(seoData.schema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Tool Type Badge */}
              <div className="flex justify-center items-center gap-2 mb-4">
                <Badge className="flex items-center gap-1">
                  <IconComponent className="w-3 h-3" />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
                <Badge variant="outline" className={getCompetitionColor(businessData.competition)}>
                  {businessData.competition.toUpperCase()} Competition
                </Badge>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                {content.heroTitle}
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {content.heroSubtitle}
              </p>

              {/* Tool Stats */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{businessData.searchVolume}</div>
                  <div className="text-sm text-gray-600">Monthly Searches</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{businessData.conversionPotential}/10</div>
                  <div className="text-sm text-gray-600">Conversion Score</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{businessData.engagementScore}/10</div>
                  <div className="text-sm text-gray-600">Engagement Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-8">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                How It Works
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Simple 4-Step Process
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.instructions.map((instruction, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <p className="text-lg font-medium text-gray-900">{instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tool Interface */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    Enter Your Information
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to get your personalized results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {toolConfig.inputs.map((input) => (
                    <div key={input.id} className="space-y-2">
                      <Label htmlFor={input.id} className="text-sm font-medium">
                        {input.label}
                        {input.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {renderInput(input)}
                      {input.helpText && (
                        <p className="text-xs text-gray-500">{input.helpText}</p>
                      )}
                    </div>
                  ))}
                  
                  <Button onClick={calculateResults} className="w-full" size="lg">
                    Calculate Results
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Your Results
                  </CardTitle>
                  <CardDescription>
                    {showResults ? 'Here are your personalized results' : 'Results will appear here after calculation'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {showResults ? (
                    <div className="space-y-6">
                      {toolConfig.results.map((resultConfig) => {
                        const value = results[resultConfig.id];
                        const formattedValue = resultConfig.format.replace('{{value}}', value?.toString() || '0');
                        
                        // Find appropriate range
                        const range = resultConfig.ranges?.find(r => value >= r.min && value <= r.max);
                        
                        return (
                          <div key={resultConfig.id} className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{resultConfig.label}</h3>
                              <div className="text-2xl font-bold text-blue-600">{formattedValue}</div>
                            </div>
                            {range && (
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">{range.message}</p>
                                <p className="text-sm font-medium text-gray-900">{range.recommendation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full" size="lg">
                          {content.ctaMessage}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <IconComponent className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Complete the form and click "Calculate Results" to see your personalized recommendations.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Tool Benefits */}
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Why Use This Tool?
                </h2>
                <div className="space-y-4">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Benefits */}
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
                  What You'll Get
                </h2>
                <div className="space-y-4">
                  {content.resultsBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-blue-600">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to Get Started?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              {content.ctaMessage}
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                Get Expert Help
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveToolPage;
