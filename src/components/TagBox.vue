<template>
  <div>
    <md-card class="tag-box" :style="`--background-color: ${tagColor};`">
      <div class="tag-box-content h2">{{ tag.name }}</div>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";

// binded value are at $attrs not tag prop.
// TODO: set inheritattrs: false
@Component
export default class TagBox extends Vue {
  @Prop({ required: true }) readonly tag!: Tag;
  tagColor = "#f9f9f9";

  beforeMount() {
    if (this.tag.color) {
      this.tagColor = this.tag.color;
    }
  }
}
</script>

<style scoped>
.tag-box {
  width: fit-content;
  border-radius: 20px;
  background-color: var(--background-color);
}

.tag-box-content {
  padding: 10px;
  color: #ffffff;
}
</style>
