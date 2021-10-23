import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import * as firebase from "firebase/app";
import axios, { AxiosResponse } from "axios";

let firebaseConfig: any;
const DEVELOPMENT_MODE = process.env.NODE_ENV;
if (DEVELOPMENT_MODE === "development") {
  // In Development Mode, We should get the credential from Local File.
  firebaseConfig = require("@/firebaseConfig.json");
  firebase.initializeApp(firebaseConfig);
} else {
  // In GarnBarn Production Environment, We can fetch the credential
  // directly from Firebase Hosting.
  axios.get("/__/firebase/init.json").then((response: AxiosResponse) => {
    firebase.initializeApp(JSON.parse(response.data as string));
  });
}

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
