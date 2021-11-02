<template>
  <layout :callback="callback">
    <div v-if="!callApiError.isError">
      <DateWithAssignment
        v-for="assignmentInDay in assignments.dateWithAssignments"
        :key="assignments.dateWithAssignments.indexOf(assignmentInDay)"
        :dateString="assignmentInDay.date"
        :assignments="assignmentInDay.assignments"
      ></DateWithAssignment>
    </div>
    <md-empty-state
      class="md-accent"
      md-icon="error_outline"
      md-label="An Error occurred while calling GarnBarn API"
      :md-description="callApiError.errorMessage"
      v-else
    >
    </md-empty-state>
  </layout>
</template>

<script lang="ts">
import Layout from "@/layouts/Main.vue";
import DateWithAssignment from "@/components/DateWithAssignment.vue";
import { Component, Vue } from "vue-property-decorator";
import { Assignment, DateWithAssignments } from "@/types/garnbarn/Assignment";
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
  loadingDialogBox = new DialogBox("loadingDialogBox");
  assignments: DateWithAssignments = {
    dateWithAssignments: [],
  };
  callApiError = {
    isError: false,
    errorMessage: "",
  };

  callback(user: firebase.User, loadingDialogBox: DialogBox) {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.get(loadingDialogBox);
  }
  async get(loadingDialogBox: DialogBox) {
    this.garnBarnAPICaller
      ?.v1()
      .assignment()
      .all()
      .then((apiResponse) => {
        this.assignments = this.processData(
          (apiResponse.data as any).results as Array<Assignment>
        );
        loadingDialogBox.dismiss();
      })
      .catch((e) => {
        console.error(e);
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Error",
            content: `Can't fetch data from GarnBarn API, Please try again or contact Administrator.`,
          },
          dialogBoxActions: [
            {
              buttonContent: "Try again",
              buttonClass: "md-primary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
                this.get(loadingDialogBox);
              },
            },
            {
              buttonContent: "Dismiss",
              buttonClass: "md-secondary",
              onClick: async () => {
                this.callApiError.isError = true;
                this.callApiError.errorMessage = e;
                await loadingDialogBox.dismiss();
                this.informDialogBox.dismiss();
              },
            },
          ],
        });
      });
  }

  processData(assignments: Array<Assignment>): DateWithAssignments {
    type mapPosWithData = {
      [k: string]: number;
    };
    const mapDateWithPos: mapPosWithData = {};
    const cacheDatewithAssignment: DateWithAssignments = {
      dateWithAssignments: [],
    };
    assignments.forEach((item) => {
      if (!item.dueDate) {
        return;
      }
      const dueDate = new Date(item.dueDate);
      const dateTitle = dueDate.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
      });
      if (!(dateTitle in mapDateWithPos)) {
        // If no date found before, Append the new one
        cacheDatewithAssignment.dateWithAssignments.push({
          date: dateTitle,
          assignments: [item],
        });
      } else {
        const posOfDate = mapDateWithPos[dateTitle];
        cacheDatewithAssignment.dateWithAssignments[posOfDate].assignments.push(
          item
        );
      }
    });
    return cacheDatewithAssignment;
  }
}
</script>
