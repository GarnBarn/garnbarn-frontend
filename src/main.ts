import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "@/assets/css/light-theme.css";
import firebase from "firebase/app";
import "firebase/auth";
import Vuetify from "vuetify";
import "@/assets/css/vuetify.css";
// Please create the file firebaseConfig.json that contain
// the firebase config. You can get it from firebase project.
import firebaseConfig from "@/firebaseConfig.json";

Vue.use(Vuetify);
Vue.use(VueMaterial);
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

const vuetify = new Vuetify();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
