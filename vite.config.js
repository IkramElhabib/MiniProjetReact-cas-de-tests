import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // Ne spécifiez pas setupFiles ici car vitest a déjà son propre mécanisme de setup
  },
});
