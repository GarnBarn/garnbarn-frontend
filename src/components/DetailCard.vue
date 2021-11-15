<template>
  <md-card class="info-card">
    <md-card-header>
      <div class="md-title">{{ title }}</div></md-card-header
    >
    <md-divider></md-divider>
    <md-card-content>
      <slot></slot>
    </md-card-content>
  </md-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DetailCard extends Vue {
  @Prop({ required: true }) title!: string;
}
</script>

<style scoped>
.info-card {
  border-radius: 10px !important;
  border-style: solid;
  border-width: 1px;
  margin: 20px;
}
</style>
