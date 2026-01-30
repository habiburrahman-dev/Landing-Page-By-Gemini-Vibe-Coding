
// Helper to shade a hex color
function adjustColor(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

// Convert hex to rgb
function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Simple mixing function
function mix(color1: string, color2: string, weight: number) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;

  const w = weight / 100;
  const w1 = 1 - w;
  
  const r = Math.round(rgb1.r * w1 + rgb2.r * w);
  const g = Math.round(rgb1.g * w1 + rgb2.g * w);
  const b = Math.round(rgb1.b * w1 + rgb2.b * w);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export const applyTheme = (hexColor: string) => {
  const root = document.documentElement;
  
  // Base is considered 600
  const base = hexColor;

  // Generate palette
  // 50: Very light (mix 95% white)
  const p50 = mix(base, '#ffffff', 95);
  // 100: Light (mix 90% white)
  const p100 = mix(base, '#ffffff', 90);
  // 200: (mix 80% white)
  const p200 = mix(base, '#ffffff', 80);
  // 300: (mix 60% white)
  const p300 = mix(base, '#ffffff', 60);
  // 400: (mix 40% white)
  const p400 = mix(base, '#ffffff', 40);
  
  // 500: Lighter than base (mix 20% white)
  const p500 = mix(base, '#ffffff', 20);
  
  // 600: Base
  const p600 = base;
  
  // 700: Darker (mix 10% black)
  const p700 = mix(base, '#000000', 10);
  
  // 800: Darker
  const p800 = mix(base, '#000000', 20);
  
  // 900: Darkest (Footer)
  const p900 = mix(base, '#000000', 40);
  const p950 = mix(base, '#000000', 60);

  root.style.setProperty('--primary-50', p50);
  root.style.setProperty('--primary-100', p100);
  root.style.setProperty('--primary-200', p200);
  root.style.setProperty('--primary-300', p300);
  root.style.setProperty('--primary-400', p400);
  root.style.setProperty('--primary-500', p500);
  root.style.setProperty('--primary-600', p600);
  root.style.setProperty('--primary-700', p700);
  root.style.setProperty('--primary-800', p800);
  root.style.setProperty('--primary-900', p900);
  root.style.setProperty('--primary-950', p950);
};

export const PRESET_COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Red', value: '#ff3b3b' },
  { name: 'Green', value: '#00b050' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Teal', value: '#0d9488' },
];
