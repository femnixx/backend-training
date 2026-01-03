import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import EnvCompatible from 'vite-plugin-env-compatible'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    EnvCompatible(),
    tsconfigPaths()
  ],
  server: { 
    fs: { 
      allow: ['..']
    }
  }
})
