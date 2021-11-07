<template>
  <div class="flex-col detail full-screen">
    <div v-if="creationType === 'assignment'">
      <md-field>
        <label>Assignment name:</label>
        <md-input v-model="apiData.name" required></md-input>
      </md-field>

      <md-field>
        <label>Tag:</label>
        <md-select v-model="apiData.tagId">
          <!--  Not sure how to call all tag from user -->
          <md-option value="1">ISP</md-option>
          <md-option value="2">Physics</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label>Description:</label>
        <md-textarea v-model="apiData.description"></md-textarea>
      </md-field>

      <label>Due Date:</label>
      <date-picker
        v-model="apiData.dueDate"
        type="datetime"
        value-type="timestamp"
        :minute-step="30"
        format="DD/MM/YY HH:mm"
      ></date-picker>
    </div>
    <div v-if="creationType === 'tag'">
      <md-field>
        <label>Tag name:</label>
        <md-input v-model="apiData.name" required></md-input>
      </md-field>
    
      <label>Due Date:</label>
      <date-picker
        v-model="apiData.dueDate"
        type="datetime"
        value-type="timestamp"
        :minute-step="30"
        format="DD/MM/YY HH:mm"
      ></date-picker>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import { TagApi } from "@/types/GarnBarnApi/TagApi"
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

@Component({
  components: {
    DatePicker,
  },
})
export default class Create extends Vue {
  @Prop({ required: true }) creationType!: "assignment" | "tag";
  @Prop({ required: true }) apiData!: AssignmentApi | TagApi;
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