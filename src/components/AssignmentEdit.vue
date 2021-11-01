<template>
  <div class="flex-col detail full-screen">
    <md-field>
      <label>Assignment name:</label>
      <md-input v-model="cachedAssignment.name" required></md-input>
    </md-field>

    <md-field>
      <label>Tag:</label>
      <md-select v-model="cachedAssignment.tag.id">
        <!--  Not sure how to call all tag from user -->
        <md-option value="1">ISP</md-option>
        <md-option value="2">Physics</md-option>
      </md-select>
    </md-field>

    <md-field>
      <label>Description:</label>
      <md-textarea v-model="cachedAssignment.description"></md-textarea>
    </md-field>

    <label>Due Date:</label>
    <md-datepicker v-model="cachedAssignment.dueDate" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";

export type assignmentCallback = (assignment: Assignment) => void;

@Component
export default class AssignmentEdit extends Vue {
  @Prop({ required: true }) callback!: assignmentCallback;
  @Prop({ required: true }) cachedAssignment!: Assignment;
}
</script>

<style scoped>
.detail {
  margin: 2rem 5rem;
}

.flex-col {
  flex: 1 1 0%;
  flex-direction: column;
  text-align: left;
}
</style>
