<template>
  <div @click="navigateToAssignmentPage(assignment.id)">
    <md-card
      class="assignment-card flex"
      :style="`--background-color: ${boxColor}; --font-color: ${fontColor}`"
    >
      <md-card-header class="flex">
        <div class="md-title assignment-content big-text">
          {{ assignment.name }}
        </div>
      </md-card-header>
      <md-card-content class="flex">
        <div class="assignment-content">
          <tag-box
            class="assignment-tag"
            :tag="assignment.tag"
            v-if="assignment.tag"
          ></tag-box>

          <div class="submission-time inline-flex">
            <md-icon>watch_later</md-icon>
            <p>Submission Time: {{ timeString }}</p>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import DialogBox from "@/components/DialogBox/DialogBox";
import TagBox from "@/components/TagBox.vue";

@Component({
  components: {
    TagBox,
  },
})
export default class AssignmentBox extends Vue {
  @Prop({ required: true }) readonly assignment!: Assignment;
  boxColor = "#f9f9f9";
  fontColor = "#000000";
  informDialogBox = new DialogBox("informDialogBox");

  beforeMount(): void {
    if (this.assignment.tag?.color) {
      this.boxColor = this.assignment.tag.color;
    }
    const rgbOfBoxColor: Array<number> = this.hexToRgb(this.boxColor);
    this.fontColor = this.getFontColor(rgbOfBoxColor);
  }

  hexToRgb(hex: string): Array<number> {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  getFontColor(rgb: Array<number>): string {
    if (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186) {
      return "#000000";
    } else {
      return "#ffffff";
    }
  }

  navigateToAssignmentPage(assignmentId: number): void {
    this.$router.push(`/assignment/${assignmentId}`);
  }

  get timeString(): string {
    if (typeof this.assignment.dueDate === "undefined") {
      return "Unknown";
    }
    const date = new Date(this.assignment.dueDate);
    return date.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });
  }
}
</script>

<style scoped>
.flex {
  flex: 1 1 0%;
  flex-direction: column;
}

.inline-flex {
  display: inline-flex;
}

.big-text {
  font-size: 3rem !important;
  height: fit-content;
}

.assignment-content {
  text-align: left;
}

.assignment-card {
  border-radius: 20px;
  background-color: var(--background-color);
  color: var(--font-color);
  transition: 0.2s;
  cursor: pointer;
  padding: 10px;
  min-width: 250px;
  height: auto;
  max-height: 500px;
}

@media only screen and (max-width: 800px) {
  .big-text {
    font-size: 2.5rem !important;
  }
  .assignment-card {
    margin: 20px;
  }
}

.assignment-tag {
  opacity: 0.54;
}

.submission-time {
  color: var(--font-color);
  font-size: 1.2rem;
}

.submission-time p {
  margin-left: 5px;
}

.assignment-card:hover {
  transform: scale(1.05);
}
</style>
