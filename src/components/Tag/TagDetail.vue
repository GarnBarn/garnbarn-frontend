<template>
  <div class="grid">
    <div class="full-left-grid border">
      <p><md-icon class="md-size-2x">tag</md-icon></p>
      <p class="md-display-3">{{ tag.name }}</p>
      <tag-box-chip :color="tag.color" :text="tag.color"></tag-box-chip>
    </div>
    <div class="upper-right-grid">
      <detail-card :title="detailCardTexts.author" v-if="tag.author">
        <slot name="authorPicture"></slot>
      </detail-card>
      <detail-card :title="detailCardTexts.subscriber">
        <div v-if="tag.subscriber && tag.subscriber.length !== 0" class="flex">
          <slot name="subscriberPicture"></slot>
        </div>
        <div v-else>
          <md-icon>minimize</md-icon>
        </div>
      </detail-card>
      <detail-card :title="detailCardTexts.reminderTime">
        <div v-if="tag.reminderTime && tag.reminderTime.length !== 0">
          <md-chip
            v-for="time in tag.reminderTime"
            :key="time"
            :style="`background-color: ${
              tag.color
            } !important; color: ${getFontColor(tag.color)} !important`"
            ><md-icon>notifications</md-icon
            >{{ getHumanReadableTime(time) }}</md-chip
          >
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
import { Tag } from "@/types/garnbarn/Tag";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import DetailCard from "@/components/DetailCard.vue";

@Component({
  components: {
    TagBoxChip,
    DetailCard,
  },
})
export default class TagDetail extends Vue {
  @Prop({ required: true }) readonly tag!: Tag;

  detailCardTexts = {
    author: "Author: ",
    subscriber: "Subscribers: ",
    reminderTime: "Reminder Time: ",
  };

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

.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
