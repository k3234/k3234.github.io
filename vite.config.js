import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [vue()],
    define: {
      'import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID': JSON.stringify(env.VITE_CLOUDFLARE_ACCOUNT_ID || 'd035b02e596cd0040690f689d4c640b8'),
      'import.meta.env.VITE_CLOUDFLARE_ZONE_ID': JSON.stringify(env.VITE_CLOUDFLARE_ZONE_ID || '9e74b73ee649f98e0b72907a6e364890'),
    }
  }
})