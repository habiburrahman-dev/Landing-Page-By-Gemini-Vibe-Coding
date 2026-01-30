
export const GOOGLE_FONTS = [
  { name: 'Inter', value: 'Inter' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Playfair Display', value: 'Playfair Display' },
  { name: 'Merriweather', value: 'Merriweather' },
  { name: 'Nunito', value: 'Nunito' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Quicksand', value: 'Quicksand' },
];

export const applyFont = (fontName: string) => {
  const root = document.documentElement;
  // Fallback to sans-serif if font fails to load or for initial render
  root.style.setProperty('--font-primary', `"${fontName}", sans-serif`);

  // Check if a link tag for dynamic fonts already exists
  const linkId = 'dynamic-font-link';
  let link = document.getElementById(linkId) as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Format the font name for Google Fonts URL (replace spaces with +)
  const formattedName = fontName.replace(/ /g, '+');
  link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@300;400;500;600;700&display=swap`;
};
