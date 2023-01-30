import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DurakView from "../views/DurakView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/durak",
      name: "Дурак",
      component: DurakView,
      props: true,
    },
  ],
});

export default router;
