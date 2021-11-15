<template>
  <div class="signInBox">
    <md-card class="signInCard">
      <md-card-media-actions>
        <md-card-media>
          <img src="@/assets/images/garnbarn-logo.png" class="garnbarnLogo" />
        </md-card-media>

        <md-card-actions>
          <h3>Sign in to GarnBarn</h3>
          <section id="firebaseui-auth-container"></section>
        </md-card-actions>
      </md-card-media-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import * as firebaseUi from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SignIn extends Vue {
  mounted(): void {
    let firebaseAuthInstance: firebase.auth.Auth = firebase.auth();
    let uiConfig: any = {
      signInSuccessUrl: "/home",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInFlow: "popup",
    };
    let ui = new firebaseUi.auth.AuthUI(firebaseAuthInstance);
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>

<style scoped>
.signInBox {
  padding-top: 5%;
  padding-top: 5%;
}

.signInCard {
  padding: 10px;
  padding-top: 15px;
  border-radius: 20px;
  background-color: #f9f9f9;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
}

.garnbarnLogo {
  width: 150px;
  height: auto;
}

hr.rounded {
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 10%;
  margin-right: 10%;
  border-top: 2px solid #bbb;
  border-radius: 5px;
}
</style>
