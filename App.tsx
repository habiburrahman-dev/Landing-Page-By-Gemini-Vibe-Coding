import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PublicLayout } from './components/PublicLayout';
import { AdminLayout } from './components/AdminLayout';
import { HomePage, BlogPage, ServicesPage, AboutPage, AppointmentPage, BlogPostPage } from './pages/PublicPages';
import { Dashboard, SettingsForm, BlogManager, ServicesManager } from './pages/AdminPages';
import { getSettings, saveSettings, getBlogPosts, saveBlogPost, deleteBlogPost, getServices, saveService, deleteService } from './services/storage';
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
  
  // App State (Simulating DB)
  const [settings, setSettingsState] = useState<SiteSettings>(getSettings());
  const [posts, setPostsState] = useState<BlogPost[]>(getBlogPosts());
  const [services, setServicesState] = useState<ServiceItem[]>(getServices());
  
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
  
  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'settings' | 'blog' | 'services'>('dashboard');

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
           <form onSubmit={(e) => { e.preventDefault(); setIsAdminLoggedIn(true); }} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
               <input type="email" defaultValue="admin@mitramedika.co.id" className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white text-gray-900 dark:bg-slate-700 dark:text-white" />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password</label>
               <input type="password" defaultValue="password" className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white text-gray-900 dark:bg-slate-700 dark:text-white" />
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
        {activeAdminTab === 'settings' && <SettingsForm settings={settings} onSave={handleSaveSettings} />}
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