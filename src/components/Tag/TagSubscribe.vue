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
import DialogBox from "@/components/DialogBox/DialogBox";

@Component
export default class TagSubscribe extends Vue {
  id = "";
  totpBody: totpBody = {
    code: "",
  };
  informDialogBox = new DialogBox("informDialogBox");
}
</script>
