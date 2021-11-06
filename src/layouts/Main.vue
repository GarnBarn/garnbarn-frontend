<template>
  <div class="page-container">
    <md-app md-mode="fixed" class="full-height">
      <md-app-toolbar :md-elevation="config.toolBarElevation" class="nav-bar">
        <div class="md-toolbar-row">
          <router-link to="/home">
            <div class="logo">GarnBarn</div>
          </router-link>
          <div class="itemBar">
            <router-link to="/assignment/">
              <md-button>Assignment</md-button>
            </router-link>
            <md-button>Tag</md-button>
            <router-link to="/account">
              <md-button class="md-icon-button">
                <md-icon>account_circle</md-icon>
              </md-button>
            </router-link>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import firebase from "firebase";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import "firebase/auth";

export type CallbackFunction = (
  user: firebase.User,
  loadingDialogBox: DialogBox
) => void;

@Component({
  components: {
    DialogBoxComponent,
  },
})
export default class Layout extends Vue {
  @Prop() callback!: CallbackFunction;
  config = {
    toolBarElevation: 1,
  };
  loadingDialogBox = new DialogBox("loadingDialogBox");

  mounted(): void {
    let firebaseAuthInstance: firebase.auth.Auth = firebase.auth();
    this.loadingDialogBox.show({
      dialogBoxActions: [],
    });
    firebaseAuthInstance.onAuthStateChanged((user) => {
      // If user is not signed in yet.
      if (!user) {
        this.loadingDialogBox.dismiss();
        this.$router.push("/signIn");
      }
      if (typeof this.callback === "function") {
        this.callback(user as firebase.User, this.loadingDialogBox);
      } else {
        this.loadingDialogBox.dismiss();
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
