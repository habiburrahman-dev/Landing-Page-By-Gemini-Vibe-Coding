
export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  // Translation Storage
  translations: {
    id: {
      defaultTagline: string;
      defaultDescription: string;
    };
    en: {
      defaultTagline: string;
      defaultDescription: string;
    };
  };
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
  // Homepage Stats
  stats: {
    yearsExperience: string;
    specialistDoctors: string;
    emergencyHours: string;
  };
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
  translations?: {
    id: {
      title: string;
      excerpt: string;
      content: string;
      category: string;
    };
    en: {
      title: string;
      excerpt: string;
      content: string;
      category: string;
    };
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  translations?: {
    id: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
  };
}
