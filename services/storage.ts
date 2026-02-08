
import { SiteSettings, BlogPost, ServiceItem } from '../types';
import { hashPassword } from './security';

// Updated keys to ensure clean state if previous versions had issues
const SETTINGS_KEY = 'kmm_settings_v1';
const BLOG_KEY = 'kmm_blog_v1';
const SERVICES_KEY = 'kmm_services_v1';
const ADMIN_KEY = 'kmm_admin_creds_v1';

const DEFAULT_SETTINGS: SiteSettings = {
  name: 'Klinik Mitra Medika',
  tagline: 'Mitra Kesehatan Terpercaya Anda',
  description: 'Menyediakan perawatan medis yang komprehensif, penuh kasih, dan mutakhir untuk Anda dan keluarga Anda.',
  // Default Translation Storage (Matches translations.ts)
  translations: {
    id: {
      defaultTagline: 'Mitra Kesehatan Terpercaya Anda',
      defaultDescription: 'Menyediakan perawatan medis yang komprehensif, penuh kasih, dan mutakhir untuk Anda dan keluarga Anda.'
    },
    en: {
      defaultTagline: 'Your Trusted Healthcare Partner',
      defaultDescription: 'Providing comprehensive, compassionate, and state-of-the-art medical care for you and your family.'
    }
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
  appointmentTemplate: "Halo, saya ingin membuat janji temu.\n\nNama: {name}\nLayanan: {service}\nTanggal: {date}\nWaktu: {time}\nCatatan: {notes}",
  defaultLanguage: 'id',
  themeColor: '#2563eb',
  fontFamily: 'Inter',
  stats: {
    yearsExperience: '15+',
    specialistDoctors: '50+',
    emergencyHours: '24/7'
  }
};

// Default is now hashed using the security service
const DEFAULT_ADMIN_CREDS = {
  email: 'admin-it@mitramedikaskw.com',
  password: '$2a$12$gpk1/Z4mBOinHwfvjUV3V.us0MUen30vHAr.xDf6TlzEb3.8rS44u'
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
    translations: {
      en: {
        title: '5 Tips for a Healthy Heart',
        excerpt: 'Simple lifestyle changes can make a big difference in your cardiovascular health.',
        content: 'Cardiovascular disease is a leading cause of death globally. However, many heart problems can be prevented with healthy lifestyle choices.\n\n1. Eat a Heart-Healthy Diet: Focus on fruits, vegetables, whole grains, and healthy fats. Limit salt and sugar intake.\n2. Get Regular Exercise: Aim for at least 150 minutes of moderate exercise per week.\n3. Maintain a Healthy Weight: Being overweight increases the risk of heart disease.\n4. Don’t Smoke: Smoking is a major risk factor for heart disease.\n5. Manage Stress: Chronic stress can contribute to high blood pressure and other heart risks.',
        category: 'Cardiology'
      },
      id: {
        title: '5 Tips untuk Jantung Sehat',
        excerpt: 'Perubahan gaya hidup sederhana dapat membuat perbedaan besar dalam kesehatan kardiovaskular Anda.',
        content: 'Penyakit kardiovaskular adalah penyebab utama kematian secara global. Namun, banyak masalah jantung dapat dicegah dengan pilihan gaya hidup sehat.\n\n1. Makan Diet Jantung Sehat: Fokus pada buah-buahan, sayuran, biji-bijian, dan lemak sehat. Batasi asupan garam dan gula.\n2. Olahraga Teratur: Usahakan setidaknya 150 menit olahraga sedang per minggu.\n3. Pertahankan Berat Badan Ideal: Kelebihan berat badan meningkatkan risiko penyakit jantung.\n4. Jangan Merokok: Merokok adalah faktor risiko utama penyakit jantung.\n5. Kelola Stres: Stres kronis dapat berkontribusi pada tekanan darah tinggi dan risiko jantung lainnya.',
        category: 'Kardiologi'
      }
    }
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
    translations: {
      en: {
        title: 'Understanding Childhood Vaccinations',
        excerpt: 'Why vaccines are crucial for your child’s development and safety.',
        content: 'Vaccines are one of the most effective ways to protect children from serious diseases. They work by preparing the body’s immune system to fight off infections.\n\nCommon vaccines include measles, mumps, rubella (MMR), polio, and hepatitis B. Following the recommended vaccination schedule ensures your child is protected when they are most vulnerable.\n\nVaccines are safe and rigorously tested. Side effects are usually mild and temporary, such as a sore arm or low-grade fever.',
        category: 'Pediatrics'
      },
      id: {
        title: 'Memahami Vaksinasi Anak',
        excerpt: 'Mengapa vaksin sangat penting untuk perkembangan dan keselamatan anak Anda.',
        content: 'Vaksin adalah salah satu cara paling efektif untuk melindungi anak-anak dari penyakit serius. Mereka bekerja dengan mempersiapkan sistem kekebalan tubuh untuk melawan infeksi.\n\nVaksin umum meliputi campak, gondok, rubella (MMR), polio, dan hepatitis B. Mengikuti jadwal vaksinasi yang direkomendasikan memastikan anak Anda terlindungi saat mereka paling rentan.\n\nVaksin aman dan diuji dengan ketat. Efek samping biasanya ringan dan sementara, seperti nyeri lengan atau demam ringan.',
        category: 'Pediatri'
      }
    }
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
    translations: {
      en: {
        title: 'Dental Hygiene 101',
        excerpt: 'How to maintain a perfect smile and prevent gum diseases.',
        content: 'Good dental hygiene is essential for healthy teeth and gums. It also affects your overall health.\n\nKey practices include:\n- Brushing twice a day with fluoride toothpaste.\n- Flossing daily to remove plaque between teeth.\n- Limiting sugary snacks and drinks.\n- Visiting your dentist regularly for checkups and cleanings.\n\nIgnoring dental health can lead to cavities, gum disease, and even tooth loss.',
        category: 'Dental'
      },
      id: {
        title: 'Kebersihan Gigi 101',
        excerpt: 'Cara menjaga senyum sempurna dan mencegah penyakit gusi.',
        content: 'Kebersihan gigi yang baik sangat penting untuk gigi dan gusi yang sehat. Ini juga mempengaruhi kesehatan Anda secara keseluruhan.\n\nPraktik utama meliputi:\n- Menyikat gigi dua kali sehari dengan pasta gigi berfluoride.\n- Flossing setiap hari untuk menghilangkan plak di antara gigi.\n- Membatasi camilan dan minuman manis.\n- Mengunjungi dokter gigi Anda secara teratur untuk pemeriksaan dan pembersihan.\n\nMengabaikan kesehatan gigi dapat menyebabkan gigi berlubang, penyakit gusi, dan bahkan kehilangan gigi.',
        category: 'Gigi'
      }
    }
  },
];

const DEFAULT_SERVICES_LIST: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Pemeriksaan Umum', 
    description: 'Pemeriksaan kesehatan komprehensif dan pemeriksaan fisik.', 
    iconName: 'Stethoscope',
    translations: {
      id: { title: 'Pemeriksaan Umum', description: 'Pemeriksaan kesehatan komprehensif dan pemeriksaan fisik.' },
      en: { title: 'General Checkup', description: 'Comprehensive health screening and physical examinations.' }
    }
  },
  { 
    id: '2', 
    title: 'Perawatan Gigi', 
    description: 'Layanan gigi profesional termasuk scaling, pemutihan, dan bedah.', 
    iconName: 'Smile',
    translations: {
      id: { title: 'Perawatan Gigi', description: 'Layanan gigi profesional termasuk scaling, pemutihan, dan bedah.' },
      en: { title: 'Dental Care', description: 'Professional dental services including scaling, whitening, and surgery.' }
    }
  },
  { 
    id: '3', 
    title: 'Imunisasi', 
    description: 'Program imunisasi lengkap untuk bayi dan anak-anak.', 
    iconName: 'Syringe',
    translations: {
      id: { title: 'Imunisasi', description: 'Program imunisasi lengkap untuk bayi dan anak-anak.' },
      en: { title: 'Immunization', description: 'Complete immunization programs for infants and children.' }
    }
  },
  { 
    id: '4', 
    title: 'Vaksinasi', 
    description: 'Vaksin penting untuk orang dewasa dan persyaratan perjalanan internasional.', 
    iconName: 'Syringe',
    translations: {
      id: { title: 'Vaksinasi', description: 'Vaksin penting untuk orang dewasa dan persyaratan perjalanan internasional.' },
      en: { title: 'Vaccination', description: 'Essential vaccines for adults and international travel requirements.' }
    }
  },
  { 
    id: '5', 
    title: 'Rawat Inap', 
    description: 'Fasilitas rawat inap yang nyaman dengan perawatan perawat 24/7.', 
    iconName: 'Bed',
    translations: {
      id: { title: 'Rawat Inap', description: 'Fasilitas rawat inap yang nyaman dengan perawatan perawat 24/7.' },
      en: { title: 'Inpatient Care', description: 'Comfortable inpatient facilities with 24/7 nursing care.' }
    }
  },
  { 
    id: '6', 
    title: 'Sistem Rujukan', 
    description: 'Layanan rujukan spesialis ke rumah sakit teratas dan mitra.', 
    iconName: 'ClipboardList',
    translations: {
      id: { title: 'Sistem Rujukan', description: 'Layanan rujukan spesialis ke rumah sakit teratas dan mitra.' },
      en: { title: 'Referral System', description: 'Specialist referral services to top hospitals and partners.' }
    }
  },
  { 
    id: '7', 
    title: 'Ambulans', 
    description: 'Layanan ambulans respon cepat untuk situasi darurat.', 
    iconName: 'Ambulance',
    translations: {
      id: { title: 'Ambulans', description: 'Layanan ambulans respon cepat untuk situasi darurat.' },
      en: { title: 'Ambulance', description: 'Rapid response ambulance service for emergency situations.' }
    }
  },
  { 
    id: '8', 
    title: 'Tes Darah', 
    description: 'Pengujian laboratorium akurat dan analisis darah lengkap.', 
    iconName: 'TestTube',
    translations: {
      id: { title: 'Tes Darah', description: 'Pengujian laboratorium akurat dan analisis darah lengkap.' },
      en: { title: 'Blood Tests', description: 'Accurate laboratory testing and complete blood analysis.' }
    }
  },
  { 
    id: '9', 
    title: 'Tes Kolesterol', 
    description: 'Pemeriksaan profil lipid untuk memantau kesehatan jantung.', 
    iconName: 'HeartPulse',
    translations: {
      id: { title: 'Tes Kolesterol', description: 'Pemeriksaan profil lipid untuk memantau kesehatan jantung.' },
      en: { title: 'Cholesterol Tests', description: 'Lipid profile screening to monitor heart health.' }
    }
  },
  { 
    id: '10', 
    title: 'Tekanan Darah', 
    description: 'Pemantauan rutin dan manajemen hipertensi.', 
    iconName: 'Activity',
    translations: {
      id: { title: 'Tekanan Darah', description: 'Pemantauan rutin dan manajemen hipertensi.' },
      en: { title: 'Blood Pressure', description: 'Regular monitoring and management of hypertension.' }
    }
  },
  { 
    id: '11', 
    title: 'Konsultasi Kesehatan', 
    description: 'Saran medis ahli dari dokter umum berpengalaman kami.', 
    iconName: 'MessageCircle',
    translations: {
      id: { title: 'Konsultasi Kesehatan', description: 'Saran medis ahli dari dokter umum berpengalaman kami.' },
      en: { title: 'Health Consultation', description: 'Expert medical advice from our experienced general practitioners.' }
    }
  },
];

// Helper to safely parse JSON
const safeJsonParse = <T>(json: string | null, fallback: T): T => {
  if (!json) return fallback;
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to parse storage item, reverting to fallback.", e);
    return fallback;
  }
};

export const getSettings = (): SiteSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  const parsed = safeJsonParse(stored, DEFAULT_SETTINGS);
  
  // Backward compatibility: If storing old settings without translations object
  if (!parsed.translations) {
      parsed.translations = DEFAULT_SETTINGS.translations;
  }
  
  // Backward compatibility: If storing old settings without stats
  if (!parsed.stats) {
      parsed.stats = DEFAULT_SETTINGS.stats;
  }
  
  return { ...DEFAULT_SETTINGS, ...parsed };
};

export const saveSettings = (settings: SiteSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings to localStorage", e);
  }
};

export const getAdminCredentials = () => {
  const stored = localStorage.getItem(ADMIN_KEY);
  // If no storage found, it returns the DEFAULT which is now hashed via hashPassword above
  return safeJsonParse(stored, DEFAULT_ADMIN_CREDS);
};

export const saveAdminCredentials = (creds: {email: string, password: string}) => {
  try {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(creds));
  } catch (e) {
    console.error("Failed to save admin creds", e);
  }
};

export const getBlogPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(BLOG_KEY);
  return safeJsonParse(stored, DEFAULT_BLOG_POSTS);
};

export const saveBlogPost = (post: BlogPost) => {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post);
  }
  
  try {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  } catch(e) { console.error(e); }
};

export const saveAllBlogPosts = (posts: BlogPost[]) => {
  try {
    localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  } catch(e) { console.error(e); }
};

export const deleteBlogPost = (id: string) => {
  const posts = getBlogPosts();
  const newPosts = posts.filter((p) => p.id !== id);
  try {
    localStorage.setItem(BLOG_KEY, JSON.stringify(newPosts));
  } catch(e) { console.error(e); }
};

export const getServices = (): ServiceItem[] => {
  const stored = localStorage.getItem(SERVICES_KEY);
  return safeJsonParse(stored, DEFAULT_SERVICES_LIST);
};

export const saveService = (service: ServiceItem) => {
  const services = getServices();
  const existingIndex = services.findIndex((s) => s.id === service.id);
  
  if (existingIndex >= 0) {
    services[existingIndex] = service;
  } else {
    services.push(service);
  }
  
  try {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  } catch(e) { console.error(e); }
};

export const saveAllServices = (services: ServiceItem[]) => {
  try {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  } catch(e) { console.error(e); }
};

export const deleteService = (id: string) => {
  const services = getServices();
  const newServices = services.filter((s) => s.id !== id);
  try {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(newServices));
  } catch(e) { console.error(e); }
};
