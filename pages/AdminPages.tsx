
import React, { useState, useEffect } from 'react';
import { SiteSettings, BlogPost, ServiceItem } from '../types';
import { Icons, IconKeys } from '../components/Icons';
import { PRESET_COLORS } from '../services/themeUtils';
import { GOOGLE_FONTS } from '../services/fontUtils';

// --- Reusable Admin Components ---

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>
    <input
      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white text-gray-900 dark:bg-slate-700 dark:text-white"
      {...props}
    />
  </div>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>
    <textarea
      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white text-gray-900 dark:bg-slate-700 dark:text-white"
      rows={4}
      {...props}
    />
  </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>
    <select
      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white text-gray-900 dark:bg-slate-700 dark:text-white"
      {...props}
    >
      {children}
    </select>
  </div>
);

// --- Admin Sub-Pages ---

export const Dashboard: React.FC<{ postsCount: number; servicesCount: number }> = ({ postsCount, servicesCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 rounded-lg">
          <Icons.Article size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Total Posts</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{postsCount}</h3>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-teal-100 dark:bg-slate-700 text-teal-600 dark:text-teal-400 rounded-lg">
          <Icons.Stethoscope size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Services</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{servicesCount}</h3>
        </div>
      </div>
    </div>
    
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-100 dark:bg-slate-700 text-purple-600 dark:text-purple-400 rounded-lg">
          <Icons.Smile size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Admin</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Logged In</h3>
        </div>
      </div>
    </div>
  </div>
);

interface SettingsFormProps {
  settings: SiteSettings;
  onSave: (s: SiteSettings) => void;
  adminEmail: string;
  onUpdateCredentials: (email: string, password?: string) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, adminEmail, onUpdateCredentials }) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [success, setSuccess] = useState(false);

  // Security Form State
  const [secEmail, setSecEmail] = useState(adminEmail);
  const [secNewPass, setSecNewPass] = useState('');
  const [secConfirmPass, setSecConfirmPass] = useState('');
  const [secError, setSecError] = useState('');
  const [secSuccess, setSecSuccess] = useState(false);

  useEffect(() => {
    setSecEmail(adminEmail);
  }, [adminEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecError('');
    setSecSuccess(false);

    if (secNewPass && secNewPass !== secConfirmPass) {
      setSecError("New passwords do not match.");
      return;
    }

    if (!secEmail.includes('@')) {
      setSecError("Invalid email address.");
      return;
    }

    onUpdateCredentials(secEmail, secNewPass || undefined);
    setSecNewPass('');
    setSecConfirmPass('');
    setSecSuccess(true);
    setTimeout(() => setSecSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
         <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 rounded-t-xl">
           <h2 className="font-semibold text-gray-800 dark:text-white">General Settings</h2>
         </div>
         
         <form onSubmit={handleSubmit} className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Input label="Clinic Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             <Input label="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
             <Input label="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
             <Input label="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
           </div>
           
           <div className="mt-4">
               <Input label="Tagline" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} placeholder="e.g., Your Trusted Health Partner" />
               <TextArea label="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe your clinic..." />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-4">
              <div>
                 <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-4 border-b dark:border-slate-700 pb-2">Location (Map)</h3>
                 <Input label="Latitude" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} placeholder="-6.2088" />
                 <Input label="Longitude" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} placeholder="106.8456" />
              </div>
              <div>
                 <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-4 border-b dark:border-slate-700 pb-2">Images & Socials</h3>
                 <Input label="Logo URL" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} />
                 <Input label="Favicon URL" value={formData.faviconUrl || ''} onChange={e => setFormData({...formData, faviconUrl: e.target.value})} placeholder="URL for browser tab icon" />
                 <Input label="Hero Image URL" value={formData.heroImageUrl} onChange={e => setFormData({...formData, heroImageUrl: e.target.value})} />
                 <Input label="Facebook URL" value={formData.facebookUrl} onChange={e => setFormData({...formData, facebookUrl: e.target.value})} />
                 <Input label="Instagram URL" value={formData.instagramUrl} onChange={e => setFormData({...formData, instagramUrl: e.target.value})} />
              </div>
           </div>

           <div className="border-t dark:border-slate-700 pt-6 mb-6">
               <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-4">Appearance</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Theme Color</label>
                     <div className="flex flex-wrap gap-3 mb-3">
                       {PRESET_COLORS.map(color => (
                         <button
                           key={color.value}
                           type="button"
                           onClick={() => setFormData({...formData, themeColor: color.value})}
                           className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${formData.themeColor === color.value ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent'}`}
                           style={{ backgroundColor: color.value }}
                           title={color.name}
                         >
                           {formData.themeColor === color.value && <Icons.Check size={14} className="text-white drop-shadow-md" />}
                         </button>
                       ))}
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-slate-400">Custom Hex:</span>
                        <input 
                           type="color" 
                           value={formData.themeColor} 
                           onChange={e => setFormData({...formData, themeColor: e.target.value})}
                           className="h-8 w-14 p-0 border-0 rounded cursor-pointer"
                        />
                        <input 
                           type="text" 
                           value={formData.themeColor} 
                           onChange={e => setFormData({...formData, themeColor: e.target.value})}
                           className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded bg-white text-gray-900 dark:bg-slate-700 dark:text-white"
                        />
                     </div>
                  </div>

                  <div>
                     <Select 
                       label="Typography" 
                       value={formData.fontFamily} 
                       onChange={e => setFormData({...formData, fontFamily: e.target.value})}
                     >
                        {GOOGLE_FONTS.map(font => (
                           <option key={font.value} value={font.value}>{font.name}</option>
                        ))}
                     </Select>
                     <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600">
                        <p className="text-sm text-gray-600 dark:text-slate-300" style={{ fontFamily: formData.fontFamily }}>
                          The quick brown fox jumps over the lazy dog.
                          <br/>
                          <strong>Bold Text Example</strong>
                        </p>
                     </div>
                  </div>
               </div>

               <div className="mt-6">
                  <Select 
                    label="Default Language" 
                    value={formData.defaultLanguage} 
                    onChange={e => setFormData({...formData, defaultLanguage: e.target.value as 'id' | 'en'})}
                  >
                     <option value="id">Bahasa Indonesia</option>
                     <option value="en">English (US)</option>
                  </Select>
               </div>
           </div>

           <div className="border-t dark:border-slate-700 pt-6">
             <h3 className="text-sm font-medium text-gray-900 dark:text-slate-200 mb-4">WhatsApp Appointment Settings</h3>
             <TextArea 
               label="Message Template" 
               value={formData.appointmentTemplate} 
               onChange={e => setFormData({...formData, appointmentTemplate: e.target.value})} 
               rows={5}
             />
             <p className="text-xs text-gray-500 dark:text-slate-400 mt-[-10px] mb-4">
               Available placeholders: {'{name}'}, {'{service}'}, {'{date}'}, {'{time}'}, {'{notes}'}
             </p>
           </div>

           <div className="mt-6 flex items-center gap-4">
             <button type="submit" className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors">
               <Icons.Save size={18} />
               Save Site Settings
             </button>
             {success && <span className="text-green-600 font-medium animate-pulse">Settings saved successfully!</span>}
           </div>
         </form>
      </div>

      {/* Admin Account Security */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-red-50 dark:bg-red-900/20 rounded-t-xl">
           <h2 className="font-semibold text-red-800 dark:text-red-200 flex items-center gap-2">
             <Icons.Settings size={18} /> Admin Account Security
           </h2>
        </div>
        <form onSubmit={handleSecuritySubmit} className="p-6">
          <Input 
            label="Admin Email" 
            type="email" 
            value={secEmail} 
            onChange={e => setSecEmail(e.target.value)} 
            required 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="New Password" 
              type="password" 
              value={secNewPass} 
              onChange={e => setSecNewPass(e.target.value)} 
              placeholder="Leave blank to keep current" 
            />
            <Input 
              label="Confirm New Password" 
              type="password" 
              value={secConfirmPass} 
              onChange={e => setSecConfirmPass(e.target.value)} 
              placeholder="Confirm new password"
            />
          </div>
          
          {secError && (
             <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-lg border border-red-100 dark:border-red-800">
               {secError}
             </div>
          )}

          <div className="mt-2 flex items-center gap-4">
             <button type="submit" className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 font-medium transition-colors">
               <Icons.Save size={18} />
               Update Credentials
             </button>
             {secSuccess && <span className="text-green-600 font-medium animate-pulse">Credentials updated successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export const ServicesManager: React.FC<{ services: ServiceItem[]; onSave: (s: ServiceItem) => void; onDelete: (id: string) => void }> = ({ services, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ServiceItem | null>(null);

  const handleEdit = (service: ServiceItem) => {
    setEditForm(service);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditForm({
      id: Date.now().toString(),
      title: '',
      description: '',
      iconName: 'Stethoscope',
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm) {
      onSave(editForm);
      setIsEditing(false);
      setEditForm(null);
    }
  };

  if (isEditing && editForm) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 rounded-t-xl">
           <h2 className="font-semibold text-gray-800 dark:text-white">{editForm.title ? 'Edit Service' : 'New Service'}</h2>
           <button onClick={() => setIsEditing(false)} className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"><Icons.X size={20}/></button>
        </div>
        <form onSubmit={handleSave} className="p-6">
          <Input label="Service Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} required placeholder="e.g. Poli Umum" />
          <TextArea label="Description" rows={3} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} required placeholder="Description of the service..." />
          
          <Select label="Icon" value={editForm.iconName} onChange={e => setEditForm({...editForm, iconName: e.target.value})}>
             {IconKeys.map((key) => (
               <option key={key} value={key}>{key}</option>
             ))}
          </Select>

          <div className="flex items-center gap-2 mb-6">
             <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Preview:</span>
             <div className="w-10 h-10 bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center">
                {React.createElement((Icons as any)[editForm.iconName] || Icons.Stethoscope, { size: 24 })}
             </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Service</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Medical Services</h2>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium">
          <Icons.Plus size={18} />
          New Service
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 dark:bg-slate-700 text-primary-600 dark:text-primary-400 rounded-lg">
                      {React.createElement((Icons as any)[service.iconName] || Icons.Stethoscope, { size: 18 })}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">{service.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400 max-w-md truncate">{service.description}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(service)} className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"><Icons.Edit size={18} /></button>
                  <button onClick={() => { if(window.confirm('Are you sure?')) onDelete(service.id); }} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"><Icons.Delete size={18} /></button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500 dark:text-slate-400">No services found. Add one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const BlogManager: React.FC<{ posts: BlogPost[]; onSave: (p: BlogPost) => void; onDelete: (id: string) => void }> = ({ posts, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<BlogPost | null>(null);

  const handleEdit = (post: BlogPost) => {
    setEditForm(post);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditForm({
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      category: 'Health',
      coverImageUrl: 'https://images.unsplash.com/photo-1579684385183-1b60fe766338?auto=format&fit=crop&q=80&w=800',
      publishedAt: new Date().toISOString().split('T')[0],
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm) {
      onSave(editForm);
      setIsEditing(false);
      setEditForm(null);
    }
  };

  if (isEditing && editForm) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 rounded-t-xl">
           <h2 className="font-semibold text-gray-800 dark:text-white">{editForm.title ? 'Edit Post' : 'New Post'}</h2>
           <button onClick={() => setIsEditing(false)} className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"><Icons.X size={20}/></button>
        </div>
        <form onSubmit={handleSave} className="p-6">
          <Input label="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} required />
          <TextArea label="Excerpt" value={editForm.excerpt} onChange={e => setEditForm({...editForm, excerpt: e.target.value})} required />
          <TextArea label="Content" rows={8} value={editForm.content} onChange={e => setEditForm({...editForm, content: e.target.value})} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
             <Input label="Author" value={editForm.author} onChange={e => setEditForm({...editForm, author: e.target.value})} required />
             <Input label="Category" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} required />
             <Input label="Cover Image URL" value={editForm.coverImageUrl} onChange={e => setEditForm({...editForm, coverImageUrl: e.target.value})} required />
             <Input label="Publish Date" type="date" value={editForm.publishedAt} onChange={e => setEditForm({...editForm, publishedAt: e.target.value})} required />
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Post</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Blog Posts</h2>
        <button onClick={handleCreate} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium">
          <Icons.Plus size={18} />
          New Post
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">{post.author}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">{post.publishedAt}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(post)} className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"><Icons.Edit size={18} /></button>
                  <button onClick={() => { if(window.confirm('Are you sure?')) onDelete(post.id); }} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"><Icons.Delete size={18} /></button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-slate-400">No blog posts found. Create one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};