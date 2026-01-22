import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const isDemo = process.env.VITE_DEMO === 'true';

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 80,
  },
  plugins: [react()],
  build: {
    lib: isDemo
      ? undefined
      : {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'TelegramLoginReact',
        formats: ['es', 'umd'],
        fileName: (format) => `telegram-login-react.${format}.js`,
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