<template>
  <layout :callback="callback">
    <tag-detail :tag="tag">
      <template v-slot:authorPicture>
        <UserProfileIcon
            :uid="tag.author"
            :garnBarnApiCaller="garnBarnAPICaller"
          ></UserProfileIcon>
      </template>
      <template v-slot:subscriberPicture>
        <UserProfileIcon
              v-for="[index, subscriberUid] of tag.subscriber.entries()"
              :key="index"
              :uid="subscriberUid"
              :garnBarnApiCaller="garnBarnAPICaller"
              class="padding"
        >
        </UserProfileIcon>
      </template>
      <template v-slot:buttons>
        <md-button class="md-primary md-raised" v-on:click="edit"
          >Edit</md-button
        >
        <md-button class="md-accent md-raised" v-on:click="confirmDelete"
          >Delete</md-button
        >
        <md-button class="md-secondary" @click="popBack">Back</md-button>
      </template>
    </tag-detail>            
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

          <md-tab md-label="Notification Settings">
            <notification-setting 
            :reminderTime="tagApi.reminderTime"
            ref="notificationSetting"></notification-setting>
          </md-tab>
        </md-tabs>
      </md-card-content>
    </DialogBoxComponent>
  </layout>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import DialogBox from "@/components/DialogBox/DialogBox";
import NotificationSetting from "@/components/NotificationSetting.vue"
import UserProfileIcon from "@/components/UserProfileIcon.vue";
import DetailCard from "@/components/DetailCard.vue";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import Create from "@/components/Create.vue";
import TagDetail from "@/components/Tag/TagDetail.vue";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase/app";

type TimeData = {
  time: number,
  unit: number
}

@Component({
  components: {
    Layout,
    TagDetail,
    Create,
    DialogBoxComponent,
    UserProfileIcon,
    DetailCard,
    TagBoxChip,
    NotificationSetting,
  },
})
export default class TagDetailView extends Vue {
  @Ref() readonly notificationSetting!: NotificationSetting

  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
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
    this.tagApi.reminderTime = this.processTimeDataToReminderTime(this.notificationSetting.timeData as TimeData[]);
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

  getUnixTimeFromTimeData(timeData: TimeData): number {
    return timeData.time * timeData.unit;
  }

  processTimeDataToReminderTime(timeData: TimeData[] | null): number[] | undefined {
    if (timeData) {
      return timeData.map((time) => 
        this.getUnixTimeFromTimeData(time)
      )    
    }
  }

  hasHistory(): boolean {
    return window.history.length > 2;
  }

  popBack() {
    if (this.hasHistory()) {
      this.$router.back();
    }
    else {
      this.$router.push('/tag');
    }
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

.padding {
  padding: 0px 5px;
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
