<template>
  <layout>
    <DateWithAssignment v-for="i in 10" :key="i"></DateWithAssignment>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/layouts/Main.vue";
import DateWithAssignment from "@/components/DateWithAssignment.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Layout,
    DateWithAssignment,
  },
});
</script>
