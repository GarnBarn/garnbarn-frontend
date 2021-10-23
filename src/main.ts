import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import * as firebase from "firebase/app";
import axios, { AxiosResponse } from "axios";

let firebaseConfig: firebase.FirebaseOptions;

try {
  // If the file firebaseConfig.json is found. Use the config from local.
  firebaseConfig = require("@/firebaseConfig.json") as firebase.FirebaseOptions;
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  // If config file not found. Fetch it from GarnBarn Production Environment.
  // We can fetch it directly from Firebase Hosting.
  axios.get("/__/firebase/init.json").then((response: AxiosResponse) => {
    firebase.initializeApp(response.data as firebase.FirebaseOptions);
  });
}

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
