import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
import veauryVitePlugins from "veaury/vite/index.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vue(),
    // vueJsx()]
    veauryVitePlugins({
      type: "vue",
      // Configuration of @vitejs/plugin-vue
      vueOptions: {
        jsx: false,
      },
      // Configuration of @vitejs/plugin-react
      reactOptions: {
        fastRefresh: true,
      },
      // Configuration of @vitejs/plugin-vue-jsx
      vueJsxOptions: {
        compositionAPI: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
