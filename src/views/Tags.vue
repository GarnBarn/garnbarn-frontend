<template>
  <layout :callback="callback">
    <div>
      <h1>Add Assignment</h1>
      <md-button
        class="md-icon-button md-raised md-primary"
        v-on:click="edit"
      >
        <md-icon>add</md-icon>
      </md-button>
      <!-- <md-table>
        <md-table-toolbar>
          <h1 class="md-title">All Assignments</h1>
        </md-table-toolbar>
        
        <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>

      </md-table-row>

      </md-table> -->

      <DialogBoxComponent
        :dialogBoxId="'createDialogBox'"
        :isCustomDialogBox="true"
        class="blur"
      >
        <md-card-content>
          <md-tabs md-dynamic-height>
            <md-tab md-label="Create">
              <Create
                :assignmentData="assignmentData"
                md-dynamic-height
                ref="assignmentCreate"
              ></Create>
            </md-tab>

            <md-tab md-label="Delete" md-disabled>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </DialogBoxComponent>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import DialogBox from "@/components/DialogBox/DialogBox";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import Create from "@/components/Create.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase";

@Component({
  components: {
    Layout,
    DialogBoxComponent,
    Create,
  },
})
export default class AssignmentView extends Vue {
  @Ref() readonly assignmentCreate!: Create;

  createDialogBox = new DialogBox("createDialogBox");
  loadingDialogBox = new DialogBox("loadingDialogBox");
  informDialogBox = new DialogBox("informDialogBox");

  tagData: TagApi = {
    name: undefined,
    color: undefined,
    reminderTime: undefined,
    subscriber: undefined,
  };
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    loadingDialogBox.dismiss();
  }

  edit(operationType: "tag" | "assignment"): void {
    this.createDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary md-raised",
          onClick: (): void => {
            this.createTag();
            this.createDialogBox.dismiss();
          },
        },
        {
          buttonContent: "Exit",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.createDialogBox.dismiss();
          },
        },
      ],
    });
  }

  async createTag(): Promise<void> {
    this.garnBarnAPICaller?.v1.assignments
      .create(this.assignmentCreate.assignmentData)
      .then(() => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Tag created",
            content: "",
          },
        });
      })
      .catch((e) => {
        console.log(e);
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Error",
            content: e.message,
          },
        });
      });
  }
}
</script>

<style scoped>
.blur {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>