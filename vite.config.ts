import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
import wasm from "vite-plugin-wasm";
import veauryVitePlugins from "veaury/vite/index.js";

// https://vitejs.dev/config/
// Configure Vite to load a vue appication located in src and ignore intellisense hints from src/react_app
export default defineConfig({
  plugins: [
    // vue(),
    // vueJsx()]
    wasm(),
    veauryVitePlugins({
      type: "vue",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@react": fileURLToPath(new URL("./src/react_app", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4180",
        rewrite: (path: string) => path.replace(/^\/api/, ""),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
