<template>
  <div>
    <md-empty-state
      md-icon="question_mark"
      md-label="404"
      md-description="The page you request was not found ;-;"
    >
      <md-button class="md-primary" @click="backToHome"
        >Back to home page</md-button
      >
    </md-empty-state>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PageNotFound extends Vue {
  backToHome() {
    this.$router.replace("/home");
  }
}
</script>
