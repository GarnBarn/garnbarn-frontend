<template>
  <div>
    <md-card
      class="tag-box zero-x-margin"
      v-bind:style="{ backgroundColor: tagColor }"
    >
      <div class="tag-box-content h2">{{ tag.name }}</div>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";

@Component
export default class TagBox extends Vue {
  @Prop({ required: true }) readonly tag!: Tag;
  tagColor = "#000000";
}
</script>

<style scoped>
.zero-x-margin {
  margin: 10px 0px !important;
}

.tag-box {
  width: fit-content;
  border-radius: 30px;
}

.tag-box-content {
  padding: 10px;
  color: #ffffff;
}
</style>
