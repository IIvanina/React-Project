import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: ['react-owl-carousel'], // Ensure react-owl-carousel is included in optimized dependencies
  },
});
