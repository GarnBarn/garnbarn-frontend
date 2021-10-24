<template>
  <div class="box">
    <tag-box v-bind:="assignment.tagId"></tag-box>
    <md-card class="md-primary assignment-card">
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
import TagBox from "@/components/TagBox.vue";

@Component({
    components: {
      TagBox,
    }
  }
)
export default class AssignmentBox extends Vue {
  @Prop({ required: true }) readonly assignment!: Assignment;
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
}
</style>
