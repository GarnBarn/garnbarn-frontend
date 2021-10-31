import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Index from "@/views/Index.vue";
import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import AssignmentView from "@/views/Assignment.vue";
import Account from "@/views/Account.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/home",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/assignment/:id",
    name: "AssignmentPage",
    component: AssignmentView,
  },
  {
    path: "/account",
    name: "AccountPage",
    component: Account,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
