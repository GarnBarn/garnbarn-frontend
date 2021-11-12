<template>
  <md-chip
    v-if="color"
    :style="`background-color: ${color} !important; color: ${getFontColor(
      color
    )} !important`"
    >{{ text }}</md-chip
  >
  <md-chip v-else :style="`background-color: #f9f9f9 !important;`"
    >#f9f9f9</md-chip
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TagBoxChip extends Vue {
  @Prop({ required: true }) color!: string;
  @Prop({ required: true }) text!: string;

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
}
</script>
