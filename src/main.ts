import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import * as firebase from "firebase/app";
import axios, { AxiosResponse } from "axios";

let firebaseConfig: any;

try {
  // If the file firebaseConfig.json is found. Use the config from local.
  firebaseConfig = require("@/firebaseConfig.json");
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  // If config file not found. Fetch it from GarnBarn Production Environment.
  // We can fetch it directly from Firebase Hosting.
  axios.get("/__/firebase/init.json").then((response: AxiosResponse) => {
    console.log(response.data);
    firebase.initializeApp(JSON.parse(response.data as string));
  });
}

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
