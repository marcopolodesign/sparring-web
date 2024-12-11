import react from '@vitejs/plugin-react';
import { loadEnv, defineConfig } from 'vite';
import process from 'process';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // If needed for build-time configuration, use env directly.
console.log('Loaded environment variables:', env);

  console.log(import.meta.env, 'META ENV');

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    define: {
      // Make all VITE_ variables available globally
      'process.env': env,
    },
  };
});