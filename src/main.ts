import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "@/assets/css/light-theme.css";
import firebase from "firebase";

Vue.use(VueMaterial);
let firebaseConfig: any;
// Please create the file firebaseConfig.json that contain
// the firebase config. You can get it from firebase project.
firebaseConfig = require("@/firebaseConfig.json");
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
