<template>
  <div class="flex">
    <div class="date">
      <h1>{{ dateString }}</h1>
    </div>
    <div class="assignment-list">
      <assignment-box
        v-for="assignment in assignmentsSorted"
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
  @Prop({ required: true }) readonly date!: Date;
  @Prop({ default: [] }) readonly assignments!: Array<Assignment>;

  get dateString(): string {
    return this.date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  get assignmentsSorted(): Array<Assignment> {
    this.assignments.sort((a, b) => {
      if (
        typeof a.dueDate === "undefined" ||
        typeof b.dueDate === "undefined"
      ) {
        return -1;
      }
      if (a.dueDate < b.dueDate) {
        return -1;
      }
      return 1;
    });
    return this.assignments;
  }
}
</script>

<style scoped>
.flex {
  flex: 1 1 0%;
  flex-direction: column;
  padding: 30px 0px 0px 30px;
}

.assignment-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  row-gap: 30px;
  transition: 0.1s;
}

@media only screen and (max-width: 800px) {
  .assignment-list {
    display: contents;
  }
}

.date {
  margin: 0px 0px 0px 10px;
}

h1 {
  text-align: left;
}
</style>
