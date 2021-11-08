<template>
  <div class="flex-col detail full-screen">
    <md-field>
      <label>Assignment name:</label>
      <md-input v-model="assignmentData.name" required></md-input>
    </md-field>

    <md-field>
      <label>Tag:</label>
      <md-select v-model="assignmentData.tagId">
        <md-option :value="item.id" v-for="item in tags" :key="item.id">{{
          item.name
        }}</md-option>
      </md-select>
    </md-field>

    <md-field>
      <label>Description:</label>
      <md-textarea v-model="assignmentData.description"></md-textarea>
    </md-field>

      <label>Due Date:</label>
      <date-picker
        v-model="apiData.dueDate"
        type="datetime"
        value-type="timestamp"
        :minute-step="30"
        format="DD/MM/YY HH:mm"
      ></date-picker>
      <br>
      <label>Reminder Time:</label>
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(7)"
          >1 Week</md-checkbox
        >
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(1)"
          >1 Day</md-checkbox
        >
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(0.5)"
          >12 hours</md-checkbox
        >
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(0.25)"
          >6 hours</md-checkbox
        >
    <div v-if="creationType === 'tag'" class="overflow">
      <div>
        <md-field>
          <label>Tag name:</label>
          <md-input v-model="apiData.name" required></md-input>
        </md-field>
      </div>
      <div>
        <label>Reminder Time:</label>
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(7)"
          >1 Week</md-checkbox
        >
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(1)"
          >1 Day</md-checkbox
        >
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(0.5)"
          >12 hours</md-checkbox
        >
        <md-checkbox
          v-model="apiData.reminderTime"
          :value="this.getReminderTime(0.25)"
          >6 hours</md-checkbox
        >
      </div>

      <div>
        <label>Color:</label><br />
        <v-swatches v-model="apiData.color"></v-swatches>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import firebase from "firebase";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { Tag } from "@/types/garnbarn/Tag";

@Component({
  components: {
    DatePicker,
  },
})
export default class Create extends Vue {
  @Prop({ required: true }) assignmentData!: AssignmentApi;
  @Prop({ required: true }) firebaseUser!: firebase.User;
  garnBarnApiCaller: GarnBarnApi | null = null;
  tags: Array<Tag> = [];

  mounted() {
    this.garnBarnApiCaller = new GarnBarnApi(this.firebaseUser);
    this.garnBarnApiCaller.v1.tags.all().then(async (apiResponse) => {
      this.tags = apiResponse.data.results;
      let nextFunction = apiResponse.data.next;
      while (typeof nextFunction === "function") {
        const response = await nextFunction();
        this.tags = this.tags.concat(response.data.results);
        nextFunction = response.data.next;
      }
    });
  }
}
</script>

<style scoped>
.detail {
  margin: 2rem 4rem;
}

.flex-col {
  flex: 1 1 0%;
  flex-direction: column;
  text-align: left;
}
</style>
