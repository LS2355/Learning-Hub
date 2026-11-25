import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Learning-Hub/',
  server: {
    host: '127.0.0.1',
    port: 8008,
    strictPort: true
  }
})
