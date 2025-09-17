import type { AboutNavigationOptions } from '../types/aboutTypes';

export class AboutNavigationService {
  private static readonly DEFAULT_DELAY = 100;
  private static readonly DEFAULT_SCROLL_TARGET = '[class*="searchSection"]';

  static async navigateToQuery(navigate: (path: string) => void): Promise<void> {
    try {
      navigate('/');
      await this.scrollToSearchSection();
    } catch (error) {
      console.error('Navigation to query failed:', error);
      throw new Error('Failed to navigate to query page');
    }
  }

  static async scrollToSearchSection(
    selector: string = this.DEFAULT_SCROLL_TARGET,
    delay: number = this.DEFAULT_DELAY
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const searchSection = document.querySelector(selector);
          if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
            resolve();
          } else {
            reject(new Error(`Element with selector "${selector}" not found`));
          }
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  }

  static async handleNavigationWithDelay(
    route: string,
    navigate: (path: string) => void,
    delay: number = this.DEFAULT_DELAY
  ): Promise<void> {
    try {
      navigate(route);
      
      if (route === '/') {
        await this.scrollToSearchSection(this.DEFAULT_SCROLL_TARGET, delay);
      }
    } catch (error) {
      console.error('Navigation with delay failed:', error);
      throw new Error(`Failed to navigate to ${route}`);
    }
  }

  static validateNavigationTarget(selector: string): boolean {
    try {
      document.querySelector(selector);
      return true;
    } catch (error) {
      console.error('Invalid selector:', selector, error);
      return false;
    }
  }

  static executeScrollBehavior(options: ScrollIntoViewOptions = { behavior: 'smooth' }): void {
    const element = document.querySelector(this.DEFAULT_SCROLL_TARGET);
    if (element) {
      element.scrollIntoView(options);
    }
  }

  static createNavigationOptions(
    route: string,
    delay?: number,
    scrollTarget?: string,
    behavior?: ScrollBehavior
  ): AboutNavigationOptions {
    return {
      route,
      delay: delay ?? this.DEFAULT_DELAY,
      scrollTarget: scrollTarget ?? this.DEFAULT_SCROLL_TARGET,
      behavior: behavior ?? 'smooth'
    };
  }

  static async executeNavigation(
    options: AboutNavigationOptions,
    navigate: (path: string) => void
  ): Promise<void> {
    try {
      await this.handleNavigationWithDelay(
        options.route,
        navigate,
        options.delay
      );
    } catch (error) {
      console.error('Navigation execution failed:', error);
      throw error;
    }
  }
}