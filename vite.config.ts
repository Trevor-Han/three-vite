import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl({
      compress: true,
      watch: true,
      warnDuplicatedImports: false
    })
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap', '@gsap/react'],
          three: ['three'],
          r3f: [
            '@react-three/fiber',
            '@react-three/drei',
            'r3f-perf'
          ],
          chunk: ['leva', '@wtto00/jweixin-esm', 'dingtalk-jsapi'],
          pp: ['@react-three/postprocessing', 'postprocessing']
        }
      }
    }
  },
  esbuild: {
    // drop: ['console', 'debugger']
  }
})
