import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Адрес вашего Go-бэкенда (например, http://localhost:8080)
const backendUrl = 'http://localhost:8080';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ''), // Удаляем префикс /api перед отправкой
      },
    }
  },
 
})