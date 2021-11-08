<template>
  <layout :callback="callback"> </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import Layout from "@/layouts/Main.vue";
import firebase from "firebase";

@Component({
  components: {
    DialogBoxComponent,
    Layout,
  },
})
export default class LinkAccount extends Vue {
  informDialogBox = new DialogBox("informDialogBox");
  callback(firebaseUser: firebase.User, loadingDialogBox: DialogBox) {
    loadingDialogBox.dismiss();
    this.informDialogBox
      .show({
        dialogBoxContent: {
          title: "Linking your Account",
          content: "We are linking your GarBarn Account with LINE, Please wait",
        },
        dialogBoxActions: [],
      })
      .then(() => {
        this.informDialogBox.dismiss();
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "This feature is still in development",
            content: "You will be redirected back to account setting page.",
          },
          dialogBoxActions: [
            {
              buttonContent: "Close",
              buttonClass: "md-primary",
              onClick: () => {
                this.informDialogBox.dismiss();
                this.$router.replace("/account/");
              },
            },
          ],
        });
      });
  }
}
</script>
