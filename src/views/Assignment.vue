<template>
  <layout :callback="callback">
    <div class="detail">
      <AssignmentDetail :assignment="assignment"></AssignmentDetail>
      <md-button class="md-primary md-raised">Mark As Done</md-button>
      <md-button class="md-primary md-raised" v-on:click="edit">Edit</md-button>
      <router-link to="/home">
        <md-button class="md-primary md-raised">Back</md-button>
      </router-link>
    </div>
    <DialogBoxComponent
      :dialogBoxId="'editAssignmentDialogBox'"
      :isCustomDialogBox="true"
    >
      <md-card-content>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Assignment">
            <AssignmentEdit
              :cachedAssignment="JSON.parse(JSON.stringify(assignment))"
              :callback="assignmentCallback"
              md-dynamic-height
              ref="assignmentEdit"
            ></AssignmentEdit>
          </md-tab>

          <md-tab md-label="Notification Settings">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              mollitia dolorum dolores quae commodi impedit possimus qui, atque
              at voluptates cupiditate. Neque quae culpa suscipit praesentium
              inventore ducimus ipsa aut.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              mollitia dolorum dolores quae commodi impedit possimus qui, atque
              at voluptates cupiditate. Neque quae culpa suscipit praesentium
              inventore ducimus ipsa aut.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              mollitia dolorum dolores quae commodi impedit possimus qui, atque
              at voluptates cupiditate. Neque quae culpa suscipit praesentium
              inventore ducimus ipsa aut.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              mollitia dolorum dolores quae commodi impedit possimus qui, atque
              at voluptates cupiditate. Neque quae culpa suscipit praesentium
              inventore ducimus ipsa aut.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              mollitia dolorum dolores quae commodi impedit possimus qui, atque
              at voluptates cupiditate. Neque quae culpa suscipit praesentium
              inventore ducimus ipsa aut.
            </p>
          </md-tab>
        </md-tabs>
      </md-card-content>
    </DialogBoxComponent>
  </layout>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import { AssignmentApi } from "@/types/garnbarn/AssignmentApi"
import DialogBox from "@/components/DialogBox/DialogBox";
import AssignmentEdit from "@/components/AssignmentEdit.vue";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase";

@Component({
  components: {
    Layout,
    AssignmentDetail,
    AssignmentEdit,
    DialogBoxComponent,
  },
})
export default class AssignmentView extends Vue {
  @Ref() readonly assignmentEdit!: AssignmentEdit;
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
  editing = false;
  informDialogBox = new DialogBox("informDialogBox");
  editAssignmentDialogBox = new DialogBox("editAssignmentDialogBox");
  assignmentId = Number(this.$route.params.id);
  assignment: Assignment = {
    id: this.assignmentId,
    name: "Test 1",
    tag: {
      id: 1,
      name: "Test Tag",
      color: "#30475E",
    },
    reminderTime: [50, 50, 50],
    description:
      "The overflow-wrap property in CSS allows you to specify that the browser can break a line of text inside the targeted element onto multiple lines in an otherwise unbreakable place. This helps to avoid an unusually long string of text causing layout problems due to overflow.",
    dueDate: 1635439072,
  };
<<<<<<< HEAD
  assignmentCopy: Assignment = this.assignment;
  
  callback(user: firebase.User, loadingDialogBox: DialogBox) {
=======

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
>>>>>>> 80342f9d868e7404e53e1ba38f5bb70d4cb84791
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.get();
    this.assignmentCopy = JSON.parse(JSON.stringify(this.assignment));
    loadingDialogBox.dismiss();
  }

  async get(): Promise<void> {
    try {
      const apiResponse = await this.garnBarnAPICaller
        ?.v1()
        .assignment()
        .get(this.assignmentId);
      this.assignment = apiResponse?.data as Assignment;
    } catch (e) {
      this.informDialogBox.show({
        dialogBoxContent: {
          title: "Error",
          content: `Can't fetch data from GarnBarn API, Please try again or contact Administrator.`,
        },
      });
    }
  }

  async update(): Promise<void> {
    try {
      const diff = this.getDiff(this.assignmentCopy, this.assignmentEdit.cachedAssignment);
      console.log(this.assignmentEdit.cachedAssignment);
      const apiResponse = await this.garnBarnAPICaller
        ?.v1()
        .assignment()
        .update(this.assignmentId, diff);
      this.assignment = apiResponse?.data as Assignment;
    } catch (e: any) {
      this.informDialogBox.show({
        dialogBoxContent: {
          title: "Error",
          content: e.message,
        },
      });
    }
  }

  edit(): void {
    this.editAssignmentDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary",
          onClick: (): void => {
            this.editAssignmentDialogBox.dismiss();
            this.update();
          },
        },
        {
          buttonContent: "Exit",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.editAssignmentDialogBox.dismiss();
          },
        },
      ],
    });
  }

<<<<<<< HEAD
  getDiff(copiedObject: Assignment, originalObject: Assignment): AssignmentApi {
    let diff = Object.keys(originalObject).reduce((diff, key) => {
      if (copiedObject[key as keyof Assignment] === originalObject[key as keyof Assignment]) return diff
      return {
        ...diff,
        [key]: originalObject[key as keyof Assignment]
      }
    }, {})
    return diff;
  }

  assignmentCallback(assignment: Assignment) {
=======
  assignmentCallback(assignment: Assignment): void {
>>>>>>> 80342f9d868e7404e53e1ba38f5bb70d4cb84791
    this.$data.assignment = this.get();
  }
}
</script>
