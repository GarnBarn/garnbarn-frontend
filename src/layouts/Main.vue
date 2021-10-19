<template>
  <div>
    <md-app class="full-height">
      <md-app-toolbar
        :md-elevation="config.toolBarElevation"
        class="md-primary"
      >
        <div class="logo">
          <p style="font-size: 30px">GarnBarn</p>
        </div>
        <div class="itemBar">
          <md-button>Assignment</md-button>
          <md-button>Tag</md-button>
          <md-button class="md-icon-button">
            <md-icon>account_circle</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Layout",
  data: () => {
    return {
      config: {
        toolBarElevation: 1,
      },
    };
  },
});
</script>

<style scoped>
.logo {
  flex: 1;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
}

.itemBar {
  flex: 1;
  text-align: right;
}
</style>
