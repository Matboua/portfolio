import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createChatHandler } from './api/chat'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-chat',
      configureServer(server) {
        const env = loadEnv(mode, server.config.envDir, 'GEMINI_API_KEY')
        const handler = createChatHandler(() => env.GEMINI_API_KEY)
        server.middlewares.use('/api/chat', (request, response) => {
          void handler(request, response)
        })
      },
    },
  ],
}))
