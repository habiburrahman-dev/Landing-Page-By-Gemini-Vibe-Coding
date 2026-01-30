
import { SiteSettings, BlogPost, ServiceItem } from '../types';

const SETTINGS_KEY = 'kmm_settings';
const BLOG_KEY = 'kmm_blog';
const SERVICES_KEY = 'kmm_services';

const DEFAULT_SETTINGS: SiteSettings = {
  name: 'Klinik Mitra Medika',
  tagline: 'Mitra Kesehatan Terpercaya Anda',
  description: 'Menyediakan perawatan medis yang komprehensif, penuh kasih, dan mutakhir untuk Anda dan keluarga Anda.',
  address: 'Jl. Jendral Sudirman No. 123, Jakarta Selatan',
  phone: '+62 21 555 0199',
  email: 'contact@mitramedika.co.id',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
  heroImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  latitude: '-6.2088',
  longitude: '106.8456',
  appointmentTemplate: "Halo, saya ingin membuat janji temu.\n\nNama: {name}\nLayanan: {service}\nTanggal: {date}\nWaktu: {time}\nCatatan: {notes}",
  defaultLanguage: 'id',
  themeColor: '#2563eb',
  fontFamily: 'Inter',
};

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Tips for a Healthy Heart',
    excerpt: 'Simple lifestyle changes can make a big difference in your cardiovascular health.',
    content: 'Cardiovascular disease is a leading cause of death globally. However, many heart problems can be prevented with healthy lifestyle choices.\n\n1. Eat a Heart-Healthy Diet: Focus on fruits, vegetables, whole grains, and healthy fats. Limit salt and sugar intake.\n2. Get Regular Exercise: Aim for at least 150 minutes of moderate exercise per week.\n3. Maintain a Healthy Weight: Being overweight increases the risk of heart disease.\n4. Don’t Smoke: Smoking is a major risk factor for heart disease.\n5. Manage Stress: Chronic stress can contribute to high blood pressure and other heart risks.',
    author: 'Dr. Budi Santoso',
    category: 'Cardiology',
    coverImageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2023-10-15',
  },
  {
    id: '2',
    title: 'Understanding Childhood Vaccinations',
    excerpt: 'Why vaccines are crucial for your child’s development and safety.',
    content: 'Vaccines are one of the most effective ways to protect children from serious diseases. They work by preparing the body’s immune system to fight off infections.\n\nCommon vaccines include measles, mumps, rubella (MMR), polio, and hepatitis B. Following the recommended vaccination schedule ensures your child is protected when they are most vulnerable.\n\nVaccines are safe and rigorously tested. Side effects are usually mild and temporary, such as a sore arm or low-grade fever.',
    author: 'Dr. Siti Aminah',
    category: 'Pediatrics',
    coverImageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2023-10-20',
  },
  {
    id: '3',
    title: 'Dental Hygiene 101',
    excerpt: 'How to maintain a perfect smile and prevent gum diseases.',
    content: 'Good dental hygiene is essential for healthy teeth and gums. It also affects your overall health.\n\nKey practices include:\n- Brushing twice a day with fluoride toothpaste.\n- Flossing daily to remove plaque between teeth.\n- Limiting sugary snacks and drinks.\n- Visiting your dentist regularly for checkups and cleanings.\n\nIgnoring dental health can lead to cavities, gum disease, and even tooth loss.',
    author: 'Drg. Ratna Sari',
    category: 'Dental',
    coverImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf4722e12?auto=format&fit=crop&q=80&w=800',
    publishedAt: '2023-11-05',
  },
];

const DEFAULT_SERVICES_LIST: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Pemeriksaan Umum', 
    description: 'Pemeriksaan kesehatan komprehensif dan pemeriksaan fisik.', 
    iconName: 'Stethoscope' 
  },
  { 
    id: '2', 
    title: 'Perawatan Gigi', 
    description: 'Layanan gigi profesional termasuk scaling, pemutihan, dan bedah.', 
    iconName: 'Smile' 
  },
  { 
    id: '3', 
    title: 'Imunisasi', 
    description: 'Program imunisasi lengkap untuk bayi dan anak-anak.', 
    iconName: 'Syringe' 
  },
  { 
    id: '4', 
    title: 'Vaksinasi', 
    description: 'Vaksin penting untuk orang dewasa dan persyaratan perjalanan internasional.', 
    iconName: 'Syringe' 
  },
  { 
    id: '5', 
    title: 'Rawat Inap', 
    description: 'Fasilitas rawat inap yang nyaman dengan perawatan perawat 24/7.', 
    iconName: 'Bed' 
  },
  { 
    id: '6', 
    title: 'Sistem Rujukan', 
    description: 'Layanan rujukan spesialis ke rumah sakit teratas dan mitra.', 
    iconName: 'ClipboardList' 
  },
  { 
    id: '7', 
    title: 'Ambulans', 
    description: 'Layanan ambulans respon cepat untuk situasi darurat.', 
    iconName: 'Ambulance' 
  },
  { 
    id: '8', 
    title: 'Tes Darah', 
    description: 'Pengujian laboratorium akurat dan analisis darah lengkap.', 
    iconName: 'TestTube' 
  },
  { 
    id: '9', 
    title: 'Tes Kolesterol', 
    description: 'Pemeriksaan profil lipid untuk memantau kesehatan jantung.', 
    iconName: 'HeartPulse' 
  },
  { 
    id: '10', 
    title: 'Tekanan Darah', 
    description: 'Pemantauan rutin dan manajemen hipertensi.', 
    iconName: 'Activity' 
  },
  { 
    id: '11', 
    title: 'Konsultasi Kesehatan', 
    description: 'Saran medis ahli dari dokter umum berpengalaman kami.', 
    iconName: 'MessageCircle' 
  },
];

export const getSettings = (): SiteSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
};

export const saveSettings = (settings: SiteSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getBlogPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(BLOG_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_BLOG_POSTS;
};

export const saveBlogPost = (post: BlogPost) => {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }
  
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
};

export const saveAllBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
};

export const deleteBlogPost = (id: string) => {
  const posts = getBlogPosts();
  const newPosts = posts.filter((p) => p.id !== id);
  localStorage.setItem(BLOG_KEY, JSON.stringify(newPosts));
};

export const getServices = (): ServiceItem[] => {
  const stored = localStorage.getItem(SERVICES_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_SERVICES_LIST;
};

export const saveService = (service: ServiceItem) => {
  const services = getServices();
  const existingIndex = services.findIndex((s) => s.id === service.id);
  
  if (existingIndex >= 0) {
    services[existingIndex] = service;
  } else {
    services.push(service);
  }
  
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};

export const saveAllServices = (services: ServiceItem[]) => {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};

export const deleteService = (id: string) => {
  const services = getServices();
  const newServices = services.filter((s) => s.id !== id);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(newServices));
};