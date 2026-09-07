export type NavView = 
  | 'home' 
  | 'phones' 
  | 'exchange' 
  | 'repair' 
  | 'showroom' 
  | 'insights' 
  | 'facts' 
  | 'location';

export type PageView = NavView;

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'OnePlus' | 'Accessories';
  category: 'iPhone' | 'Samsung' | 'Mac' | 'Smartphones' | 'Audio & Wearables';
  tagline: string;
  description: string;
  priceRange: string;
  featured?: boolean;
  editorialHighlight?: string;
  image: string;
  colors: { name: string; hex: string }[];
  keySpecs: string[];
  stockStatus: 'In Stock at Showroom' | 'Limited Stock' | 'Special Order';
  warranty: string;
}

export interface RepairService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  symptoms: string[];
  procedure: string;
  turnaroundTime: string;
  guarantee: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Buying Guides' | 'Exchange' | 'Repair' | 'Technology' | 'Apple' | 'Samsung';
  excerpt: string;
  readTime: string;
  date: string;
  coverImage: string;
  author: string;
  content: string[];
  tags: string[];
  keyTakeaway: string;
}

export interface FunFact {
  id: number;
  category: '📱 Smartphone' | '🍎 Apple' | '📷 Camera' | '🔋 Battery' | '🌐 Technology';
  headline: string;
  fact: string;
  detail: string;
  highlightStat?: string;
}

export interface HeroStage {
  step: number;
  title: string;
  subtitle: string;
  deviceRotation: { x: number; y: number; z: number; scale: number };
  badgeText: string;
  accentText?: string;
}
