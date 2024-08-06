import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pantry-Tracker/',
  plugins: [react()],
  build: {
    outDir: 'dist', // This should be set to 'dist'
    rollupOptions: {
      input: {
        main: 'src/main.jsx', // Ensure this points to your main entry file
      },
    },
  },
});
