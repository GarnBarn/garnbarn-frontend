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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAuth, Auth } from "firebase/auth";

@Component
export default class Layout extends Vue {
  config = {
    toolBarElevation: 1,
  };
  firebaseAuthInstance: Auth = getAuth();

  beforeMount() {
    this.firebaseAuthInstance.onAuthStateChanged((user) => {
      // If user is not signed in yet.
      if (!user) {
        // TODO: Show message box and redirect user back to index page
        console.log("No user signed in");
      } else {
        // TODO: Remove this line before merge into Master
        console.log(user);
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
  flex: 1;
  text-align: right;
}

.nav-bar {
  background-color: #f9f9f9;
}
</style>
