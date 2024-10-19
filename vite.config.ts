import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import autoprefixer from "autoprefixer"
import { URL, fileURLToPath } from "node:url"
import tailwind from "tailwindcss"
import { defineConfig } from "vite"
import vueDevTools from "vite-plugin-vue-devtools"

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.privatbank.ua",
        changeOrigin: true,
        secure: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json"
        },
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})
