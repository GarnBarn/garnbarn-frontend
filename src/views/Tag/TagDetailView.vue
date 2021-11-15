<template>
  <layout :callback="callback">
    <div class="grid">
      <div class="full-left-grid border">
        <p><md-icon class="md-size-2x">tag</md-icon></p>
        <p class="md-display-3">{{ tag.name }}</p>
        <tag-box-chip :color="tag.color" :text="tag.name"></tag-box-chip>
      </div>
      <div class="upper-right-grid">
        <detail-card :title="detailCardTexts.author" v-if="tag.author">
          <UserProfileIcon
            :uid="tag.author"
            :garnBarnApiCaller="garnBarnAPICaller"
          ></UserProfileIcon>
        </detail-card>
        <detail-card :title="detailCardTexts.subscriber">
          <div
            v-if="tag.subscriber && tag.subscriber.length !== 0"
            class="flex"
          >
            <UserProfileIcon
              v-for="[index, subscriberUid] of tag.subscriber.entries()"
              :key="index"
              :uid="subscriberUid"
              :garnBarnApiCaller="garnBarnAPICaller"
            >
            </UserProfileIcon>
          </div>
          <div v-else>
            <md-icon>minimize</md-icon>
          </div>
        </detail-card>
        <detail-card :title="detailCardTexts.reminderTime">
          <tag-box-chip
            v-for="time in tag.reminderTime" 
            :key="time"
            :color="tag.color"
            :text="getHumanReadableTime(time)">
          </tag-box-chip>
        </detail-card>
      </div>
      <div class="lower-right-grid">
        <md-button class="md-primary md-raised" v-on:click="edit"
          >Edit</md-button
        >
        <md-button class="md-accent md-raised" v-on:click="confirmDelete"
          >Delete</md-button
        >
        <md-button class="md-secondary" @click="popBack">Back</md-button>
      </div>
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
import UserProfileIcon from "@/components/UserProfileIcon.vue";
import DetailCard from "@/components/DetailCard.vue";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import Create from "@/components/Create.vue";
import TagDetail from "@/components/TagDetail.vue";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase/app";

@Component({
  components: {
    Layout,
    TagDetail,
    Create,
    DialogBoxComponent,
    UserProfileIcon,
    DetailCard,
    TagBoxChip,
  },
})
export default class TagDetailView extends Vue {
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
  detailCardTexts = {
    author: "Author: ",
    subscriber: "Subscribers: ",
    reminderTime: "Reminder Time: ",
  };
  editing = false;
  creationType = "tag";
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
    subscriber: undefined,
  };
  tagApi: TagApi = {
    name: undefined,
    color: undefined,
    reminderTime: [],
    subscriber: undefined,
  };

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.get();
    this.firebaseUser = user;
    loadingDialogBox.dismiss();
  }

  async get(): Promise<void> {
    try {
      const apiResponse = await this.garnBarnAPICaller?.v1.tags.get(this.tagId);
      this.tag = apiResponse?.data as Tag;
      this.tagApi = this.extractTagToTagApi(this.tag);
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
    this.garnBarnAPICaller?.v1.tags
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

  async deleteTag(): Promise<void> {
    this.garnBarnAPICaller?.v1.tags
      .delete(this.tagId)
      .then((apiResponse) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Tag deleted",
            content: `Your tag has been deleted.`,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                this.informDialogBox.dismiss();
              },
            },
          ],
        });
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

  confirmDelete(): void {
    this.informDialogBox.show({
      dialogBoxContent: {
        title: "Confirm Delete?",
        content: `This action can't be undone, Are you sure?`,
      },
      dialogBoxActions: [
        {
          buttonContent: "Confirm",
          buttonClass: "md-primary",
          onClick: (): void => {
            this.deleteTag();
            this.informDialogBox.dismiss();
            this.$router.back();
          },
        },
        {
          buttonContent: "Cancel",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.informDialogBox.dismiss();
          },
        },
      ],
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

  extractTagToTagApi(tag: Tag): TagApi {
    let tagApi: TagApi = {
      name: undefined,
      color: undefined,
      reminderTime: [],
      subscriber: [],
    };
    tagApi.name = tag.name;
    if (tag.reminderTime) {
      tagApi.reminderTime = tag.reminderTime;
    }
    tagApi.color = tag.color;
    if (tag.subscriber) {
      tagApi.subscriber = tag.subscriber;
    }

    return tagApi;
  }

  getHumanReadableTime(unixTime: number): string {
    var message = "";

    var day = Math.floor(unixTime / 86400);
    unixTime -= day * 86400;
    if (day >= 1) {
      message += day > 1 ? `${day} Days` : `${day} Day`;
    }

    var hour = Math.floor(unixTime / 3600) % 24;
    unixTime -= hour * 3600;
    if (hour >= 1) {
      message += hour > 1 ? `${hour} hours` : `${hour} hour`;
    }

    var minute = Math.floor(unixTime / 60) % 60;
    unixTime -= minute * 60;
    if (minute >= 1) {
      message += minute > 1 ? `${minute} minutes` : `${minute} minute`;
    }

    return message;
  }

  popBack() {
    this.$router.back();
  }
}
</script>

<style scoped>
.blur {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.border {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 1px solid black;
}

.grid {
  margin: 2rem 0rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

.full-left-grid {
  padding: 5rem;
  grid-row: span 2 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
