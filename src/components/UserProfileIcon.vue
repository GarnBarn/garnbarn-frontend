<template>
  <div>
    <div v-if="isReady">
      <img v-if="author" class="profile-image" :src="author.profileImage" />
      <img
        v-else
        class="profile-image"
        src="@/assets/images/account_placeholder.png"
      />
      <md-tooltip>{{ author ? author.displayName : "Unknown" }}</md-tooltip>
    </div>
    <md-progress-spinner
      v-else
      :md-diameter="20"
      :md-stroke="3"
      md-mode="indeterminate"
    ></md-progress-spinner>
  </div>
</template>

<script lang="ts">
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { AccountDetail } from "@/types/GarnBarnApi/AccountApi";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class UserProfileIcon extends Vue {
  @Prop({ required: true }) uid!: string;
  @Prop({ required: true }) garnBarnApiCaller!: GarnBarnApi | null;
  author: AccountDetail | null = null;
  isReady = false;

  mounted() {
    this.getDataFromAccountApi();
  }

  getDataFromAccountApi() {
    this.garnBarnApiCaller?.v1.accounts
      .getAccountDetail(this.uid)
      .then((apiResponse) => {
        this.isReady = true;
        this.author = apiResponse.data;
      })
      .catch((e) => {
        console.error(e);
        this.isReady = true;
      });
  }
}
</script>

<style scoped>
.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 100px;
}
</style>
