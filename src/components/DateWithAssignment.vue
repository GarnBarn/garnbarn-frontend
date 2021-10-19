<template>
    <div class="flex">
        <div class="date">
            <h1>18 Sep.</h1>
        </div>
        <assignment-box v-for="index in 2" :key="index"></assignment-box>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AssignmentBox from "@/components/AssignmentBox.vue";

@Component({
  components: {
    AssignmentBox,
  },
})
export default class DateWithAssignment extends Vue {}

</script>

<style scoped>
.flex {
    flex: 1 1 0%;
    flex-direction: column;
    padding: 30px 0px 0px 30px;
}

.date {
    margin: 0px 0px 0px 10px;
}

h1 {
    text-align: left;
}

</style>