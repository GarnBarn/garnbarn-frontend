<template>
  <layout>
    <DateWithAssignment v-for="i in 10" :key="i"></DateWithAssignment>
  </layout>
</template>

<script lang="ts">
import Layout from "@/layouts/Main.vue";
import DateWithAssignment from "@/components/DateWithAssignment.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    Layout,
    DateWithAssignment,
  },
})
export default class Home extends Vue {}
</script>
