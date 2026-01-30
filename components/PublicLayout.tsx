import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteSettings } from '../types';
import { Icons } from './Icons';

interface PublicLayoutProps {
  children: React.ReactNode;
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children, 
  settings, 
  onNavigate, 
  isDarkMode,
  toggleDarkMode 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('kmm_lang', newLang);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Top Bar - Added z-[60] to ensure dropdown appears above sticky header */}
      <div className="bg-primary-900 dark:bg-slate-950 text-white py-2 px-4 text-sm hidden md:block relative z-[60]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center gap-2"><Icons.Phone size={14} /> {settings.phone}</span>
            <span className="flex items-center gap-2"><Icons.Mail size={14} /> {settings.email}</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4 border-r border-primary-800 pr-6">
              <span className="hover:text-primary-200 cursor-pointer flex items-center gap-1"><Icons.Facebook size={14} /> Facebook</span>
              <span className="hover:text-primary-200 cursor-pointer flex items-center gap-1"><Icons.Instagram size={14} /> Instagram</span>
            </div>
            
            {/* Preferences */}
            <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode} className="text-primary-200 hover:text-white transition-colors" aria-label="Toggle Dark Mode">
                {isDarkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />} 
              </button>
              
              {/* Language Switcher */}
              <div className="relative" ref={langMenuRef}>
                  <button 
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-1 cursor-pointer text-xs font-medium focus:outline-none"
                  >
                      {currentLang === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
                      <Icons.ChevronRight size={12} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isLangMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-100 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in duration-100">
                        <button 
                          onClick={() => handleLanguageChange('id')} 
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 dark:hover:bg-slate-700 ${currentLang === 'id' ? 'text-primary-600 font-bold bg-gray-50 dark:bg-slate-700' : 'text-gray-700 dark:text-slate-200'}`}
                        >
                           🇮🇩 Bahasa Indonesia
                        </button>
                        <button 
                          onClick={() => handleLanguageChange('en')} 
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-50 dark:hover:bg-slate-700 ${currentLang === 'en' ? 'text-primary-600 font-bold bg-gray-50 dark:bg-slate-700' : 'text-gray-700 dark:text-slate-200'}`}
                        >
                           🇺🇸 English
                        </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
               <img src={settings.logoUrl} alt="Logo" className="h-10 w-10 mr-3 object-contain" />
               <div>
                 <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">{settings.name}</h1>
                 <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">HEALTHCARE CENTER</p>
               </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center">
              <button onClick={() => onNavigate('/')} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">{t('home')}</button>
              <button onClick={() => onNavigate('/services')} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">{t('ourServices')}</button>
              <button onClick={() => onNavigate('/about')} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">{t('aboutUs')}</button>
              <button onClick={() => onNavigate('/blog')} className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">{t('blog')}</button>
              
              <button 
                onClick={() => onNavigate('/admin')} 
                className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-2"
                title={t('adminLogin')}
              >
                <Icons.LogIn size={20} />
              </button>
              
              <button onClick={() => onNavigate('/appointment')} className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none transition-all hover:-translate-y-0.5">
                {t('bookAppointment')}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleDarkMode} className="text-slate-600 dark:text-slate-300">
                {isDarkMode ? <Icons.Sun size={24} /> : <Icons.Moon size={24} />} 
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-300">
                {isMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => { setIsMenuOpen(false); onNavigate('/'); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">{t('home')}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigate('/services'); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">{t('ourServices')}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigate('/about'); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">{t('aboutUs')}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigate('/blog'); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">{t('blog')}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigate('/appointment'); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">{t('bookAppointment')}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigate('/admin'); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">{t('adminLogin')}</button>
              
              <div className="px-3 py-3 border-t border-gray-100 dark:border-slate-800 mt-2">
                 <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">Language Preference:</p>
                 <div className="flex gap-2">
                    <button 
                        onClick={() => handleLanguageChange('id')}
                        className={`px-3 py-1.5 rounded-md text-sm ${currentLang === 'id' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                    >
                        🇮🇩 Indonesia
                    </button>
                    <button 
                        onClick={() => handleLanguageChange('en')}
                        className={`px-3 py-1.5 rounded-md text-sm ${currentLang === 'en' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}`}
                    >
                        🇺🇸 English
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 dark:bg-black text-slate-300 pt-16 pb-8 border-t dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center text-white mb-6">
              <img src={settings.logoUrl} alt="Logo" className="h-8 w-8 mr-3 brightness-0 invert" />
              <span className="text-lg font-bold">{settings.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              {settings.description}
            </p>
            <div className="flex space-x-4">
              <a href={settings.facebookUrl} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary-600 transition-colors flex items-center justify-center"><Icons.Facebook size={16} /></a>
              <a href={settings.instagramUrl} className="w-8 h-8 rounded-full bg-slate-800 hover:bg-pink-600 transition-colors flex items-center justify-center"><Icons.Instagram size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('/')} className="hover:text-primary-400 transition-colors">{t('home')}</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-primary-400 transition-colors">{t('aboutUs')}</button></li>
              <li><button onClick={() => onNavigate('/services')} className="hover:text-primary-400 transition-colors">{t('ourServices')}</button></li>
              <li><button onClick={() => onNavigate('/blog')} className="hover:text-primary-400 transition-colors">{t('blog')}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">{t('ourServices')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-primary-400 transition-colors cursor-pointer" onClick={() => onNavigate('/services')}>General Checkup</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer" onClick={() => onNavigate('/services')}>Dental Care</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer" onClick={() => onNavigate('/services')}>Pediatrics</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer" onClick={() => onNavigate('/services')}>Cardiology</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">{t('contactInfo')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Icons.MapPin size={18} className="text-primary-500 mt-0.5 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icons.Phone size={18} className="text-primary-500 shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icons.Mail size={18} className="text-primary-500 shrink-0" />
                <span>{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {settings.name}. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
};