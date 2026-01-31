
export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  logoUrl: string;
  faviconUrl: string;
  heroImageUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  latitude: string;
  longitude: string;
  appointmentTemplate: string;
  defaultLanguage: 'id' | 'en';
  themeColor: string;
  fontFamily: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImageUrl: string;
  publishedAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}