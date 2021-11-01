<template>
  <layout>
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
              ref="assignmentEditBox"
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
import DialogBox from "@/components/DialogBox/DialogBox";
import AssignmentEdit from "@/components/AssignmentEdit.vue";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";

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
  editing = false;
  informDialogBox = new DialogBox("informDialogBox");
  editAssignmentDialogBox = new DialogBox("editAssignmentDialogBox");
  assignmentId = Number(this.$route.params.id);
  assignment = {
    id: this.assignmentId,
    name: "Test 1",
    tag: {
      id: 1,
      name: "Test Tag",
      color: "#30475E",
    },
    description:
      "The overflow-wrap property in CSS allows you to specify that the browser can break a line of text inside the targeted element onto multiple lines in an otherwise unbreakable place. This helps to avoid an unusually long string of text causing layout problems due to overflow.",
    dueDate: 1635439072,
  };

  edit(): void {
    this.editAssignmentDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary",
          onClick: (): void => {
            this.editAssignmentDialogBox.dismiss();
            console.log(this.assignmentEdit.cachedAssignment);
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

  detail(): void {
    this.informDialogBox.show({
      dialogBoxContent: {
        title: "Confirm edit",
        content: `Are you sure?`,
      },
      dialogBoxActions: [
        {
          buttonContent: "Yes",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.informDialogBox.dismiss();
            this.editing = false;
          },
        },
        {
          buttonContent: "No",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.informDialogBox.dismiss();
            this.editing = false;
          },
        },
      ],
    });
  }

  assignmentCallback(assignment: Assignment) {
    console.log(assignment);
    this.$data.assignment = assignment;
  }
}
</script>
