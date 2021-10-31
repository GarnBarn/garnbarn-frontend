<template>
  <layout :callback="callback">
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
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
  informDialogBox = new DialogBox("informDialogBox");
  assignments: DateWithAssignments = {
    dateWithAssignments: [],
  };
  callback(user: firebase.User, loadingDialogBox: DialogBox) {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.get(loadingDialogBox);
  }
  async get(loadingDialogBox: DialogBox) {
    try {
      const apiResponse = await this.garnBarnAPICaller?.v1().assignment().all();
    } catch (e) {
      this.informDialogBox.show({
        dialogBoxContent: {
          title: "Error",
          content: `Can't fetch data from GarnBarn API, Please try again or contact Administrator.`,
        },
      });
    }
    loadingDialogBox.dismiss();
  }
}
</script>
