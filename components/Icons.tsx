
import * as LucideIcons from 'lucide-react';

// Create aliases for backward compatibility with code that used specific names
// defined in the previous manual export list.
const Aliases = {
  Dashboard: LucideIcons.LayoutDashboard,
  Article: LucideIcons.FileText,
  Logout: LucideIcons.LogOut,
  Delete: LucideIcons.Trash2,
  // Add common aliases that might have been used or are intuitive
  Settings: LucideIcons.Settings,
};

// Export all icons + aliases
export const Icons = {
  ...LucideIcons,
  ...Aliases
};

// Export keys for the icon picker. 
// Filter to include only valid Lucide components (Capitalized) and exclude internal utilities.
export const IconKeys = Object.keys(LucideIcons).filter(key => 
  key !== 'createLucideIcon' && 
  key !== 'default' && 
  key !== 'lucide-react' &&
  /^[A-Z]/.test(key)
);
