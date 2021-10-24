<template>
  <div class="page-container">
    <md-app md-mode="fixed" class="full-height">
      <md-app-toolbar :md-elevation="config.toolBarElevation" class="nav-bar">
        <div class="md-toolbar-row">
          <div class="logo">GarnBarn</div>
          <div class="itemBar">
            <md-button>Assignment</md-button>
            <md-button>Tag</md-button>
            <md-button class="md-icon-button">
              <md-icon>account_circle</md-icon>
            </md-button>
          </div>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
    <dialog-box-component
      :dialogBoxId="'loadingDialogBox'"
      :isCustomDialogBox="true"
    >
      <md-dialog-title>Loading </md-dialog-title>
      <md-dialog-content>
        Grabing the data from GarnBarn. Please wait. . .
        <md-progress-spinner
          style="vertical-align: middle; margin-left: 10px"
          md-mode="indeterminate"
          :md-diameter="30"
          :md-stroke="3"
        ></md-progress-spinner>
      </md-dialog-content>
    </dialog-box-component>
    <dialog-box-component
      :dialogBoxId="'informDialogBox'"
      :isCustomDialogBox="false"
    >
    </dialog-box-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import "firebase/auth";

@Component({
  components: {
    DialogBoxComponent,
  },
})
export default class Layout extends Vue {
  config = {
    toolBarElevation: 1,
  };
  showDialog = true;

  beforeMount(): void {
    let firebaseAuthInstance: firebase.auth.Auth = firebase.auth();
    firebaseAuthInstance.onAuthStateChanged((user) => {
      // If user is not signed in yet.
      if (!user) {
        this.$router.push("/signIn");
      }
    });
  }
}
</script>

<style scoped>
.page-container {
  height: 100%;
  width: 100%;
}

.full-height {
  height: 100%;
}

.logo {
  flex: 1;
  text-align: left;
  font-weight: bold;
  font-size: 30px;
}

.itemBar {
  flex: 2;
  text-align: right;
}

.nav-bar {
  background-color: #f9f9f9;
}
</style>
