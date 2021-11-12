import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "@/assets/css/light-theme.css";
import firebase from "firebase/app";
import "firebase/auth";
// Please create the file firebaseConfig.json that contain
// the firebase config. You can get it from firebase project.
import firebaseConfig from "@/firebaseConfig.json";

Vue.use(VueMaterial);
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
