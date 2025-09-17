import { useState, useEffect } from 'react';
import { AboutDataService } from '../services/aboutDataService';
import type { AboutContentState, FoundationHistory, StoryContent, MissionContent, AboutFeature } from '../types/aboutTypes';

interface UseAboutContentReturn extends AboutContentState {
  refreshContent: () => Promise<void>;
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const useAboutContent = (): UseAboutContentReturn => {
  const [state, setState] = useState<AboutContentState>({
    isLoading: true,
    error: null,
    foundationHistory: null,
    storyContent: null,
    missionContent: null,
    features: []
  });

  const loadContent = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Simulate async loading to match real-world scenarios
      await new Promise(resolve => setTimeout(resolve, 50));

      const foundationHistory = AboutDataService.getFoundationHistory();
      const storyContent = AboutDataService.getStoryContent();
      const missionContent = AboutDataService.getMissionContent();
      const features = AboutDataService.getFeaturesList();

      setState({
        isLoading: false,
        error: null,
        foundationHistory,
        storyContent,
        missionContent,
        features
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load content'
      }));
    }
  };

  const refreshContent = async (): Promise<void> => {
    await loadContent();
  };

  useEffect(() => {
    loadContent();
  }, []);

  const ctaContent = AboutDataService.getCTAContent();

  return {
    ...state,
    refreshContent,
    ctaContent
  };
};