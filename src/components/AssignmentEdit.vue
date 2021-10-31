<template>
  <div class="flex-col detail">
    <form>
      <md-field>
        <label>Assignment name:</label>
        <md-input v-model="assignment.name" required></md-input>
      </md-field>

      <md-field>
        <label>Tag:</label>
        <md-select v-model="assignment.tag" name="movie" id="movie">
              <!--  Not sure how to call all tag from user -->
            <md-option value=1>ISP</md-option>
            <md-option value=2>Physics</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label>Description:</label>
        <md-textarea v-model="assignment.description"></md-textarea>
      </md-field>

      <label>Due Date:</label>
      <md-datepicker v-model="assignment.dueDate"/>

    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";

@Component
export default class AssignmentEdit extends Vue {
  data() {
    return {
      assignment: {
        name: "",
        tagId: 0,
        description: "",
        dueDate: "",
        }
      } 
    }
  }
</script>

<style scoped>
.detail {
  padding: 2rem 5rem;
}

.flex-col {
  flex: 1 1 0%;
  flex-direction: column;
  text-align: left;
}
</style>
