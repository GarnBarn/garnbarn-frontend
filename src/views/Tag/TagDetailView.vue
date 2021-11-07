<template>
  <layout :callback="callback">
    <div>
      <md-button class="md-primary md-raised" v-on:click="edit">Edit</md-button>
      <router-link to="/home">
        <md-button class="md-secondary">Back</md-button>
      </router-link>
    </div>
    <DialogBoxComponent
      :dialogBoxId="'editTagDialogBox'"
      :isCustomDialogBox="true"
      class="blur"
    >
      <md-card-content>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Assignment">
            <Create
              :apiData="tagApi"
              :creationType="creationType"
              md-dynamic-height
            ></Create>
          </md-tab>

          <md-tab md-label="Notification Settings" md-disabled>
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
import { Component, Vue } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import DialogBox from "@/components/DialogBox/DialogBox";
import Create from "@/components/Create.vue";
import TagDetail from "@/components/TagDetail.vue";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase";

@Component({
  components: {
    Layout,
    TagDetail,
    Create,
    DialogBoxComponent,
  },
})
export default class TagDetailView extends Vue {
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
  editing = false;
  creationType = 'tag';
  firebaseUser: firebase.User | undefined = undefined;
  informDialogBox = new DialogBox("informDialogBox");
  editTagDialogBox = new DialogBox("editTagDialogBox");
  tagId = Number(this.$route.params.id);
  tag: Tag = {
      id: this.tagId,
      name: "",
      author: this.firebaseUser?.uid as string,
      color: "",
      reminderTime: [],
      subscriber: undefined
  }
  tagApi: TagApi = {
    name: undefined,
    color: undefined,
    reminderTime: [],
    subscriber: undefined,
  };

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.get();
    this.firebaseUser = user
    loadingDialogBox.dismiss();
  }

  async get(): Promise<void> {
    try {
      const apiResponse = await this.garnBarnAPICaller?.v1.tags.get(
        this.tagId
      );
      this.tag = apiResponse?.data as Tag;
      this.tagApi = this.extractAssignmentToAssignmentApi(this.tag);
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
    this.garnBarnAPICaller?.v1.assignments
      .update(this.tagId, this.tagApi as TagApi)
      .then((apiResponse) => {
        this.tag = apiResponse.data as Tag;
      })
      .catch((e) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Error",
            content: e.message,
          },
        });
      });
  }

  edit(): void {
    this.editTagDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary md-raised",
          onClick: (): void => {
            this.editTagDialogBox.dismiss();
            this.update();
          },
        },
        {
          buttonContent: "Exit",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.editTagDialogBox.dismiss();
          },
        },
      ],
    });
  }
  
  extractAssignmentToAssignmentApi(tag: Tag): TagApi {
    let tagApi: TagApi = {
      name: undefined,
      color: undefined,
      reminderTime: [],
      subscriber: undefined
    };
    tagApi.name = tag.name;
    if (tag.reminderTime) {
      tagApi.reminderTime = tag.reminderTime;
    }
    tagApi.color = tag.color;
    tagApi.subscriber = tag.subscriber

    return tagApi;
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
