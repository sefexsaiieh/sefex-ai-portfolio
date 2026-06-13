import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:54321', // Supabase Edge Functions local
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/functions/v1'),
      },
    },
  },
  build: {
    sourcemap: false,
  },
})
