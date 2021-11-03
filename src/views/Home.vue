<template>
  <layout :callback="callback">
    <div v-if="!callApiError.isError">
      <div v-if="assignments.dateWithAssignments.length !== 0">
        <DateWithAssignment
          v-for="assignmentInDay in assignments.dateWithAssignments"
          :key="assignments.dateWithAssignments.indexOf(assignmentInDay)"
          :date="assignmentInDay.date"
          :assignments="assignmentInDay.assignments"
        ></DateWithAssignment>
      </div>
      <md-empty-state
        md-icon="inventory_2"
        md-label="There is no assignment left!"
        md-description="Horry!, No work left. Or ya hide someting?"
        v-else
      >
      </md-empty-state>
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
    this.garnBarnAPICaller?.v1.assignments
      .all(true)
      .then(async (apiResponse) => {
        this.assignments = this.processData(apiResponse.data.results);
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
        year: "numeric",
      });
      if (typeof mapDateWithPos[dateTitle] === "undefined") {
        // If no date found before, Append the new one
        const pos = cacheDatewithAssignment.dateWithAssignments.push({
          date: dueDate,
          assignments: [item],
        });
        mapDateWithPos[dateTitle] = pos - 1;
      } else {
        const posOfDate = mapDateWithPos[dateTitle];
        cacheDatewithAssignment.dateWithAssignments[posOfDate].assignments.push(
          item
        );
      }
    });
    cacheDatewithAssignment.dateWithAssignments.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
    return cacheDatewithAssignment;
  }
}
</script>
