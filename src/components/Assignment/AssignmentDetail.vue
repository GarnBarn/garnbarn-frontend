<template>
  <div class="grid">
    <div class="full-left-grid border">
      <p><md-icon class="md-size-2x">assignment</md-icon></p>
      <p class="md-display-3 wrap">{{ assignment.name }}</p>
      <div v-if="assignment.tag" @click="navigateToTagPage(assignment.tag.id)">
        <TagBoxChip
          :color="assignment.tag.color"
          :text="assignment.tag.name"
          class="tag"
        ></TagBoxChip>
      </div>
      <p class="md-subheading">
        Due Date: {{ assignment.dueDate ? this.getFormatDate : "-" }}
      </p>
      <p class="md-subheading">
        Submission Time: {{ assignment.dueDate ? this.getFormatTime : "-" }}
      </p>
    </div>
    <div class="upper-right-grid">
      <detail-card :title="detailCardTexts.author">
        <slot name="authorPicture"></slot>
      </detail-card>
      <detail-card :title="detailCardTexts.description">
        <div v-if="assignment.description">
          <p class="content">{{ assignment.description }}</p>
        </div>
        <div v-else>
          <md-icon>minimize</md-icon>
        </div>
      </detail-card>
      <detail-card :title="detailCardTexts.reminderTime">
        <div
          v-if="assignment.reminderTime && assignment.reminderTime.length !== 0"
        >
          <div v-if="assignment.tag">
            <md-chip
              v-for="time in assignment.reminderTime"
              :key="time"
              :style="`background-color: ${
                assignment.tag.color
              } !important; color: ${getFontColor(
                assignment.tag.color
              )} !important`"
              ><md-icon>notifications</md-icon
              >{{ getHumanReadableTime(time) }}</md-chip
            >
          </div>
          <div v-else>
            <md-chip
              v-for="time in assignment.reminderTime"
              :key="time"
              :style="`background-color: #cef4eb !important; color: ${getFontColor(
                `#cef4eb`
              )} !important`"
              ><md-icon>notifications</md-icon
              >{{ getHumanReadableTime(time) }}</md-chip
            >
          </div>
        </div>
        <div v-else>
          <md-icon>minimize</md-icon>
        </div>
      </detail-card>
    </div>
    <div class="lower-right-grid">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import DetailCard from "@/components/DetailCard.vue";

@Component({
  components: {
    TagBoxChip,
    DetailCard,
  },
})
export default class AssignmentDetail extends Vue {
  @Prop({ required: true }) readonly assignment!: Assignment;

  detailCardTexts = {
    author: "Author: ",
    description: "Description: ",
    reminderTime: "Reminder Time: ",
  };

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

  hexToRgb(hex: string): Array<number> {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  getFontColor(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186) {
      return "#000000";
    } else {
      return "#ffffff";
    }
  }

  navigateToTagPage(tagId: number): void {
    this.$router.push(`/tag/${tagId}`);
  }
}
</script>

<style scoped>
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

.left-align {
  text-align: left;
}

.wrap {
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  max-width: 500px;
}
</style>
