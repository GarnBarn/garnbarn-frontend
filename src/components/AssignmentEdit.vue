<template>
  <div class="flex-col detail full-screen">
    <md-field>
      <label>Assignment name:</label>
      <md-input v-model="assignmentData.name" required></md-input>
    </md-field>

    <md-field>
      <label>Tag: </label>
      <md-select v-model="assignmentData.tagId">
        <!--  Not sure how to call all tag from user -->
        <md-option value="1">ISP</md-option>
        <md-option value="2">Physics</md-option>
      </md-select>
    </md-field>

    <md-field>
      <label>Description:</label>
      <md-textarea v-model="assignmentData.description"></md-textarea>
    </md-field>

    <label>Due Date: </label>
    <date-picker 
    v-model="assignmentData.dueDate" 
    type="datetime" 
    value-type="timestamp"
    :minute-step="30"
    format="DD/MM/YY HH:mm"
    ></date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";

@Component({
  components: {
    DatePicker,
  }
})
export default class AssignmentEdit extends Vue {
  @Prop({ required: true }) assignmentData!: AssignmentApi;
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
