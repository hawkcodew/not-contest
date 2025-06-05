import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

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
    include: ['buffer'],
  },
  assetsInclude: ['**/*.lottie'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      buffer: 'buffer',
    },
  },
  server: {
    allowedHosts: ['8e96-45-129-56-225.ngrok-free.app'],
  },
});
