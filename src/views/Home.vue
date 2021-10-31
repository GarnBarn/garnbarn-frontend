<template>
  <layout :callback=callback>
    <DateWithAssignment
      v-for="assignmentInDay in assignments.dateWithAssignments"
      :key="assignments.dateWithAssignments.indexOf(assignmentInDay)"
      :dateString="assignmentInDay.date"
      :assignments="assignmentInDay.assignments"
    ></DateWithAssignment>
  </layout>
</template>

<script lang="ts">
import Layout from "@/layouts/Main.vue";
import DateWithAssignment from "@/components/DateWithAssignment.vue";
import { Component, Vue } from "vue-property-decorator";
import { DateWithAssignments } from "@/types/garnbarn/Assignment";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { DialogBox } from "@/components/DialogBox/DialogBox";
import firebase from "firebase";

@Component({
  components: {
    Layout,
    DateWithAssignment,
  },
})
export default class Home extends Vue {
  garnBarnAPICaller: GarnBarnApi | undefined = undefined
  loadingDialogBox = new DialogBox("loadingDialogBox");
  assignments: DateWithAssignments = {
    dateWithAssignments: [],
  };
  callback(user: firebase.User) {
      this.garnBarnAPICaller = new GarnBarnApi(user);
      this.get();
  }
  async get() {
    const apiResponse = await this.garnBarnAPICaller?.v1().assignment().all(); 
    this.loadingDialogBox.dismiss();
  }
}
</script>
