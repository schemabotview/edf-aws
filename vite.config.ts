import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/edf-aws/' : '/', plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom', '@xyflow/react'] },
  server: { host: '127.0.0.1', port: 5186, strictPort: true },
}))
