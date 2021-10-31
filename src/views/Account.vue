<template>
  <layout :callback="callback">
    <md-card class="account-card">
      <md-card-header>
        <div class="md-title">Temporary Account Detail Card</div>
      </md-card-header>

      <md-card-content>
        <div class="setting-content">
          <h3>* UID:</h3>
          <md-field>
            <label></label>
            <md-input v-model="uid" readonly></md-input>
          </md-field>
          <h3>
            * ID Token (For development purpos only!, Please use it at your own
            risk):
          </h3>
          <md-button
            class="md-primary"
            v-if="!idTokenData.isShow"
            @click="idTokenData.isShow = true"
          >
            Show your ID Token
          </md-button>
          <md-field v-if="idTokenData.isShow">
            <label>ID Token</label>
            <md-textarea v-model="idTokenData.idToken" readonly></md-textarea>
          </md-field>
        </div>
      </md-card-content>
    </md-card>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "@/layouts/Main.vue";
import firebase from "firebase";
import { DialogBox } from "@/components/DialogBox/DialogBox";

@Component({
  components: {
    Layout,
  },
})
export default class Account extends Vue {
  idTokenData = {
    isShow: false,
    idToken: "",
  };
  uid = "";

  async callback(user: firebase.User, loadingDialogBox: DialogBox) {
    this.idTokenData.idToken = await user.getIdToken();
    this.uid = user.uid;
    loadingDialogBox.dismiss();
  }
}
</script>

<style scoped>
.account-card {
  padding: 10px;
}

.setting-content {
  text-align: left;
}
</style>
