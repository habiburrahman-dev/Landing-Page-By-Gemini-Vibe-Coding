import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteSettings, BlogPost, ServiceItem } from '../types';
import { Icons } from '../components/Icons';

// --- Components used in pages ---

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const IconComponent = (Icons as any)[service.iconName] || Icons.Stethoscope;
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
      <div className="w-14 h-14 bg-primary-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
        <IconComponent size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">{service.description}</p>
      <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 text-sm font-semibold cursor-pointer group-hover:gap-2 transition-all">
        {t('learnMore')} <Icons.ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost; onNavigate: (p: string) => void }> = ({ post, onNavigate }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-800 dark:text-primary-300 uppercase tracking-wide">
          {post.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-400 mb-3">
          <span>{post.publishedAt}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <button onClick={() => onNavigate(`/blog/${post.id}`)} className="text-primary-600 dark:text-primary-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all mt-auto">
          {t('readArticle')} <Icons.ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- Pages ---

interface PageProps {
  settings: SiteSettings;
  posts: BlogPost[];
  services: ServiceItem[];
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<PageProps> = ({ settings, posts, services, onNavigate }) => {
  const { t } = useTranslation();
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 z-0 opacity-10 md:opacity-100 md:relative md:w-1/2 md:float-right h-96 md:h-[600px]">
           <img 
             src={settings.heroImageUrl} 
             alt="Clinic" 
             className="w-full h-full object-cover"
             style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }} 
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent md:from-slate-900 md:via-slate-900/50 md:via-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="md:w-1/2 pt-20 pb-20 md:py-40 flex flex-col justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-sm mb-4">{t('welcome')} {settings.name}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              {settings.tagline}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg leading-relaxed">
              {settings.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('/appointment')} className="bg-primary-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary-700 shadow-xl shadow-primary-200 dark:shadow-none transition-all hover:-translate-y-1">
                {t('bookAppointment')}
              </button>
              <button onClick={() => onNavigate('/services')} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all">
                {t('ourServices')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('comprehensiveServices')}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('servicesDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => onNavigate('/services')} className="inline-flex items-center gap-2 bg-primary-50 dark:bg-slate-800 text-primary-700 dark:text-primary-300 px-6 py-3 rounded-full font-semibold hover:bg-primary-100 dark:hover:bg-slate-700 transition-colors">
              {t('viewAllServices')} <Icons.ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Feature Section */}
      <section className="py-20 bg-primary-900 dark:bg-primary-950 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-800 dark:divide-primary-900">
             <div className="p-6">
               <div className="text-4xl font-bold mb-2">15+</div>
               <div className="text-primary-200">{t('yearsExp')}</div>
             </div>
             <div className="p-6">
               <div className="text-4xl font-bold mb-2">50+</div>
               <div className="text-primary-200">{t('specialists')}</div>
             </div>
             <div className="p-6">
               <div className="text-4xl font-bold mb-2">24/7</div>
               <div className="text-primary-200">{t('emergencySupport')}</div>
             </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('latestTips')}</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl">{t('latestTipsDesc')}</p>
            </div>
            <button onClick={() => onNavigate('/blog')} className="hidden md:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300">
              {t('viewAllArticles')} <Icons.ArrowRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} onNavigate={onNavigate} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <button onClick={() => onNavigate('/blog')} className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700">
              {t('viewAllArticles')} <Icons.ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{t('needAttention')}</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
              {t('emergencyDesc')}
            </p>
            <a href={`tel:${settings.phone}`} className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition-all hover:-translate-y-1">
               <Icons.Phone size={24} />
               {t('callEmergency')}: {settings.phone}
            </a>
         </div>
      </section>
    </>
  );
};

export const ServicesPage: React.FC<{ services: ServiceItem[] }> = ({ services }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('ourServices')}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('servicesDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogPage: React.FC<{ posts: BlogPost[]; onNavigate: (p: string) => void }> = ({ posts, onNavigate }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('blog')}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t('latestTipsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {posts.map((post) => (
             <BlogCard key={post.id} post={post} onNavigate={onNavigate} />
           ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center text-slate-500 dark:text-slate-400 py-20">
             No blog posts found. Check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export const AboutPage: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const mapSrc = `https://maps.google.com/maps?q=${settings.latitude},${settings.longitude}&z=15&output=embed`;
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-slate-50 dark:bg-slate-800 py-16 border-b border-slate-200 dark:border-slate-700">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('aboutUs')}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {t('ourStoryDesc')}
            </p>
         </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Info */}
            <div className="space-y-8">
               <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('ourStory')}</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {settings.description}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                    Founded with a vision to provide accessible and high-quality healthcare, {settings.name} has grown to become a trusted medical center in the community. Our team of dedicated professionals is here to support your journey to better health.
                  </p>
               </div>

               <div className="bg-primary-50 dark:bg-slate-800 p-8 rounded-2xl border border-primary-100 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('contactInfo')}</h3>
                  <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="bg-primary-600 text-white p-2 rounded-lg shrink-0">
                           <Icons.MapPin size={20} />
                        </div>
                        <div>
                           <p className="font-semibold text-slate-900 dark:text-white">{t('address')}</p>
                           <p className="text-slate-600 dark:text-slate-300">{settings.address}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary-600 text-white p-2 rounded-lg shrink-0">
                           <Icons.Phone size={20} />
                        </div>
                        <div>
                           <p className="font-semibold text-slate-900 dark:text-white">{t('phone')}</p>
                           <p className="text-slate-600 dark:text-slate-300">{settings.phone}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary-600 text-white p-2 rounded-lg shrink-0">
                           <Icons.Mail size={20} />
                        </div>
                        <div>
                           <p className="font-semibold text-slate-900 dark:text-white">{t('email')}</p>
                           <p className="text-slate-600 dark:text-slate-300">{settings.email}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Map */}
            <div className="h-full min-h-[500px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 relative">
               <iframe 
                 width="100%" 
                 height="100%" 
                 className="absolute inset-0"
                 frameBorder="0" 
                 scrolling="no" 
                 marginHeight={0} 
                 marginWidth={0} 
                 src={mapSrc}
                 title="Clinic Location"
                 aria-label="Google Map showing clinic location"
               ></iframe>
            </div>

         </div>
      </div>
    </div>
  );
};

export const AppointmentPage: React.FC<{ settings: SiteSettings; services: ServiceItem[] }> = ({ settings, services }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    service: services.length > 0 ? services[0].title : '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp message
    let message = settings.appointmentTemplate || "Hello, I would like to book an appointment.\n\nName: {name}\nService: {service}\nDate: {date}\nTime: {time}\nNotes: {notes}";
    
    message = message.replace('{name}', formData.name)
                     .replace('{service}', formData.service)
                     .replace('{date}', formData.date)
                     .replace('{time}', formData.time)
                     .replace('{notes}', formData.notes);
                     
    // Clean phone number (remove non-digits)
    const phone = settings.phone.replace(/\D/g, '');
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
           
           {/* Left Side: Image/Info */}
           <div className="md:w-5/12 bg-primary-600 dark:bg-primary-800 text-white p-12 flex flex-col justify-between">
              <div>
                 <h2 className="text-3xl font-bold mb-6">{t('bookYourAppointment')}</h2>
                 <p className="text-primary-100 text-lg leading-relaxed mb-8">
                   {t('bookDesc')}
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Icons.Phone className="text-primary-300" />
                       <span>{settings.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Icons.Mail className="text-primary-300" />
                       <span>{settings.email}</span>
                    </div>
                 </div>
              </div>
              <div className="mt-12 text-primary-200 text-sm">
                 {t('emergencyPriority')}
              </div>
           </div>

           {/* Right Side: Form */}
           <div className="md:w-7/12 p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('fullName')}</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder={t('enterName')}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('date')}</label>
                       <input 
                         type="date" 
                         required
                         className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                         value={formData.date}
                         onChange={e => setFormData({...formData, date: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('time')}</label>
                       <input 
                         type="time" 
                         required
                         className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                         value={formData.time}
                         onChange={e => setFormData({...formData, time: e.target.value})}
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('serviceRequired')}</label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                    >
                       {services.map(s => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                       ))}
                       <option value="Other">{t('other')}</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('additionalNotes')}</label>
                    <textarea 
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                      placeholder={t('describeSymptoms')}
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                 </div>

                 <button type="submit" className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-100 dark:shadow-none transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                    {t('bookViaWa')} <Icons.MessageCircle size={20} />
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export const BlogPostPage: React.FC<{ post?: BlogPost; onNavigate: (p: string) => void }> = ({ post, onNavigate }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
         <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('notFound')}</h2>
            <button onClick={() => onNavigate('/blog')} className="text-primary-600 dark:text-primary-400 hover:underline">{t('backToBlog')}</button>
         </div>
      </div>
    );
  }

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative h-[400px] w-full">
         <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-5xl mx-auto">
            <button 
              onClick={() => onNavigate('/blog')} 
              className="mb-6 text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
            >
               <Icons.ArrowRight size={16} className="rotate-180" /> {t('backToBlog')}
            </button>
            <div className="flex items-center gap-4 mb-4">
               <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{post.category}</span>
               <span className="text-white/80 text-sm">{post.publishedAt}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-2 text-white/90">
               <span className="text-sm font-medium">{t('by')} {post.author}</span>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
         <div className="prose prose-lg prose-slate dark:prose-invert mx-auto">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-slate-700 dark:text-slate-300 leading-8">
                {paragraph}
              </p>
            ))}
         </div>

         <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('shareArticle')}</h3>
            <div className="flex gap-4">
               <button onClick={handleShareFacebook} className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors" title="Share on Facebook">
                 <Icons.Facebook size={20} />
               </button>
               <button onClick={handleCopyLink} className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition-colors relative" title="Copy Link">
                 {copied ? <Icons.Check size={20} /> : <Icons.Link size={20} />}
               </button>
               <button onClick={handleShareWhatsApp} className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors" title="Share on WhatsApp">
                 <Icons.MessageCircle size={20} />
               </button>
            </div>
         </div>
      </div>
    </article>
  );
};