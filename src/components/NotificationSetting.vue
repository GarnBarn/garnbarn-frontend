<template>
  <div class="flex-col">
    <p class="md-title">Reminder time:</p>
    <p class="md-body-1">Time to notify before due date.</p>
    <div v-for="(time, index) in timeData" :key="index" class="small-box flex-row">
      <md-field>
        <md-input v-model="time.time"></md-input>
      </md-field>
      <md-field>
        <md-select v-model="time.unit">
          <md-option :value="value" v-for="(value, key) in timeUnits" :key="key">
            {{ key }}
          </md-option>
        </md-select>
      </md-field>

      <md-button class="md-dense md-primary" @click="deleteReminder(index)">
        <md-icon>close</md-icon>
      </md-button>
    </div>
    <md-button class="md-dense md-primary" @click="addReminder"
      >Add Notification</md-button
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import DialogBox from "@/components/DialogBox/DialogBox";

export type TimeData = {
  time: number;
  unit: number;
};

@Component
export default class NotificationSetting extends Vue {
  @Prop({ required: true }) reminderTime!: number[];
  informDialogBox = new DialogBox("informDialogBox");
  timeData: TimeData[] | null = null;

  created(): void {
    this.timeData = this.processReminderTimetoTimeData(this.reminderTime);
  }

  timeUnits = {
    Day: 86400,
    Hour: 3600,
    Minute: 60,
  };

  addReminder(): void {
    if (this.timeData && this.timeData.length >= 3) {
      this.informDialogBox.show({
        dialogBoxContent: {
          title: "Max reminder time",
          content: `You can have only 3 reminder time.`,
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
    } 
    else {
      this.timeData?.push({
        time: 6,
        unit: 3600,
      });
    }
  }

  deleteReminder(index: number): void {
    this.timeData?.splice(index, 1);
  }

  processReminderTimetoTimeData(reminderTime: number[] | null): TimeData[] | null {
    if (reminderTime) {
      var timeData: Array<TimeData> = [];

      reminderTime.forEach((unixTime) =>
        timeData.push(this.getTimeDataFromUnixTime(unixTime))
      );

      return timeData;
    }
    
    return null;
  }

  getTimeDataFromUnixTime(unixTime: number): TimeData {
    var timeData = {
      time: 0,
      unit: 0,
    };

    var day = Math.floor(unixTime / 86400);
    unixTime -= day * 86400;
    if (day >= 1) {
      timeData.time = day;
      timeData.unit = this.timeUnits.Day;
    }

    var hour = Math.floor(unixTime / 3600) % 24;
    unixTime -= hour * 3600;
    if (hour >= 1) {
      timeData.time = hour;
      timeData.unit = this.timeUnits.Hour;
    }

    var minute = Math.floor(unixTime / 60) % 60;
    unixTime -= minute * 60;
    if (minute >= 1) {
      timeData.time = minute;
      timeData.unit = this.timeUnits.Minute;
    }

    return timeData;
  }

}
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.small-box {
  width: 10% !important;
}

</style>