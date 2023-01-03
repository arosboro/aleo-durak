import { createApp } from "vue";
import { createPinia } from "pinia";
import hljsVuePlugin from "@highlightjs/vue-plugin";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";
import "highlight.js/styles/stackoverflow-light.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(hljsVuePlugin);

app.mount("#app");
