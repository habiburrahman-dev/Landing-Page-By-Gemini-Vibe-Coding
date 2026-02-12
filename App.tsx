
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PublicLayout } from './components/PublicLayout';
import { AdminLayout } from './components/AdminLayout';
import { HomePage, BlogPage, ServicesPage, AboutPage, AppointmentPage, BlogPostPage } from './pages/PublicPages';
import { Dashboard, SettingsForm, BlogManager, ServicesManager } from './pages/AdminPages';
import { 
  getSettings, saveSettings, 
  getBlogPosts, saveBlogPost, deleteBlogPost,
  getServices, saveService, deleteService,
  verifyAdminLogin, updateAdminCredentials
} from './services/storage';
import { SiteSettings, BlogPost, ServiceItem } from './types';
import { Icons } from './components/Icons';
import { applyTheme } from './services/themeUtils';
import { applyFont } from './services/fontUtils';

// Use a simple hash-based router for SPA behavior without backend routing support for frontend assets
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
  
  // App State - Initialized as empty/loading
  const [loading, setLoading] = useState(true);
  const [settings, setSettingsState] = useState<SiteSettings | null>(null);
  const [posts, setPostsState] = useState<BlogPost[]>([]);
  const [services, setServicesState] = useState<ServiceItem[]>([]);
  
  // Load Data from API on Mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedSettings, fetchedPosts, fetchedServices] = await Promise.all([
          getSettings(),
          getBlogPosts(),
          getServices()
        ]);
        
        setSettingsState(fetchedSettings);
        setPostsState(fetchedPosts);
        setServicesState(fetchedServices);
      } catch (error) {
        console.error("Failed to load application data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // User Preferences State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync language with settings
  useEffect(() => {
    if (!settings) return;
    const savedLang = localStorage.getItem('kmm_lang');
    if (!savedLang && settings.defaultLanguage && i18n.language !== settings.defaultLanguage) {
      i18n.changeLanguage(settings.defaultLanguage);
    }
  }, [settings, i18n]);

  // Inject Stored Translations
  useEffect(() => {
    if (!settings) return;

    if (settings.translations) {
      i18n.addResourceBundle('id', 'translation', settings.translations.id, true, true);
      i18n.addResourceBundle('en', 'translation', settings.translations.en, true, true);
    }

    const idServices: Record<string, any> = {};
    const enServices: Record<string, any> = {};

    services.forEach(service => {
      if (service.translations) {
        idServices[service.id] = service.translations.id;
        enServices[service.id] = service.translations.en;
      }
    });

    if (Object.keys(idServices).length > 0) i18n.addResourceBundle('id', 'translation', { services: idServices }, true, true);
    if (Object.keys(enServices).length > 0) i18n.addResourceBundle('en', 'translation', { services: enServices }, true, true);

    const idPosts: Record<string, any> = {};
    const enPosts: Record<string, any> = {};

    posts.forEach(post => {
      if (post.translations) {
        idPosts[post.id] = post.translations.id;
        enPosts[post.id] = post.translations.en;
      }
    });

    if (Object.keys(idPosts).length > 0) i18n.addResourceBundle('id', 'translation', { posts: idPosts }, true, true);
    if (Object.keys(enPosts).length > 0) i18n.addResourceBundle('en', 'translation', { posts: enPosts }, true, true);
    
    i18n.changeLanguage(i18n.language);

  }, [settings, services, posts, i18n]);

  // Styling Effects
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

  useEffect(() => {
    if (settings?.themeColor) applyTheme(settings.themeColor);
  }, [settings?.themeColor]);

  useEffect(() => {
    if (settings?.fontFamily) applyFont(settings.fontFamily);
  }, [settings?.fontFamily]);

  useEffect(() => {
    if (!settings) return;
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = settings.faviconUrl || settings.logoUrl;
  }, [settings?.faviconUrl, settings?.logoUrl]);
  
  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'settings' | 'blog' | 'services'>('dashboard');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Handlers (Now Async)
  const handleSaveSettings = async (newSettings: SiteSettings) => {
    await saveSettings(newSettings);
    // Refresh
    const updated = await getSettings();
    setSettingsState(updated);
  };

  const handleSavePost = async (post: BlogPost) => {
    await saveBlogPost(post);
    const updated = await getBlogPosts();
    setPostsState(updated);
  };

  const handleDeletePost = async (id: string) => {
    await deleteBlogPost(id);
    const updated = await getBlogPosts();
    setPostsState(updated);
  };

  const handleSaveService = async (service: ServiceItem) => {
    await saveService(service);
    const updated = await getServices();
    setServicesState(updated);
  };

  const handleDeleteService = async (id: string) => {
    await deleteService(id);
    const updated = await getServices();
    setServicesState(updated);
  };

  const handleUpdateCredentials = async (email: string, password?: string) => {
    await updateAdminCredentials(email, password);
    alert("Credentials updated successfully");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const success = await verifyAdminLogin(loginEmail, loginPassword);
      if (success) {
        setIsAdminLoggedIn(true);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch (err) {
      setLoginError("Connection error.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

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
             <button disabled={isLoggingIn} type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70">
               {isLoggingIn ? 'Verifying...' : 'Sign In'}
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
            adminEmail={loginEmail || 'Admin'}
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
