<template>
  <div class="box">
    <md-card
      class="md-primary assignment-card"
      :style="`--background-color: ${boxColor}; --font-color: ${fontColor}`"
    >
      <md-card-header>
        <div class="md-title assignment-content">{{ assignment.name }}</div>
      </md-card-header>
      <md-card-content>
        <div class="md-subhead assignment-content">Read #2, #4, #16 tips</div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";

@Component
export default class AssignmentBox extends Vue {
  @Prop({ required: true }) readonly assignment!: Assignment;
  boxColor = "#f9f9f9";
  fontColor = "#000000";

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
}
</script>

<style scoped>
.assignment-content {
  text-align: left;
}

.box {
  margin: 30px 0px;
}

.assignment-card {
  border-radius: 20px;
  background-color: var(--background-color);
  color: var(--font-color);
}
</style>
