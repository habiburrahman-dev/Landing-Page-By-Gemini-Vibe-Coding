
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PublicLayout } from './components/PublicLayout';
import { AdminLayout } from './components/AdminLayout';
import { HomePage, BlogPage, ServicesPage, AboutPage, AppointmentPage, BlogPostPage } from './pages/PublicPages';
import { Dashboard, SettingsForm, BlogManager, ServicesManager } from './pages/AdminPages';
import { 
  getSettings, saveSettings, 
  getBlogPosts, saveBlogPost, deleteBlogPost, saveAllBlogPosts,
  getServices, saveService, deleteService, saveAllServices,
  getAdminCredentials, saveAdminCredentials
} from './services/storage';
import { verifyPassword } from './services/security';
import { SiteSettings, BlogPost, ServiceItem } from './types';
import { Icons } from './components/Icons';
import { applyTheme } from './services/themeUtils';
import { applyFont } from './services/fontUtils';

// Use a simple hash-based router for SPA behavior without backend
const useHashPath = () => {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');
  
  useEffect(() => {
    const handleHashChange = () => setPath(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newPath: string) => {
    window.location.hash = newPath;
  };

  return { path, navigate };
};

export default function App() {
  const { path, navigate } = useHashPath();
  const { i18n } = useTranslation();
  
  // App State (Simulating DB) - Use Lazy Initialization
  const [settings, setSettingsState] = useState<SiteSettings>(() => getSettings());
  const [posts, setPostsState] = useState<BlogPost[]>(() => getBlogPosts());
  const [services, setServicesState] = useState<ServiceItem[]>(() => getServices());
  const [adminCreds, setAdminCreds] = useState(() => getAdminCredentials());
  
  // User Preferences State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync language with settings if no local preference
  useEffect(() => {
    const savedLang = localStorage.getItem('kmm_lang');
    // If user has not manually set a language preference, use the site setting
    if (!savedLang && settings.defaultLanguage && i18n.language !== settings.defaultLanguage) {
      i18n.changeLanguage(settings.defaultLanguage);
    }
  }, [settings.defaultLanguage, i18n]);

  // Inject Stored Translations into i18next (Settings, Services, Blog)
  useEffect(() => {
    // 1. Inject Site Settings Translations
    if (settings.translations) {
      i18n.addResourceBundle('id', 'translation', settings.translations.id, true, true);
      i18n.addResourceBundle('en', 'translation', settings.translations.en, true, true);
    }

    // 2. Inject Service Translations
    const idServices: Record<string, any> = {};
    const enServices: Record<string, any> = {};

    services.forEach(service => {
      if (service.translations) {
        idServices[service.id] = service.translations.id;
        enServices[service.id] = service.translations.en;
      }
    });

    if (Object.keys(idServices).length > 0) {
      i18n.addResourceBundle('id', 'translation', { services: idServices }, true, true);
    }
    if (Object.keys(enServices).length > 0) {
      i18n.addResourceBundle('en', 'translation', { services: enServices }, true, true);
    }

    // 3. Inject Blog Post Translations
    const idPosts: Record<string, any> = {};
    const enPosts: Record<string, any> = {};

    posts.forEach(post => {
      if (post.translations) {
        idPosts[post.id] = post.translations.id;
        enPosts[post.id] = post.translations.en;
      }
    });

    if (Object.keys(idPosts).length > 0) {
      i18n.addResourceBundle('id', 'translation', { posts: idPosts }, true, true);
    }
    if (Object.keys(enPosts).length > 0) {
      i18n.addResourceBundle('en', 'translation', { posts: enPosts }, true, true);
    }
    
    // Force a re-render/update if the language is currently active
    i18n.changeLanguage(i18n.language);

  }, [settings, services, posts, i18n]);

  // Apply dark mode class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Apply Theme Color
  useEffect(() => {
    applyTheme(settings.themeColor || '#2563eb');
  }, [settings.themeColor]);

  // Apply Font
  useEffect(() => {
    applyFont(settings.fontFamily || 'Inter');
  }, [settings.fontFamily]);

  // Apply Favicon (New)
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    // Use faviconUrl if available, otherwise fallback to logoUrl
    link.href = settings.faviconUrl || settings.logoUrl;
  }, [settings.faviconUrl, settings.logoUrl]);
  
  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'settings' | 'blog' | 'services'>('dashboard');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // handlers
  const handleSaveSettings = (newSettings: SiteSettings) => {
    saveSettings(newSettings);
    setSettingsState(newSettings);
  };

  const handleSavePost = (post: BlogPost) => {
    saveBlogPost(post);
    setPostsState(getBlogPosts()); // refresh from storage
  };

  const handleDeletePost = (id: string) => {
    deleteBlogPost(id);
    setPostsState(getBlogPosts());
  };

  const handleSaveService = (service: ServiceItem) => {
    saveService(service);
    setServicesState(getServices());
  };

  const handleDeleteService = (id: string) => {
    deleteService(id);
    setServicesState(getServices());
  };

  const handleUpdateCredentials = (email: string, password?: string) => {
    // Note: The hashing happens inside SettingsForm in AdminPages now before reaching here
    const newCreds = { email, password: password || adminCreds.password };
    saveAdminCredentials(newCreds);
    setAdminCreds(newCreds);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // 1. Validation for Injection Patterns
    const injectionPattern = /['";\\]|(--)/;
    if (injectionPattern.test(loginEmail) || injectionPattern.test(loginPassword)) {
      setLoginError("Security Alert: Invalid characters detected in input.");
      return;
    }

    // 2. Strict Credential Check using Bcrypt verification
    const isValid = loginEmail === adminCreds.email && verifyPassword(loginPassword, adminCreds.password);

    if (isValid) {
      setIsAdminLoggedIn(true);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  // Admin Login Screen
  if (path === '/admin' && !isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-sm w-full border border-gray-200 dark:border-slate-700">
           <div className="flex justify-center mb-6">
              <div className="bg-primary-600 p-3 rounded-xl text-white">
                <Icons.Dashboard size={32} />
              </div>
           </div>
           <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Admin Login</h2>
           
           {loginError && (
             <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-lg border border-red-200 dark:border-red-800">
               {loginError}
             </div>
           )}

           <form onSubmit={handleLogin} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
               <input 
                 type="email" 
                 value={loginEmail}
                 onChange={(e) => setLoginEmail(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white text-gray-900 dark:bg-slate-700 dark:text-white" 
                 placeholder="Enter admin email"
                 required
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password</label>
               <input 
                 type="password" 
                 value={loginPassword}
                 onChange={(e) => setLoginPassword(e.target.value)}
                 className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white text-gray-900 dark:bg-slate-700 dark:text-white" 
                 placeholder="Enter password"
                 required
               />
             </div>
             <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
               Sign In
             </button>
           </form>
           <button onClick={() => navigate('/')} className="w-full mt-4 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200">
             ← Back to Site
           </button>
        </div>
      </div>
    );
  }

  // Admin Panel
  if (path === '/admin' && isAdminLoggedIn) {
    return (
      <AdminLayout 
        activeTab={activeAdminTab} 
        setActiveTab={setActiveAdminTab} 
        onLogout={() => { setIsAdminLoggedIn(false); navigate('/'); }}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      >
        {activeAdminTab === 'dashboard' && <Dashboard postsCount={posts.length} servicesCount={services.length} />}
        {activeAdminTab === 'settings' && (
          <SettingsForm 
            settings={settings} 
            onSave={handleSaveSettings} 
            adminEmail={adminCreds.email}
            onUpdateCredentials={handleUpdateCredentials}
          />
        )}
        {activeAdminTab === 'services' && <ServicesManager services={services} onSave={handleSaveService} onDelete={handleDeleteService} />}
        {activeAdminTab === 'blog' && <BlogManager posts={posts} onSave={handleSavePost} onDelete={handleDeletePost} />}
      </AdminLayout>
    );
  }

  // Public Pages with Routing Logic
  
  // Check for dynamic routes (e.g. /blog/123)
  const isBlogPost = path.startsWith('/blog/') && path.split('/').length === 3;
  let blogPostId = '';
  if (isBlogPost) {
    blogPostId = path.split('/')[2];
  }

  return (
    <PublicLayout 
      settings={settings} 
      services={services}
      onNavigate={navigate} 
      isDarkMode={isDarkMode}
      toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
    >
      {path === '/' && <HomePage settings={settings} posts={posts} services={services} onNavigate={navigate} />}
      {path === '/services' && <ServicesPage services={services} />}
      {path === '/blog' && <BlogPage posts={posts} onNavigate={navigate} />}
      {path === '/about' && <AboutPage settings={settings} />}
      {path === '/appointment' && <AppointmentPage settings={settings} services={services} />}
      {isBlogPost && <BlogPostPage post={posts.find(p => p.id === blogPostId)} onNavigate={navigate} />}
    </PublicLayout>
  );
}
