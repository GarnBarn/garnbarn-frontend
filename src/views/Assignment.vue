<template>
  <layout>
    <div>
      <AssignmentDetail :assignment=assignment></AssignmentDetail>
      <md-button class="md-primary md-raised">Mark As Done</md-button>
      <router-link to="/home">
        <md-button class="md-primary md-raised">Back</md-button>
      </router-link>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Assignment } from "@/types/garnbarn/Assignment";
import AssignmentDetail from  "@/components/AssignmentDetail.vue";
import Layout from "@/layouts/Main.vue";

@Component({
  components: {
    Layout,
    AssignmentDetail
  },
})
export default class AssignmentView extends Vue {
  assignmentId = Number(this.$route.params.id);
  assignment: Assignment = {
    id: this.assignmentId,
    name: "Test 1",
    tag: {
      id: 1,
      name: "Test Tag",
      color: "#30475E",
    },
    description: "The overflow-wrap property in CSS allows you to specify that the browser can break a line of text inside the targeted element onto multiple lines in an otherwise unbreakable place. This helps to avoid an unusually long string of text causing layout problems due to overflow.",
    dueDate: 1635336944
  }
}
</script>
