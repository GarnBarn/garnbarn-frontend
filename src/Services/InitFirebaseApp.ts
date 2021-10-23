import * as firebase from "firebase/app";
import axios, { AxiosResponse } from "axios";

export default function initFirebase() {
  let firebaseConfig: firebase.FirebaseOptions;

  try {
    // If the file firebaseConfig.json is found. Use the config from local.
    firebaseConfig = require("@/firebaseConfig.json");
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    // If config file not found. Fetch it from GarnBarn Production Environment.
    // We can fetch it directly from Firebase Hosting.
    axios.get("/__/firebase/init.json").then((response: AxiosResponse) => {
      firebase.initializeApp(response.data as firebase.FirebaseOptions);
    });
  }
}
