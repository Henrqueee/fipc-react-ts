import type { VehicleType, HeroStat } from '../types/homeTypes';

export class HomeDataService {
  static getVehicleTypes(): VehicleType[] {
    return [
      { icon: '🚗', title: 'Cars', description: 'National and imported', count: '+50,000 models' },
      { icon: '🏍️', title: 'Motorcycles', description: 'All engine sizes', count: '+15,000 models' },
      { icon: '🚚', title: 'Trucks', description: 'Light and heavy', count: '+8,000 models' },
      { icon: '🚐', title: 'Minibuses', description: 'Public transport', count: '+2,000 models' },
      { icon: '🚛', title: 'Utilities', description: 'Work and leisure', count: '+12,000 models' },
      { icon: '🏎️', title: 'Sports Cars', description: 'High performance', count: '+3,000 models' }
    ];
  }

  static getHeroStats(): HeroStat[] {
    return [
      { number: '100K+', label: 'Queries completed' },
      { number: '24/7', label: 'Always available' },
      { number: '100%', label: 'Official data' }
    ];
  }
}