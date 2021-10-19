import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Index from "@/views/Index.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/home",
    name: "HomePage",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
