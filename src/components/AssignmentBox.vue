<template>
  <div class="box">
    <md-card class="md-primary assignment-card">
      <md-card-header>
        <div class="md-title assignment-content">Read about Agile</div>
      </md-card-header>
      <md-card-content>
        <div class="md-subhead assignment-content">Read #2, #4, #16 tips</div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AssignmentBox extends Vue {}
</script>

<style scoped>
.assignment-content {
  text-align: left;
}

.box {
  margin: 30px 0px;
}

.assignment-card {
  border-radius: 20px;
}
</style>
