<template>
  <layout>
    <div>
      <div v-if="editing" class="edit">
        <AssignmentEdit ></AssignmentEdit>
        <md-button @click="detail" class="md-primary md-raised">Done</md-button>
        <md-button @click="detail" class="md-primary md-raised">Back</md-button>
      </div>
      <div v-else class="detail">
        <AssignmentDetail :assignment=assignment></AssignmentDetail>
        <md-button class="md-primary md-raised">Mark As Done</md-button>
        <md-button class="md-primary md-raised" v-on:click="edit">Edit</md-button>
        <router-link to="/home">
          <md-button class="md-primary md-raised">Back</md-button>
        </router-link>
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import DialogBox from "@/components/DialogBox/DialogBox";
import { DialogBoxAction } from "@/types/components/DialogBox"
import AssignmentEdit from "@/components/AssignmentEdit.vue";
import AssignmentDetail from  "@/components/AssignmentDetail.vue";
import Layout from "@/layouts/Main.vue";

@Component({
  components: {
    Layout,
    AssignmentDetail,
    AssignmentEdit
  },
})
export default class AssignmentView extends Vue {
  editing = false;
  informDialogBox = new DialogBox("informDialogBox");
  assignmentId = Number(this.$route.params.id);
  assignment: Assignment = {
    id: this.assignmentId,
    name: "Test 1",
    tag: {
      id: 1,
      name: "Test Tag",
      color: "#30475E",
    },
    description: "The overflow-wrap property in CSS allows you to specify that the browser can break a line of text inside the targeted element onto multiple lines in an otherwise unbreakable place. This helps to avoid an unusually long string of text causing layout problems due to overflow.",
    dueDate: 1635439072,
  }

  edit(): void {
    this.editing = true;
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
          }
          },
          {
            buttonContent: "No",
            buttonClass: "md-secondary",
            onClick: (): void => {
              this.informDialogBox.dismiss();
              this.editing = false;
            }
          },
        ]
      });
  }
}
</script>
