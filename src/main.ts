import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import firebase from "firebase";
import axios, { AxiosResponse } from "axios";

Vue.use(VueMaterial);
let firebaseConfig: firebase.app.App;
try {
  // If the file firebaseConfig.json is found. Use the config from local.
  firebaseConfig = require("@/firebaseConfig.json");
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  // If config file not found. Fetch it from GarnBarn Production Environment.
  // We can fetch it directly from Firebase Hosting.
  axios.get("/__/firebase/init.json").then((response: AxiosResponse) => {
    firebase.initializeApp(response.data as firebase.app.App);
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
