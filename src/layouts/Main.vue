<template>
  <div class="page-container">
    <md-app md-mode="fixed" class="full-height">
      <md-app-toolbar :md-elevation="config.toolBarElevation" class="nav-bar">
        <div class="md-toolbar-row">
          <router-link to="/home">
            <div class="logo">GarnBarn</div>
          </router-link>
          <div class="itemBar">
            <md-button v-on:click="edit('assignment')">Assignment</md-button>
            <md-button v-on:click="edit('tag')">Tag</md-button>
            <router-link to="/account">
              <md-button class="md-icon-button">
                <md-icon>account_circle</md-icon>
              </md-button>
            </router-link>
          </div>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
    <dialog-box-component
      :dialogBoxId="'loadingDialogBox'"
      :isCustomDialogBox="true"
    >
      <md-dialog-title>Loading </md-dialog-title>
      <md-dialog-content>
        Grabing the data from GarnBarn. Please wait. . .
        <md-progress-spinner
          style="vertical-align: middle; margin-left: 10px"
          md-mode="indeterminate"
          :md-diameter="30"
          :md-stroke="3"
        ></md-progress-spinner>
      </md-dialog-content>
    </dialog-box-component>
    <dialog-box-component
      :dialogBoxId="'informDialogBox'"
      :isCustomDialogBox="false"
    >
    </dialog-box-component>
    <DialogBoxComponent
      :dialogBoxId="'createDialogBox'"
      :isCustomDialogBox="true"
      class="blur"
    >
      <md-card-content>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Create">
            <Create
              :assignmentData="this.assignmentData"
              md-dynamic-height
              ref="assignmentCreate"
            ></Create>
          </md-tab>

          <md-tab md-label="Delete">
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

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import firebase from "firebase";
import Create from "@/components/Create.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { AssignmentApi } from "@/types/garnbarn/AssignmentApi"
import "firebase/auth";

export type CallbackFunction = (
  user: firebase.User,
  loadingDialogBox: DialogBox
) => void;

@Component({
  components: {
    DialogBoxComponent,
    Create
  },
})
export default class Layout extends Vue {
  @Ref() readonly assignmentCreate!: Create;
  @Prop() callback!: CallbackFunction;
  config = {
    toolBarElevation: 1,
  };
  createDialogBox = new DialogBox("createDialogBox");
  loadingDialogBox = new DialogBox("loadingDialogBox");
  informDialogBox = new DialogBox("informDialogBox");

  assignmentData: AssignmentApi = {
    id: undefined,
    name: "",
    description: undefined,
    reminderTime: undefined,
    dueDate: undefined,
    tagId: undefined,
  };
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;

  mounted(): void {
    let firebaseAuthInstance: firebase.auth.Auth = firebase.auth();
    this.loadingDialogBox.show({
      dialogBoxActions: [],
    });
    firebaseAuthInstance.onAuthStateChanged((user) => {
      // If user is not signed in yet.
      if (!user) {
        this.loadingDialogBox.dismiss();
        this.$router.push("/signIn");
      }
      if (typeof this.callback === "function") {
        this.callback(user as firebase.User, this.loadingDialogBox);
      } else {
        this.loadingDialogBox.dismiss();
      }
    });
  }

    edit(type: "tag" | "assignment"): void {
    this.createDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary md-raised",
          onClick: (): void => {
            // this.callback = (user, loadingDialogBox) => {
            //   this.garnBarnAPICaller = new GarnBarnApi(user);
            //   loadingDialogBox.dismiss();
            // }
            if (type == "assignment") {
              this.createAssignment();
            }
            else {
              // this.createTag();
            }
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

    async createAssignment(): Promise<void> {
    this.garnBarnAPICaller?.v1.assignments
      .create(this.assignmentCreate.assignmentData)
      .catch((e) => {
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
.page-container {
  height: 100%;
  width: 100%;
}

.full-height {
  height: 100%;
}

.logo {
  flex: 1;
  text-align: left;
  font-weight: bold;
  font-size: 30px;
}

.itemBar {
  flex: 2;
  text-align: right;
}

.nav-bar {
  background-color: #f9f9f9;
}

.blur {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
