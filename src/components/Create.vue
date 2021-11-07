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
    <div v-if="creationType === 'tag'" class="overflow">
      <div>
        <md-field>
          <label>Tag name:</label>
          <md-input v-model="apiData.name" required></md-input>
        </md-field>
      </div>

      <div>
        <label>Reminder Time:</label>
        <md-checkbox v-model="apiData.reminderTime" :value="this.getReminderTime(7)">1 Week</md-checkbox>
        <md-checkbox v-model="apiData.reminderTime" :value="this.getReminderTime(1)">1 Day</md-checkbox>
        <md-checkbox v-model="apiData.reminderTime" :value="this.getReminderTime(0.5)">12 hours</md-checkbox>
        <md-checkbox v-model="apiData.reminderTime" :value="this.getReminderTime(0.25)">6 hours</md-checkbox>
      </div>

      <div>
        <label>Color:</label><br>
        <v-swatches v-model="apiData.color"></v-swatches>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import { TagApi } from "@/types/GarnBarnApi/TagApi"
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'

@Component({
  components: {
    DatePicker,
    VSwatches
  },
})
export default class Create extends Vue {
  @Prop({ required: true }) creationType!: "assignment" | "tag";
  @Prop({ required: true }) apiData!: AssignmentApi | TagApi;

  getReminderTime(timeBeforeDue: number): number {
    var reminderTime = (24*60*60*1000) * timeBeforeDue; //time of timeBeforeDue days
    return reminderTime
  }
}
</script>

<style scoped>
.detail {
  margin: 2rem 5rem;
}

.flex-col {
  flex: 1 1 0% ;
  flex-direction: column ;
}

.overflow {
  overflow: auto;
}
</style>