<template>
  <div>
    <md-empty-state
      md-icon="assignment"
      md-label="Welcome to GarnBarn"
      md-description="Please proceed to the app's home page."
    >
      <router-link to="/home">
        <md-button class="md-primary md-raised"
          >Proceed to app home page</md-button
        >
      </router-link>
    </md-empty-state>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Index extends Vue {}
</script>
