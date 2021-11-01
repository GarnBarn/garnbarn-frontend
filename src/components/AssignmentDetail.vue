<template>
  <div class="flex-col detail">
    <div class="name title">
      <p>{{ assignment.name }}</p>
    </div>
    <div class="tag">
      <tag-box :tag="assignment.tag"></tag-box>
    </div>
    <div class="description text-gray">
      <p class="header">Description:</p>
      <p class="content">{{ assignment.description }}</p>
    </div>
    <div v-if="this.assignment.dueDate" class="due-date text-gray">
      <p>Due Date:</p>
      <p class="formatted">{{ getFormatDate }}</p>
      <p>Submission Time:</p>
      <p class="formatted">{{ getFormatTime }}</p>
    </div>
    <div v-else class="due-date text-gray">
      <p>No Due Date</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import TagBox from "@/components/TagBox.vue";

@Component({
  components: {
    TagBox,
  },
})
export default class AssignmentDetail extends Vue {
  @Prop({ required: true }) readonly assignment!: Assignment;

  convertUnixTimeToDate(unix_timestamp: number): Date {
    var date = new Date(unix_timestamp);
    return date;
  }

  get getFormatDate(): string {
    const date = this.convertUnixTimeToDate(this.assignment.dueDate as number);
    if (date) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var formattedDate = date.getDate() + " " + monthNames[date.getMonth()];
      return formattedDate;
    }

    return "Unknown";
  }

  get getFormatTime(): string {
    const date = this.convertUnixTimeToDate(this.assignment.dueDate as number);
    if (date) {
      var formattedTime = date.getHours() + ":" + date.getMinutes();
      return formattedTime;
    }
    return "Unknown";
  }
}
</script>

<style scoped>
.detail {
  padding: 2rem 5rem;
}

.flex-col {
  flex: 1 1 0%;
  flex-direction: column;
  text-align: left;
}

.title {
  font-size: 2rem !important;
  height: fit-content;
}

.description {
  padding-right: 40%;
}

.description {
  font-size: 1.5rem;
}

.description .content {
  font-size: 1.2rem;
  overflow-wrap: break-word;
}

.due-date {
  font-size: 1.3rem;
}

.due-date .formatted {
  font-size: 1.2rem;
}

.text-gray {
  color: #616161;
}
</style>
