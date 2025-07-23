import { NavigateFunction } from 'react-router-dom';

// Navigation utility functions for consistent button behavior across programmatic pages

export const navigateToCheckout = (navigate: NavigateFunction) => {
  navigate('/checkout');
};

export const navigateToContact = (navigate: NavigateFunction) => {
  navigate('/contact');
};

export const navigateToAbout = (navigate: NavigateFunction) => {
  navigate('/about');
};

export const openPhoneCall = () => {
  window.open('tel:+1-800-HERITAGE', '_self');
};

export const openEmailContact = () => {
  window.open('mailto:info@heritagebox.com?subject=Service Inquiry', '_self');
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Quote request functionality
export const requestQuote = (serviceType?: string, location?: string) => {
  const subject = `Quote Request${serviceType ? ` - ${serviceType}` : ''}${location ? ` in ${location}` : ''}`;
  const body = `Hi HeritageBox,

I'm interested in getting a quote for your digitization services.

${serviceType ? `Service Type: ${serviceType}` : ''}
${location ? `Location: ${location}` : ''}

Please contact me with pricing information and next steps.

Thank you!`;

  window.open(`mailto:quotes@heritagebox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
};

// Consultation booking
export const bookConsultation = (serviceType?: string) => {
  const subject = `Consultation Request${serviceType ? ` - ${serviceType}` : ''}`;
  const body = `Hi HeritageBox,

I'd like to schedule a free consultation to discuss my digitization needs.

${serviceType ? `Service Interest: ${serviceType}` : ''}

Please let me know your availability.

Thank you!`;

  window.open(`mailto:consultations@heritagebox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
};

// Live chat functionality (placeholder for future implementation)
export const openLiveChat = () => {
  // For now, redirect to contact form
  // In the future, this could integrate with a live chat service
  alert('Live chat coming soon! Please use our contact form or call us directly.');
};

// Social sharing
export const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin', url: string, title: string) => {
  let shareUrl = '';
  
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};

// Download functionality
export const downloadResource = (resourceType: 'guide' | 'checklist' | 'pricing', title: string) => {
  // For now, this will trigger an email with the resource
  const subject = `Resource Download Request - ${title}`;
  const body = `Hi HeritageBox,

I'd like to download the ${resourceType}: "${title}"

Please send me the resource or a download link.

Thank you!`;

  window.open(`mailto:resources@heritagebox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
};

// Newsletter signup
export const subscribeToNewsletter = (email: string) => {
  // This would integrate with your email service
  // For now, we'll use a simple mailto
  const subject = 'Newsletter Subscription';
  const body = `Please add ${email} to your newsletter list.`;
  
  window.open(`mailto:newsletter@heritagebox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
};

// Service comparison
export const compareServices = (navigate: NavigateFunction, service1: string, service2: string, location?: string) => {
  const comparisonSlug = `${service1}-vs-${service2}${location ? `-${location}` : '-california'}`;
  navigate(`/compare/${comparisonSlug}`);
};

// Service guide navigation
export const viewServiceGuide = (navigate: NavigateFunction, service: string, location?: string) => {
  const guideSlug = `how-to-${service}${location ? `-${location}` : '-california'}`;
  navigate(`/guides/${guideSlug}`);
};

// Tool navigation
export const useTool = (navigate: NavigateFunction, toolType: string) => {
  let toolSlug = '';
  
  switch (toolType) {
    case 'cost':
      toolSlug = 'cost-calculator';
      break;
    case 'timeline':
      toolSlug = 'timeline-estimator';
      break;
    case 'photo':
      toolSlug = 'photo-scanning-calculator';
      break;
    case 'format':
      toolSlug = 'format-compatibility-checker';
      break;
    case 'quiz':
      toolSlug = 'preservation-priority-quiz';
      break;
    default:
      toolSlug = 'cost-calculator';
  }
  
  navigate(`/tools/${toolSlug}`);
};

// Emergency contact
export const emergencyContact = () => {
  const confirmed = window.confirm('This will call our emergency support line. Continue?');
  if (confirmed) {
    window.open('tel:+1-800-HERITAGE', '_self');
  }
};

// Feedback submission
export const submitFeedback = (pageType: string, pageSlug: string) => {
  const subject = `Feedback - ${pageType}: ${pageSlug}`;
  const body = `Hi HeritageBox,

I have feedback about your ${pageType} page: ${pageSlug}

Feedback:
[Please share your thoughts here]

Page URL: ${window.location.href}

Thank you!`;

  window.open(`mailto:feedback@heritagebox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
};
