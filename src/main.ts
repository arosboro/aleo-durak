import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

const app = createApp(App);

app.component("RouterLink", () => import("vue-router"));
app.component("RouterView", () => import("vue-router"));
app.component("IntroMessage", () => import("./components/IntroMessage.vue"));

app.use(createPinia());
app.use(router);

app.mount("#app");
