import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/nfl-api': {
        target: 'https://api.sportsdata.io/v3/nfl/scores/json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nfl-api/, ''),
      },
    },
  },
})
