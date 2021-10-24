<template>
  <div class="flex">
    <div class="date">
      <h1>{{ dateString }}</h1>
    </div>
    <div class="grid">
      <assignment-box
        v-for="assignment in assignments"
        :key="assignments.indexOf(assignment)"
        :assignment="assignment"
      ></assignment-box>
    </div>
  </div>
</template>

<script lang="ts">
import { Assignment } from "@/types/garnbarn/Assignment";
import { Component, Prop, Vue } from "vue-property-decorator";
import AssignmentBox from "@/components/AssignmentBox.vue";

@Component({
  components: {
    AssignmentBox,
  },
})
export default class DateWithAssignment extends Vue {
  @Prop({ required: true }) readonly dateString!: string;
  @Prop({ default: [] }) readonly assignments!: Array<Assignment>;
}
</script>

<style scoped>
.flex {
  flex: 1 1 0%;
  flex-direction: column;
  padding: 30px 0px 0px 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.125rem;
}

.date {
  margin: 0px 0px 0px 10px;
}

h1 {
  text-align: left;
}
</style>
