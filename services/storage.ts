
import { SiteSettings, BlogPost, ServiceItem } from '../types';

// API Configuration
// Ensure your backend server (Laravel/Node) is running on this URL
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api';

const KEYS = {
  SETTINGS: 'kmm_settings',
  POSTS: 'kmm_posts',
  SERVICES: 'kmm_services',
  ADMIN: 'kmm_admin'
};

// --- Default Data Fallbacks (Used if API fails or for initial render) ---
const DEFAULT_SETTINGS: SiteSettings = {
  name: 'Klinik Mitra Medika',
  tagline: 'Mitra Kesehatan Terpercaya Anda',
  description: 'Menyediakan perawatan medis yang komprehensif, penuh kasih, dan mutakhir untuk Anda dan keluarga Anda.',
  translations: {
    id: { defaultTagline: 'Mitra Kesehatan Terpercaya Anda', defaultDescription: 'Menyediakan perawatan medis yang komprehensif...' },
    en: { defaultTagline: 'Your Trusted Healthcare Partner', defaultDescription: 'Providing comprehensive, compassionate, and state-of-the-art medical care...' }
  },
  address: 'Jl. Jendral Sudirman No. 123, Jakarta Selatan',
  phone: '+62 21 555 0199',
  email: 'contact@mitramedika.co.id',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
  faviconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
  heroImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  latitude: '-6.2088',
  longitude: '106.8456',
  appointmentTemplate: "Halo, saya ingin membuat janji temu...",
  defaultLanguage: 'id',
  themeColor: '#2563eb',
  fontFamily: 'Inter',
  stats: { yearsExperience: '15+', specialistDoctors: '50+', emergencyHours: '24/7' }
};

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'General Checkup',
    description: 'Comprehensive health screening and physical examinations.',
    iconName: 'Stethoscope',
    translations: {
      id: { title: 'Pemeriksaan Umum', description: 'Pemeriksaan kesehatan komprehensif dan pemeriksaan fisik.' },
      en: { title: 'General Checkup', description: 'Comprehensive health screening and physical examinations.' }
    }
  },
  {
    id: '2',
    title: 'Dental Care',
    description: 'Professional dental services including scaling, whitening, and surgery.',
    iconName: 'Smile',
    translations: {
      id: { title: 'Perawatan Gigi', description: 'Layanan gigi profesional termasuk scaling, pemutihan, dan bedah.' },
      en: { title: 'Dental Care', description: 'Professional dental services including scaling, whitening, and surgery.' }
    }
  },
  {
    id: '3',
    title: 'Emergency Care',
    description: '24/7 Rapid response for critical medical situations.',
    iconName: 'Ambulance',
    translations: {
      id: { title: 'Layanan Darurat', description: 'Respon cepat 24/7 untuk situasi medis kritis.' },
      en: { title: 'Emergency Care', description: '24/7 Rapid response for critical medical situations.' }
    }
  },
  {
    id: '4',
    title: 'Lab Testing',
    description: 'Accurate laboratory testing and complete blood analysis.',
    iconName: 'TestTube',
    translations: {
      id: { title: 'Tes Laboratorium', description: 'Pengujian laboratorium akurat dan analisis darah lengkap.' },
      en: { title: 'Lab Testing', description: 'Accurate laboratory testing and complete blood analysis.' }
    }
  }
];

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Tips for a Healthy Heart',
    excerpt: 'Simple lifestyle changes can make a big difference in your cardiovascular health.',
    content: 'Cardiovascular disease is a leading cause of death globally. However, many heart problems can be prevented with healthy lifestyle choices.\n\n1. Eat a Heart-Healthy Diet: Focus on fruits, vegetables, whole grains, and healthy fats. Limit salt and sugar intake.\n2. Get Regular Exercise: Aim for at least 150 minutes of moderate exercise per week.\n3. Maintain a Healthy Weight: Being overweight increases the risk of heart disease.\n4. Don’t Smoke: Smoking is a major risk factor for heart disease.\n5. Manage Stress: Chronic stress can contribute to high blood pressure and other heart risks.',
    author: 'Dr. Sarah Smith',
    category: 'Cardiology',
    coverImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2023-10-15',
    translations: {
      id: {
        title: '5 Tips untuk Jantung Sehat',
        excerpt: 'Perubahan gaya hidup sederhana dapat membuat perbedaan besar dalam kesehatan kardiovaskular Anda.',
        content: 'Penyakit kardiovaskular adalah penyebab utama kematian secara global. Namun, banyak masalah jantung dapat dicegah dengan pilihan gaya hidup sehat.\n\n1. Makan Diet Jantung Sehat: Fokus pada buah-buahan, sayuran, biji-bijian, dan lemak sehat. Batasi asupan garam dan gula.\n2. Olahraga Teratur: Usahakan setidaknya 150 menit olahraga sedang per minggu.\n3. Pertahankan Berat Badan Ideal: Kelebihan berat badan meningkatkan risiko penyakit jantung.\n4. Jangan Merokok: Merokok adalah faktor risiko utama penyakit jantung.\n5. Kelola Stres: Stres kronis dapat berkontribusi pada tekanan darah tinggi dan risiko jantung lainnya.',
        category: 'Kardiologi'
      },
      en: {
        title: '5 Tips for a Healthy Heart',
        excerpt: 'Simple lifestyle changes can make a big difference in your cardiovascular health.',
        content: 'Cardiovascular disease is a leading cause of death globally. However, many heart problems can be prevented with healthy lifestyle choices.\n\n1. Eat a Heart-Healthy Diet: Focus on fruits, vegetables, whole grains, and healthy fats. Limit salt and sugar intake.\n2. Get Regular Exercise: Aim for at least 150 minutes of moderate exercise per week.\n3. Maintain a Healthy Weight: Being overweight increases the risk of heart disease.\n4. Don’t Smoke: Smoking is a major risk factor for heart disease.\n5. Manage Stress: Chronic stress can contribute to high blood pressure and other heart risks.',
        category: 'Cardiology'
      }
    }
  },
  {
    id: '2',
    title: 'Understanding Childhood Vaccinations',
    excerpt: 'Why vaccines are crucial for your child’s development and safety.',
    content: 'Vaccines are one of the most effective ways to protect children from serious diseases. They work by preparing the body’s immune system to fight off infections.\n\nCommon vaccines include measles, mumps, rubella (MMR), polio, and hepatitis B. Following the recommended vaccination schedule ensures your child is protected when they are most vulnerable.',
    author: 'Dr. John Doe',
    category: 'Pediatrics',
    coverImageUrl: 'https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2023-11-02',
    translations: {
       id: {
         title: 'Memahami Vaksinasi Anak',
         excerpt: 'Mengapa vaksin sangat penting untuk perkembangan dan keselamatan anak Anda.',
         content: 'Vaksin adalah salah satu cara paling efektif untuk melindungi anak-anak dari penyakit serius. Mereka bekerja dengan mempersiapkan sistem kekebalan tubuh untuk melawan infeksi.',
         category: 'Pediatri'
       },
       en: {
         title: 'Understanding Childhood Vaccinations',
         excerpt: 'Why vaccines are crucial for your child’s development and safety.',
         content: 'Vaccines are one of the most effective ways to protect children from serious diseases. They work by preparing the body’s immune system to fight off infections.',
         category: 'Pediatrics'
       }
    }
  }
];

// --- Helper for API Calls ---
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    });
    
    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    // Only log warn to avoid flooding console in dev without backend
    console.warn(`API unavailable at ${endpoint}. using fallback.`);
    throw error;
  }
}

// --- Settings ---
export const getSettings = async (): Promise<SiteSettings> => {
  try {
    // Try API First
    return await fetchAPI<SiteSettings>('/settings');
  } catch (e) {
    // Fallback to LocalStorage
    const stored = localStorage.getItem(KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings: SiteSettings): Promise<SiteSettings> => {
  // Always save to LocalStorage (Optimistic/Fallback)
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));

  try {
    // Try syncing with API
    await fetchAPI<SiteSettings>('/settings', {
      method: 'POST',
      body: JSON.stringify(settings)
    });
  } catch (e) {
    // Ignore API error, data is saved locally
  }
  return settings;
};

// --- Auth (Admin) ---
export const verifyAdminLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await fetchAPI<{ success: boolean; token?: string }>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    return res.success;
  } catch (e) {
    // Fallback Auth (Hardcoded for demo)
    const stored = localStorage.getItem(KEYS.ADMIN);
    const creds = stored ? JSON.parse(stored) : { email: 'admin@mitramedika.co.id', password: '' }; // default accepts any pass if not set
    
    // In demo mode without backend, simple check
    if (email === creds.email) {
        // If password set in local storage check it, otherwise allow defaults
        if (creds.password && creds.password !== password) return false;
        return true; 
    }
    return false;
  }
};

export const updateAdminCredentials = async (email: string, password?: string): Promise<void> => {
  // Save locally
  localStorage.setItem(KEYS.ADMIN, JSON.stringify({ email, password }));

  try {
    await fetchAPI('/admin/credentials', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  } catch (e) {
    // Ignore
  }
};

// --- Blog Posts ---
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    return await fetchAPI<BlogPost[]>('/posts');
  } catch (e) {
    const stored = localStorage.getItem(KEYS.POSTS);
    return stored ? JSON.parse(stored) : DEFAULT_POSTS;
  }
};

export const saveBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  // Logic to save locally needs to handle ID generation and Array updates
  try {
      // 1. Get current posts
      let currentPosts = await getBlogPosts();
      
      // 2. Update or Add
      if (post.id) {
          currentPosts = currentPosts.map(p => p.id === post.id ? post : p);
      } else {
          // Generate ID
          post.id = Date.now().toString();
          currentPosts = [post, ...currentPosts];
      }
      
      // 3. Save to LocalStorage
      localStorage.setItem(KEYS.POSTS, JSON.stringify(currentPosts));
  } catch(err) {
      console.error("Local save failed", err);
  }

  // Try API
  try {
    return await fetchAPI<BlogPost>('/posts', {
      method: 'POST',
      body: JSON.stringify(post)
    });
  } catch (e) {
    return post;
  }
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  // Local delete
  try {
      const currentPosts = await getBlogPosts();
      const updated = currentPosts.filter(p => p.id !== id);
      localStorage.setItem(KEYS.POSTS, JSON.stringify(updated));
  } catch(err) {}

  // API delete
  try {
    await fetchAPI(`/posts/${id}`, { method: 'DELETE' });
  } catch (e) {}
};

// --- Services ---
export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    return await fetchAPI<ServiceItem[]>('/services');
  } catch (e) {
    const stored = localStorage.getItem(KEYS.SERVICES);
    return stored ? JSON.parse(stored) : DEFAULT_SERVICES;
  }
};

export const saveService = async (service: ServiceItem): Promise<ServiceItem> => {
  try {
      let currentServices = await getServices();
      if (service.id) {
          currentServices = currentServices.map(s => s.id === service.id ? service : s);
      } else {
          service.id = Date.now().toString();
          currentServices = [...currentServices, service];
      }
      localStorage.setItem(KEYS.SERVICES, JSON.stringify(currentServices));
  } catch(err) {}

  try {
    return await fetchAPI<ServiceItem>('/services', {
      method: 'POST',
      body: JSON.stringify(service)
    });
  } catch (e) {
    return service;
  }
};

export const deleteService = async (id: string): Promise<void> => {
  try {
      const currentServices = await getServices();
      const updated = currentServices.filter(s => s.id !== id);
      localStorage.setItem(KEYS.SERVICES, JSON.stringify(updated));
  } catch(err) {}

  try {
    await fetchAPI(`/services/${id}`, { method: 'DELETE' });
  } catch (e) {}
};

// Helper for type compatibility with App.tsx imports if needed
export const getAdminCredentials = () => ({ email: 'admin@mitramedika.co.id', password: '' }); 
export const saveAdminCredentials = () => {}; 
export const saveAllBlogPosts = () => {};
export const saveAllServices = () => {};
