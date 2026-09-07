import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Point to './src' instead of the root '.' to prevent watcher loops
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR === 'true' ? false : {
        host: 'localhost', // Forces HMR WebSocket to connect to localhost, not 0.0.0.0
        protocol: 'ws',
      },
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
      },
    },
  };
});