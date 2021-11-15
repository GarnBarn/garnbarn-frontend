<template>
  <layout :callback="callback">
    <div class="grid">
      <div class="full-left-grid border">
        <p><md-icon class="md-size-2x">assignment</md-icon></p>
        <p class="md-display-3">{{ assignment.name }}</p>
        <div
          v-if="assignment.tag"
          @click="navigateToTagPage(assignment.tag.id)"
        >
          <TagBoxChip
            :color="assignment.tag.color"
            :text="assignment.tag.name"
            class="tag"
          ></TagBoxChip>
        </div>
        <p class="md-subheading">Due Date: {{ this.getFormatDate }}</p>
        <p class="md-subheading">Submission Time: {{ this.getFormatTime }}</p>
      </div>
      <div class="upper-right-grid">
        <detail-card :title="detailCardTexts.author">
          <UserProfileIcon
            v-if="isReady"
            :uid="assignment.author"
            :garnBarnApiCaller="garnBarnAPICaller"
          ></UserProfileIcon>
        </detail-card>
        <detail-card :title="detailCardTexts.description">
          <p class="content">{{ assignment.description }}</p>
        </detail-card>
        <detail-card :title="detailCardTexts.reminderTime">
          <tag-box-chip
            v-for="time in assignment.reminderTime" 
            :key="time"
            :color="assignment.tag.color"
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
      :dialogBoxId="'editAssignmentDialogBox'"
      :isCustomDialogBox="true"
      class="blur"
    >
      <md-card-content>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Assignment">
            <Create
              :apiData="assignmentApi"
              :creationType="creationType"
              :firebaseUser="firebaseUser"
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
import { Assignment } from "@/types/garnbarn/Assignment";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import DetailCard from "@/components/DetailCard.vue";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import UserProfileIcon from "@/components/UserProfileIcon.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import Create from "@/components/Create.vue";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase/app";

@Component({
  components: {
    Layout,
    AssignmentDetail,
    Create,
    DialogBoxComponent,
    DetailCard,
    UserProfileIcon,
    TagBoxChip,
  },
})
export default class AssignmentDetailView extends Vue {
  garnBarnAPICaller: GarnBarnApi | null = null;
  detailCardTexts = {
    author: "Author: ",
    description: "Description: ",
    reminderTime: "Reminder Time: ",
  };
  creationType = "assignment";
  editing = false;
  informDialogBox = new DialogBox("informDialogBox");
  editAssignmentDialogBox = new DialogBox("editAssignmentDialogBox");
  assignmentId = Number(this.$route.params.id);
  assignment: Assignment = {
    id: this.assignmentId,
    name: "Test 1",
    author: "A",
    tag: {
      id: 1,
      author: "1",
      name: "Test Tag",
      color: "#30475E",
    },
    reminderTime: [50, 50, 50],
    description:
      "The overflow-wrap property in CSS allows you to specify that the browser can break a line of text inside the targeted element onto multiple lines in an otherwise unbreakable place. This helps to avoid an unusually long string of text causing layout problems due to overflow.",
    dueDate: 1635439072,
  };
  assignmentApi: AssignmentApi = {
    id: undefined,
    name: undefined,
    reminderTime: undefined,
    description: undefined,
    dueDate: undefined,
    tagId: undefined,
  };
  firebaseUser: firebase.User | null = null;
  isReady = false;

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.firebaseUser = user;
    this.get();
    loadingDialogBox.dismiss();
  }

  async get(): Promise<void> {
    try {
      const apiResponse = await this.garnBarnAPICaller?.v1.assignments.get(
        this.assignmentId
      );
      this.assignment = apiResponse?.data as Assignment;
      this.assignmentApi = this.extractAssignmentToAssignmentApi(
        this.assignment
      );
    } catch (e) {
      this.informDialogBox.show({
        dialogBoxContent: {
          title: "Error",
          content: `Can't fetch data from GarnBarn API, Please try again or contact Administrator.`,
        },
        dialogBoxActions: [
          {
            buttonContent: "Ok",
            buttonClass: "md-secondary",
            onClick: async () => {
              await this.informDialogBox.dismiss();
              this.$router.back();
            },
          },
        ],
      });
    }
    this.isReady = true;
  }

  async update(): Promise<void> {
    this.garnBarnAPICaller?.v1.assignments
      .update(this.assignmentId, this.assignmentApi as AssignmentApi)
      .then((apiResponse) => {
        this.assignment = apiResponse.data as Assignment;
      })
      .catch((e) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Error",
            content: e.message,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
                this.$router.back();
              },
            },
          ],
        });
      });
  }

  async deleteAssignment(): Promise<void> {
    this.garnBarnAPICaller?.v1.assignments
      .delete(this.assignmentId)
      .then((apiResponse) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Assignment deleted",
            content: `Your assignment has been deleted.`,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
                this.$router.back();
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
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
              },
            },
          ],
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
          onClick: async () => {
            await this.deleteAssignment();
            this.informDialogBox.dismiss();
          },
        },
        {
          buttonContent: "Cancel",
          buttonClass: "md-secondary",
          onClick: () => {
            this.informDialogBox.dismiss();
          },
        },
      ],
    });
  }

  edit(): void {
    this.editAssignmentDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary md-raised",
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

  extractAssignmentToAssignmentApi(assignment: Assignment): AssignmentApi {
    let assignmentApi: AssignmentApi = {
      id: undefined,
      name: undefined,
      reminderTime: [],
      description: undefined,
      dueDate: undefined,
      tagId: undefined,
    };
    assignmentApi.name = assignment.name;
    if (assignment.reminderTime) {
      assignmentApi.reminderTime = assignment.reminderTime;
    }
    assignmentApi.description = assignment.description;
    assignmentApi.dueDate = assignment.dueDate;
    if (assignment.tag) {
      assignmentApi.tagId = assignment.tag.id;
    }

    return assignmentApi;
  }

  popBack() {
    this.$router.back();
  }

  convertUnixTimeToDate(unix_timestamp: number): Date {
    var date = new Date(unix_timestamp);
    return date;
  }

  get getFormatDate(): string {
    const date = this.convertUnixTimeToDate(this.assignment.dueDate as number);
    if (date) {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
    }

    return "Unknown";
  }

  get getFormatTime(): string {
    const date = this.convertUnixTimeToDate(this.assignment.dueDate as number);
    if (date) {
      return date.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "numeric",
      });
    }
    return "Unknown";
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

  navigateToTagPage(tagId: number): void {
    this.$router.push(`/tag/${tagId}`);
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

.content {
  font-size: 1.2rem;
  overflow-wrap: break-word;
}

.tag {
  cursor: pointer;
}

.left-align {
  text-align: left;
}
</style>
