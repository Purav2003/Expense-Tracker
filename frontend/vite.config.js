import { defineConfig } from 'vite';
import open from 'open';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    // Port that Vite will use (you can change this to your desired port)
    port: 3000,
    // Hook to run after the server starts
    hmr: {
      // This function will run after the server starts
      after() {
        // Define the URL or file path you want to open
        const urlToOpen = 'http://localhost:3000'; // Change this to your desired URL

        // Open the URL in the default browser
        open(urlToOpen);
      },
    },
  },
});
