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
import DialogBox from "@/components/DialogBox/DialogBox";
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
    dateWithAssignments: [
      {
        date: "12 Sep.",
        assignments: [
          {
            id: 1,
            name: "Test 1",
            tag: {
              id: 1,
              name: "Test Tag",
              color: "#30475E",
            },
          },
          {
            id: 2,
            name: "Test 2",
            tag: {
              id: 2,
              name: "Tag 2",
              color: "#ff9e59",
            },
          },
        ],
      },
      {
        date: "20 Oct.",
        assignments: [
          {
            id: 3,
            name: "Test 3",
            tag: {
              id: 3,
              name: "Tag 3",
              color: "#ffbf59",
            },
          },
        ],
      },
      {
        date: "30 Oct.",
        assignments: [
          {
            id: 4,
            name: "Test 4",
            tag: {
              id: 3,
              name: "Tag 3",
              color: "#CBAF87",
            },
          },
          {
            id: 5,
            name: "Test 5",
          },
          {
            id: 6,
            name: "Test 6",
          },
          {
            id: 7,
            name: "Test 7",
          },
        ],
      },
    ],
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
