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
        <div class="md-subhead assignment-content">
          <tag-box :tag="assignment.tag" v-if="assignment.tag"></tag-box>
        </div>
        <div class="md-subhead assignment-content">
          Description: 
        </div>
        <div class="md-subhead assignment-content">
          Read about tips #2, #4, #16
        </div>
        <div class="md-subhead assignment-content">
          Submission time:
        </div>
        <div class="md-subhead assignment-content">
          <span class="">18:00</span>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import { DialogBox } from "@/components/DialogBox/DialogBox";
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

  navigateToAssignmentPage(assignmentId: string): void {
    // TODO: Route to assignment page
    // this.$router.push(`/assignment/${assignmentId}`);
    console.log("Route to " + assignmentId);
    this.informDialogBox.show({
      dialogBoxContent: {
        title: "Routed",
        content: "Routed to " + assignmentId,
      },
    });
  }
}
</script>

<style scoped>
.flex {
  flex: 1 1 0%;
  flex-direction: column;
}

.fit-content {
  width: fit-content;
  height: fit-content;
}

.big-text {
  font-size: 3.75rem !important;
  height: fit-content;
}

.assignment-content {
  text-align: left;
}

.assignment-card {
  border-radius: 50px;
  background-color: var(--background-color);
  color: var(--font-color);
  transition: 0.2s;
  cursor: pointer;
  height: 400px;
  width: 300px;
}

.assignment-card:hover {
  transform: scale(1.01);
}
</style>
