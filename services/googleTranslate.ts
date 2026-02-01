
/**
 * Service to handle translations using Google Translate API.
 * Note: We are using the 'gtx' client endpoint which allows for basic translation tasks 
 * directly from the browser for this prototype.
 */
export const translateText = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  if (!text) return '';
  if (sourceLang === targetLang) return text;

  try {
    // We use encodeURIComponent to ensure special characters don't break the URL
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // The API returns a nested array structure. 
    // data[0] contains the translation segments.
    // Each segment is an array where index 0 is the translated text.
    if (data && data[0]) {
      return data[0].map((segment: any) => segment[0]).join('');
    }

    return text; // Fallback to original text if structure doesn't match
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text on failure so data isn't lost
  }
};
