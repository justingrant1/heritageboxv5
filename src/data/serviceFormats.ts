export interface ServiceFormat {
  id: string;
  formatType: string;
  displayName: string;
  shortDescription: string;
  longDescription: string;
  technicalSpecs: {
    resolution: string;
    equipment: string[];
    processingTime: string;
    outputFormats: string[];
  };
  pricing: {
    starterIncluded: boolean;
    popularIncluded: boolean;
    dustyRoseIncluded: boolean;
    eternalIncluded: boolean;
    conversionRate: number; // 1 item = X photos equivalent
  };
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    focusKeyword: string;
  };
  commonIssues: string[];
  benefits: string[];
  relatedFormats: string[];
}

export const serviceFormats: ServiceFormat[] = [
  {
    id: 'vhs',
    formatType: 'VHS',
    displayName: 'VHS Tape Digitization',
    shortDescription: 'Convert your VHS tapes to high-quality digital files',
    longDescription: 'Transform your precious VHS memories into modern digital formats with our professional VHS digitization service. Using state-of-the-art equipment, we carefully convert your tapes while preserving every detail.',
    technicalSpecs: {
      resolution: '720x480 (DVD quality)',
      equipment: ['Professional VHS decks', 'Time-base correctors', 'Digital capture cards'],
      processingTime: '2-3 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 25 // 1 VHS = 25 photos
    },
    seoData: {
      title: 'Professional VHS to Digital Conversion Service | HeritageBox',
      description: 'Convert your VHS tapes to digital with HeritageBox\'s professional VHS digitization service. High-quality conversion, secure processing, satisfaction guaranteed.',
      keywords: ['VHS to digital', 'VHS conversion service', 'digitize VHS tapes', 'VHS transfer', 'convert VHS to MP4'],
      focusKeyword: 'VHS to digital conversion'
    },
    commonIssues: ['Tape degradation', 'Mold damage', 'Broken cassette shells', 'Tracking issues'],
    benefits: ['Preserve family memories', 'Easy sharing with family', 'No more rewinding', 'Digital backup security'],
    relatedFormats: ['vhs-c', 'hi8', 'digital8']
  },
  {
    id: 'vhs-c',
    formatType: 'VHS-C',
    displayName: 'VHS-C Tape Digitization',
    shortDescription: 'Professional VHS-C to digital conversion service',
    longDescription: 'Convert your compact VHS-C camcorder tapes to digital formats. Our specialized equipment handles these smaller tapes with the same professional quality as full-size VHS.',
    technicalSpecs: {
      resolution: '720x480 (DVD quality)',
      equipment: ['VHS-C adapters', 'Professional VHS decks', 'Digital capture systems'],
      processingTime: '2-3 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 25
    },
    seoData: {
      title: 'VHS-C to Digital Conversion | Professional Camcorder Tape Transfer',
      description: 'Convert VHS-C camcorder tapes to digital with HeritageBox. Professional quality conversion of your compact VHS memories to modern digital formats.',
      keywords: ['VHS-C to digital', 'VHS-C conversion', 'camcorder tape transfer', 'compact VHS digitization'],
      focusKeyword: 'VHS-C to digital'
    },
    commonIssues: ['Adapter compatibility', 'Tape jamming', 'Age-related deterioration'],
    benefits: ['Preserve camcorder memories', 'Compact format expertise', 'Professional handling'],
    relatedFormats: ['vhs', 'hi8', 'minidv']
  },
  {
    id: 'hi8',
    formatType: 'Hi8',
    displayName: 'Hi8 Tape Digitization',
    shortDescription: 'Convert Hi8 camcorder tapes to digital formats',
    longDescription: 'Professional Hi8 to digital conversion service. We handle your Hi8 camcorder tapes with specialized equipment to ensure the highest quality digital transfer.',
    technicalSpecs: {
      resolution: '720x480 (DVD quality)',
      equipment: ['Hi8 camcorders', 'Professional capture devices', 'Time-base correctors'],
      processingTime: '2-3 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 25
    },
    seoData: {
      title: 'Hi8 to Digital Conversion Service | Professional Tape Transfer',
      description: 'Convert your Hi8 camcorder tapes to digital with HeritageBox\'s professional Hi8 digitization service. Preserve your analog video memories forever.',
      keywords: ['Hi8 to digital', 'Hi8 conversion', 'Hi8 tape transfer', 'camcorder digitization'],
      focusKeyword: 'Hi8 to digital conversion'
    },
    commonIssues: ['Tape stretching', 'Playback head wear', 'Format compatibility'],
    benefits: ['Superior analog quality', 'Camcorder memory preservation', 'Digital accessibility'],
    relatedFormats: ['digital8', 'vhs-c', 'minidv']
  },
  {
    id: 'digital8',
    formatType: 'Digital8',
    displayName: 'Digital8 Tape Digitization',
    shortDescription: 'Transfer Digital8 camcorder tapes to modern digital files',
    longDescription: 'Convert your Digital8 tapes to accessible digital formats. While already digital, these tapes need specialized equipment for proper transfer to modern file formats.',
    technicalSpecs: {
      resolution: '720x480 (DVD quality)',
      equipment: ['Digital8 camcorders', 'FireWire capture', 'Digital transfer systems'],
      processingTime: '2-3 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 25
    },
    seoData: {
      title: 'Digital8 to Digital File Conversion | Professional Tape Transfer',
      description: 'Transfer your Digital8 camcorder tapes to modern digital files with HeritageBox. Professional Digital8 conversion service with quality guarantee.',
      keywords: ['Digital8 conversion', 'Digital8 to MP4', 'Digital8 tape transfer', 'Sony Digital8 digitization'],
      focusKeyword: 'Digital8 conversion'
    },
    commonIssues: ['Tape mechanism failure', 'Compatibility issues', 'File format obsolescence'],
    benefits: ['Access without camcorder', 'Modern file formats', 'Easy sharing and backup'],
    relatedFormats: ['hi8', 'minidv', 'vhs-c']
  },
  {
    id: 'minidv',
    formatType: 'MiniDV',
    displayName: 'MiniDV Tape Digitization',
    shortDescription: 'Professional MiniDV to digital conversion service',
    longDescription: 'Convert your MiniDV camcorder tapes to modern digital formats. Our professional MiniDV transfer service preserves the excellent quality of your digital video memories.',
    technicalSpecs: {
      resolution: '720x480 (DVD quality)',
      equipment: ['MiniDV camcorders', 'FireWire capture systems', 'Professional editing software'],
      processingTime: '2-3 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 25
    },
    seoData: {
      title: 'MiniDV to Digital Conversion | Professional Camcorder Tape Transfer',
      description: 'Convert MiniDV tapes to digital files with HeritageBox\'s professional MiniDV digitization service. Preserve your high-quality digital video memories.',
      keywords: ['MiniDV to digital', 'MiniDV conversion', 'MiniDV tape transfer', 'digital camcorder conversion'],
      focusKeyword: 'MiniDV to digital'
    },
    commonIssues: ['Tape transport problems', 'Head drum wear', 'Playback device scarcity'],
    benefits: ['High digital quality', 'Professional transfer', 'Modern accessibility'],
    relatedFormats: ['digital8', 'hi8', 'hdv']
  },
  {
    id: '8mm-film',
    formatType: '8mm Film',
    displayName: '8mm Film Transfer',
    shortDescription: 'Professional 8mm film to digital conversion',
    longDescription: 'Transform your 8mm film reels into digital format with our professional film transfer service. Frame-by-frame scanning ensures maximum quality preservation.',
    technicalSpecs: {
      resolution: '1920x1080 (Full HD)',
      equipment: ['Professional film scanners', 'Frame-by-frame capture', 'Color correction systems'],
      processingTime: '3-4 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: false,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 50 // 1 film reel = 50 photos
    },
    seoData: {
      title: '8mm Film to Digital Conversion | Professional Film Transfer Service',
      description: 'Convert your 8mm film to digital with HeritageBox\'s professional film transfer service. Frame-by-frame scanning preserves every precious moment.',
      keywords: ['8mm film to digital', '8mm film conversion', 'film transfer service', '8mm digitization'],
      focusKeyword: '8mm film to digital'
    },
    commonIssues: ['Film brittleness', 'Sprocket damage', 'Color fading', 'Vinegar syndrome'],
    benefits: ['Frame-by-frame quality', 'Color restoration', 'Damage prevention', 'Digital preservation'],
    relatedFormats: ['super8', '16mm-film', 'slides']
  },
  {
    id: 'super8',
    formatType: 'Super 8',
    displayName: 'Super 8 Film Transfer',
    shortDescription: 'Professional Super 8 film to digital conversion',
    longDescription: 'Convert your Super 8 film memories to digital with our professional transfer service. Advanced scanning technology captures every frame in stunning detail.',
    technicalSpecs: {
      resolution: '1920x1080 (Full HD)',
      equipment: ['Super 8 film scanners', 'Professional telecine systems', 'Color grading equipment'],
      processingTime: '3-4 weeks',
      outputFormats: ['MP4', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: false,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 50
    },
    seoData: {
      title: 'Super 8 Film to Digital Conversion | Professional Film Transfer',
      description: 'Convert Super 8 film to digital with HeritageBox\'s professional film transfer service. High-quality digitization of your precious film memories.',
      keywords: ['Super 8 to digital', 'Super 8 film conversion', 'Super 8 transfer', 'film digitization service'],
      focusKeyword: 'Super 8 to digital'
    },
    commonIssues: ['Film shrinkage', 'Perforation damage', 'Emulsion deterioration'],
    benefits: ['Professional scanning', 'Color enhancement', 'Smooth playback', 'Digital longevity'],
    relatedFormats: ['8mm-film', '16mm-film', 'slides']
  },
  {
    id: '16mm-film',
    formatType: '16mm Film',
    displayName: '16mm Film Transfer',
    shortDescription: 'Professional 16mm film to digital conversion service',
    longDescription: 'Convert your 16mm film to digital format with our specialized transfer service. Professional-grade equipment ensures the highest quality digitization.',
    technicalSpecs: {
      resolution: '2K/4K available',
      equipment: ['16mm film scanners', 'Professional telecine', 'Digital restoration tools'],
      processingTime: '4-5 weeks',
      outputFormats: ['MP4', 'ProRes', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: false,
      popularIncluded: false,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 75
    },
    seoData: {
      title: '16mm Film to Digital Conversion | Professional Film Transfer Service',
      description: 'Convert 16mm film to digital with HeritageBox\'s professional film transfer service. High-resolution scanning for archival and commercial film.',
      keywords: ['16mm film to digital', '16mm film conversion', '16mm transfer service', 'professional film digitization'],
      focusKeyword: '16mm film to digital'
    },
    commonIssues: ['Archival film damage', 'Color timing needs', 'Professional restoration requirements'],
    benefits: ['Archival quality', 'Professional restoration', 'Multiple resolution options'],
    relatedFormats: ['super8', '8mm-film', '35mm-film']
  },
  {
    id: 'photos',
    formatType: 'Photos',
    displayName: 'Photo Scanning Service',
    shortDescription: 'High-resolution photo scanning and digitization',
    longDescription: 'Digitize your precious photo memories with our professional photo scanning service. High-resolution scanning preserves every detail of your family photos.',
    technicalSpecs: {
      resolution: '600-4800 DPI',
      equipment: ['Professional flatbed scanners', 'Batch scanning systems', 'Color correction software'],
      processingTime: '2-3 weeks',
      outputFormats: ['JPEG', 'TIFF', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 1 // 1 photo = 1 photo
    },
    seoData: {
      title: 'Professional Photo Scanning Service | Digital Photo Conversion',
      description: 'Digitize your photos with HeritageBox\'s professional photo scanning service. High-resolution scanning preserves your precious family memories forever.',
      keywords: ['photo scanning service', 'digitize photos', 'photo to digital', 'family photo scanning'],
      focusKeyword: 'photo scanning service'
    },
    commonIssues: ['Faded colors', 'Physical damage', 'Stuck photos', 'Various sizes'],
    benefits: ['High-resolution scanning', 'Color restoration', 'Easy sharing', 'Digital backup'],
    relatedFormats: ['slides', 'negatives', 'polaroids']
  },
  {
    id: 'slides',
    formatType: '35mm Slides',
    displayName: '35mm Slide Scanning',
    shortDescription: 'Professional 35mm slide digitization service',
    longDescription: 'Convert your 35mm slides to digital format with our professional slide scanning service. High-resolution digitization brings your slide memories back to life.',
    technicalSpecs: {
      resolution: '4000 DPI (16 megapixels)',
      equipment: ['Professional slide scanners', 'Dust removal systems', 'Color management tools'],
      processingTime: '2-3 weeks',
      outputFormats: ['JPEG', 'TIFF', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 1
    },
    seoData: {
      title: '35mm Slide Scanning Service | Professional Slide Digitization',
      description: 'Convert 35mm slides to digital with HeritageBox\'s professional slide scanning service. High-resolution digitization of your precious slide memories.',
      keywords: ['35mm slide scanning', 'slide to digital', 'slide digitization', 'convert slides to digital'],
      focusKeyword: '35mm slide scanning'
    },
    commonIssues: ['Dust and scratches', 'Color fading', 'Slide mounting issues', 'Kodachrome processing'],
    benefits: ['High-resolution scanning', 'Dust removal', 'Color correction', 'Easy viewing'],
    relatedFormats: ['photos', 'negatives', '8mm-film']
  },
  {
    id: 'negatives',
    formatType: 'Film Negatives',
    displayName: 'Film Negative Scanning',
    shortDescription: 'Professional film negative digitization service',
    longDescription: 'Digitize your film negatives with our professional scanning service. Advanced scanning technology reveals the full quality hidden in your negatives.',
    technicalSpecs: {
      resolution: '4000 DPI (35mm), 2400 DPI (medium format)',
      equipment: ['Professional negative scanners', 'ICE dust removal', 'Color inversion software'],
      processingTime: '2-3 weeks',
      outputFormats: ['JPEG', 'TIFF', 'Digital download', 'Cloud storage']
    },
    pricing: {
      starterIncluded: true,
      popularIncluded: true,
      dustyRoseIncluded: true,
      eternalIncluded: true,
      conversionRate: 1
    },
    seoData: {
      title: 'Film Negative Scanning Service | Professional Negative Digitization',
      description: 'Convert film negatives to digital with HeritageBox\'s professional negative scanning service. High-quality digitization reveals your hidden memories.',
      keywords: ['film negative scanning', 'negative to digital', 'negative digitization', 'convert negatives'],
      focusKeyword: 'film negative scanning'
    },
    commonIssues: ['Negative curling', 'Dust and scratches', 'Color balance', 'Strip handling'],
    benefits: ['Professional inversion', 'Dust removal', 'Color correction', 'High resolution'],
    relatedFormats: ['slides', 'photos', '35mm-film']
  }
];

export const getServiceById = (id: string): ServiceFormat | undefined => {
  return serviceFormats.find(service => service.id === id);
};

export const getServiceBySlug = (slug: string): ServiceFormat | undefined => {
  return serviceFormats.find(service => 
    service.formatType.toLowerCase().replace(/\s+/g, '-') === slug ||
    service.id === slug
  );
};

export const getRelatedServices = (serviceId: string, limit: number = 3): ServiceFormat[] => {
  const service = getServiceById(serviceId);
  if (!service) return [];
  
  const related = serviceFormats.filter(s => 
    s.id !== serviceId && service.relatedFormats.includes(s.id)
  );
  
  return related.slice(0, limit);
};

export const formatSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
