<template>
  <layout>
    <DateWithAssignment
      v-for="assignmentInDay in assignments.dateWithAssignments"
      :key="assignments.dateWithAssignments.indexOf(assignmentInDay)"
      :dateString="assignmentInDay.date"
      :assignments="assignmentInDay.assignments"
    ></DateWithAssignment>
  </layout>
</template>

<script lang="ts">
import Layout from "@/layouts/Main.vue";
import DateWithAssignment from "@/components/DateWithAssignment.vue";
import { Component, Vue } from "vue-property-decorator";
import { DateWithAssignments } from "@/types/garnbarn/Assignment";

@Component({
  components: {
    Layout,
    DateWithAssignment,
  },
})
export default class Home extends Vue {
  assignments: DateWithAssignments = {
    dateWithAssignments: [
      {
        date: "12 Sep.",
        assignments: [
          {
            id: "1",
            name: "Test 1",
            tag: {
              id: "1",
              name: "Test Tag",
              color: "#30475E",
            },
          },
          {
            id: "2",
            name: "Test 2",
            tag: {
              id: "2",
              name: "Tag 2",
              color: "#ff9e59",
            },
          },
        ],
      },
      {
        date: "20 Oct.",
        assignments: [
          {
            id: "3",
            name: "Test 3",
            tag: {
              id: "3",
              name: "Tag 3",
              color: "#ffbf59",
            },
          },
        ],
      },
      {
        date: "30 Oct.",
        assignments: [
          {
            id: "4",
            name: "Test 4",
            tag: {
              id: "3",
              name: "Tag 3",
              color: "#CBAF87",
            },
          },
          {
            id: "5",
            name: "Test 5",
          },
          {
            id: "6",
            name: "Test 6",
          },
        ],
      },
    ],
  };
}
</script>
