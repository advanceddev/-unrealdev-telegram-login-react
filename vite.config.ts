import react from '@vitejs/plugin-react';
import { resolve } from 'path'
import Sonda from 'sonda/vite';
import { defineConfig } from 'vite';

const isDemo = process.env.VITE_DEMO === 'true';

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 80,
  },
  plugins: [react(), Sonda()],
  build: {
    // sourcemap: true, // for Sonda() using only
    lib: isDemo
      ? undefined
      : {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'TelegramLoginReact',
        formats: ['es', 'cjs'],
        fileName: (format) => {
          if (format === 'es') return 'telegram-login-react.es.js';
          if (format === 'cjs') return 'telegram-login-react.cjs';
          return 'telegram-login-react.js';
        },
      },
    rolldownOptions: isDemo
      ? {}
      : {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
  },
  define: {
    'process.env.NODE_ENV': '"development"',
  },
});