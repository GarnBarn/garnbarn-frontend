<template>
  <DialogBoxComponent :dialogBoxId="'secretQrDialog'" :isCustomDialogBox="true">
    <md-card-header>
      <div class="md-title">Tag Created with id {{ tag.id }}</div>
    </md-card-header>
    <md-card-content>
      <center>
        <div class="md-subtitle">
          This QR Code contained the secret key for TOTP generator.<br />
          Please add it to your
          <img
            class="authenticator-logo"
            src="@/assets/images/authenticator.png"
          />
          Authenticator App as it is required for the other to subscribe your
          tag
        </div>
        <img
          :src="`https://chart.googleapis.com/chart?cht=qr&chl=${getAuthAppUrl()}&chs=180x180&choe=UTF-8`"
        />
        <p>Or manually enter secret: {{ tag.secretKeyTotp }}</p>
        <md-divider></md-divider>
        <h4 class="md-accent">
          This secret will only be displayed at the first time.<br />
          Loosing this key will lost tag subscriber control permanently
        </h4>
      </center>
    </md-card-content>
  </DialogBoxComponent>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Tag } from "@/types/garnbarn/Tag";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";

@Component({
  components: {
    DialogBoxComponent,
  },
})
export default class SecretQrDialog extends Vue {
  @Prop({ required: true }) tag!: Tag;

  getAuthAppUrl() {
    return `otpauth://totp/GarnBarn%20%28Tag%3A%20${this.tag.id}%29?secret=${this.tag.secretKeyTotp}`;
  }
}
</script>

<style scoped>
.authenticator-logo {
  width: 30px;
  height: 30px;
}
</style>
