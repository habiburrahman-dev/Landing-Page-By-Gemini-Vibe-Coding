import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Fixes "Module 'crypto' has been externalized" warning.
      // Maps imports of 'crypto' to our local shim.
      crypto: path.resolve(__dirname, 'crypto-shim.ts'),
    },
  },
  define: {
    // Polyfill global for libraries that expect Node.js global variable
    global: 'window',
  },
  build: {
    // Increase the chunk size warning limit to suppress warnings for the intentionally large icons chunk
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Separate large dependencies into their own chunks for better caching and parallel loading
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-i18next', 'i18next'],
          icons: ['lucide-react'], // Lucide is large because we import all icons for the picker
          auth: ['bcryptjs'],
        },
      },
    },
  },
});