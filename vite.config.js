import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public", // Ensures manifest.json & icons are copied
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: "index.html" // Ensure popup.html is included
      },
      output: {
        entryFileNames: "popup.js"
      }
    }
  }
});
