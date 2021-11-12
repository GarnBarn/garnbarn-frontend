<template>
  <layout :callback="callback"> </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import Layout from "@/layouts/Main.vue";
import firebase from "firebase/app";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { SupportThirdPartyPlatform } from "@/types/GarnBarnApi/AccountApi";
import GarnBarnApiconfig from "@/GarnBarnApiConfig.json";

@Component({
  components: {
    DialogBoxComponent,
    Layout,
  },
})
export default class LinkAccount extends Vue {
  informDialogBox = new DialogBox("informDialogBox");
  garnBarnApiCaller: GarnBarnApi | null = null;
  callback(firebaseUser: firebase.User, loadingDialogBox: DialogBox) {
    if (
      this.$router.currentRoute.query.state !== "line" ||
      !this.$router.currentRoute.query.code
    ) {
      this.$router.replace("/account");
    }
    loadingDialogBox.dismiss();
    this.garnBarnApiCaller = new GarnBarnApi(firebaseUser);
    this.informDialogBox
      .show({
        dialogBoxContent: {
          title: "Linking your Account",
          content: "We are linking your GarBarn Account with LINE, Please wait",
        },
        dialogBoxActions: [],
      })
      .then(() => {
        return this.garnBarnApiCaller?.v1.accounts.linkAccount(
          SupportThirdPartyPlatform.LINE,
          {
            code: this.$router.currentRoute.query.code as string,
            clientId: GarnBarnApiconfig.lineClientId,
            redirectUri: `${window.location.origin}${window.location.pathname}`,
          }
        );
      })
      .then((apiResponse) => {
        this.informDialogBox.dismiss();
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Successfully",
            content:
              "We are able to link your account with LINE Account. You will be redirect back to Account Setting Page.",
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
      })
      .catch((e) => {
        this.informDialogBox.dismiss();
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "An error occurred",
            content:
              e.message +
              ". You will be redirect back to Account Setting Page.",
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
