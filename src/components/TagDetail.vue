<template>
  <div>    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";
import TagBox from "@/components/TagBox.vue";

@Component({
  components: {
    TagBox,
  },
})
export default class TagDetail extends Vue {
  @Prop({ required: true }) readonly tag!: Tag;
}
</script>

<style scoped>
</style>
