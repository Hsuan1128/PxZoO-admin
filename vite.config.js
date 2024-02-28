import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/chd104/g4/admin/" : "/",
  build: {
    outDir: "admin",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:{
    proxy: {
      '/webapi': {
        target: 'https://tibamef2e.com/chd104/g4/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webapi/, ''),
      },
    }
  }
});
