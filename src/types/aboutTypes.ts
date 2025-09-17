export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  className?: string;
}

export interface CompanyStatistic {
  number: string;
  label: string;
}

export interface StoryContent {
  title: string;
  firstParagraph: string;
  secondParagraph: string;
}

export interface MissionContent {
  title: string;
  description: string;
}

export interface AboutFeature {
  icon: string;
  title: string;
  description: string;
  animationDelay: number;
}

export interface FoundationHistory {
  foundedYear: string;
  badgeText: string;
  heroTitle: string;
  heroDescription: string;
  timeline: TimelineItem[];
}

export interface AboutNavigationOptions {
  route: string;
  delay?: number;
  scrollTarget?: string;
  behavior?: ScrollBehavior;
}

export interface AboutContentState {
  isLoading: boolean;
  error: string | null;
  foundationHistory: FoundationHistory | null;
  storyContent: StoryContent | null;
  missionContent: MissionContent | null;
  features: AboutFeature[];
}

export interface AboutActionsState {
  isNavigating: boolean;
  navigationError: string | null;
  lastAction: string | null;
}