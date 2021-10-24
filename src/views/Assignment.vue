<template>
  <layout>
    <div>
      <p>Assignment ID to fetch: {{ assignmentId }}</p>
      <router-link to="/home">
        <md-button class="md-primary md-raised">Back</md-button>
      </router-link>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/layouts/Main.vue";

@Component({
  components: {
    Layout,
  },
})
export default class AssignmentView extends Vue {
  assignmentId: string = this.$route.params.id;
}
</script>
