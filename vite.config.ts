import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    inject({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  define: {
    global: 'window',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  assetsInclude: ['**/*.lottie'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    allowedHosts: ['8e96-45-129-56-225.ngrok-free.app'],
  },
});
