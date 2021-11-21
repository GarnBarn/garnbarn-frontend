<template>
  <layout :callback="callback">
    <assignment-detail :assignment="assignment">
      <template v-slot:authorPicture>
        <UserProfileIcon
          v-if="isReady"
          :uid="assignment.author"
          :garnBarnApiCaller="garnBarnAPICaller"
        ></UserProfileIcon>
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
    </assignment-detail>
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

          <md-tab md-label="Notification Settings">
            <notification-setting 
            :reminderTime="assignmentApi.reminderTime"
            ref="notificationSetting"></notification-setting>
          </md-tab>
        </md-tabs>
      </md-card-content>
    </DialogBoxComponent>
  </layout>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import DetailCard from "@/components/DetailCard.vue";
import NotificationSetting from "@/components/NotificationSetting.vue"
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import UserProfileIcon from "@/components/UserProfileIcon.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import Create from "@/components/Create.vue";
import AssignmentDetail from "@/components/Assignment/AssignmentDetail.vue";
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
    AssignmentDetail,
    Create,
    DialogBoxComponent,
    DetailCard,
    UserProfileIcon,
    TagBoxChip,
    NotificationSetting
  },
})
export default class AssignmentDetailView extends Vue {
  @Ref() readonly notificationSetting!: NotificationSetting;

  garnBarnAPICaller: GarnBarnApi | null = null;
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
    this.assignmentApi.reminderTime = this.filterValidReminderTime(
      this.processTimeDataToReminderTime(this.notificationSetting.timeData as TimeData[])
    );
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

  filterValidReminderTime(reminderTime: number[] | undefined): number[] | undefined{
    if (reminderTime) {
      return reminderTime.filter(time => time > 0)
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
      this.$router.push('/assignment');
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
</style>
