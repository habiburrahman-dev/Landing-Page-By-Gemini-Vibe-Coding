import React from 'react';
import { Icons } from './Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'settings' | 'blog' | 'services';
  setActiveTab: (tab: 'dashboard' | 'settings' | 'blog' | 'services') => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  onLogout,
  isDarkMode,
  toggleDarkMode
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center gap-2">
           <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
           <span className="font-bold text-gray-800 dark:text-white text-lg">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'bg-primary-50 text-primary-700 dark:bg-slate-700 dark:text-primary-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Dashboard size={18} />
            Dashboard
          </button>
          
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
            Content
          </div>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-primary-50 text-primary-700 dark:bg-slate-700 dark:text-primary-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Settings size={18} />
            Site Settings
          </button>
          
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'services' ? 'bg-primary-50 text-primary-700 dark:bg-slate-700 dark:text-primary-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Stethoscope size={18} />
            Services
          </button>
          
          <button
            onClick={() => setActiveTab('blog')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'blog' ? 'bg-primary-50 text-primary-700 dark:bg-slate-700 dark:text-primary-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            <Icons.Article size={18} />
            Blog Posts
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-2">
           <button 
             onClick={toggleDarkMode}
             className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
           >
             {isDarkMode ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
           </button>
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
           >
             <Icons.Logout size={18} />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
        <div className="md:hidden bg-white dark:bg-slate-800 p-4 flex justify-between items-center border-b border-gray-200 dark:border-slate-700 shadow-sm">
          <span className="font-bold text-gray-800 dark:text-white">Admin Panel</span>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="text-slate-600 dark:text-slate-300">
                {isDarkMode ? <Icons.Sun size={20} /> : <Icons.Moon size={20} />} 
            </button>
            <button onClick={onLogout}><Icons.Logout size={20} className="text-gray-500 dark:text-slate-400"/></button>
          </div>
        </div>
        
        <div className="p-8 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};