import type { 
  TimelineItem, 
  CompanyStatistic, 
  StoryContent, 
  MissionContent, 
  AboutFeature, 
  FoundationHistory 
} from '../types/aboutTypes';

export class AboutDataService {
  static getTimelineData(): TimelineItem[] {
    return [
      {
        year: '1973',
        title: 'Foundation',
        description: 'FIPE Foundation established'
      },
      {
        year: '1980s',
        title: 'First Expansion',
        description: 'First vehicle price tables'
      },
      {
        year: '2024',
        title: 'Digital Transformation',
        description: 'Digital transformation with FIPE Query'
      }
    ];
  }

  static getCompanyStats(): CompanyStatistic[] {
    return [
      { number: '1973', label: 'Founded' },
      { number: '50+', label: 'Years' },
      { number: '1M+', label: 'Monthly Queries' }
    ];
  }

  static getStoryContent(): StoryContent {
    return {
      title: 'The FIPE Story',
      firstParagraph: `Since 1973, the FIPE Foundation has been the cornerstone of vehicle 
        valuation in Brazil. What started as a research initiative became 
        the most trusted reference for millions of transactions.`,
      secondParagraph: `Over the decades, we have witnessed and facilitated the transformation of countless 
        ideas into groundbreaking solutions that have positively impacted society. Our 
        commitment to excellence and innovation has made us a trusted partner for 
        organizations seeking to push the boundaries of what's possible.`
    };
  }

  static getMissionContent(): MissionContent {
    return {
      title: 'Our Mission',
      description: `We're building the most reliable platform to check vehicle prices, 
        making FIPE data accessible to everyone, anywhere, anytime.`
    };
  }

  static getFeaturesList(): AboutFeature[] {
    return [
      {
        icon: '🏛️',
        title: 'Official Data',
        description: 'Direct access to FIPE Foundation\'s official database',
        animationDelay: 0
      },
      {
        icon: '⚡',
        title: 'Instant Results',
        description: 'Get vehicle prices in seconds, not minutes',
        animationDelay: 0.2
      },
      {
        icon: '🆓',
        title: 'Always Free',
        description: 'Unlimited queries at no cost, forever',
        animationDelay: 0.4
      }
    ];
  }

  static getFoundationHistory(): FoundationHistory {
    return {
      foundedYear: '1973',
      badgeText: 'Since 1973',
      heroTitle: '50 Years of Trust',
      heroDescription: 'From a small research foundation to Brazil\'s most authoritative voice in vehicle pricing',
      timeline: this.getTimelineData()
    };
  }

  static getCTAContent() {
    return {
      title: 'Ready to Check Vehicle Prices?',
      description: 'Get instant access to official FIPE prices for any vehicle in Brazil.',
      buttonText: 'Start Your Search'
    };
  }
}