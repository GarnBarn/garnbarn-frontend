<template>
  <div>
    <md-field>
      <label>Tag ID:</label>
      <md-input v-model="id" required></md-input>
    </md-field>
    <md-field>
      <label>TOTP code:</label>
      <md-input v-model="totpBody.code" required></md-input>
    </md-field>
  </div>
</template>

<script lang="ts">
import { totpBody } from "@/types/GarnBarnApi/TagApi";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TagSubscribe extends Vue {
  id: number | null = null;
  totpBody: totpBody = {
    code: "",
  };

  get parsedId(): number {
    if (!this.id) {
      throw new Error("The inputted id from user is null");
    }
    return this.id;
  }
}
</script>
