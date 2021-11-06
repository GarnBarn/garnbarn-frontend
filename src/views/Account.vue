<template>
  <layout :callback="callback">
    <md-card class="account-card">
      <md-card-header>
        <div class="md-title">GarnBarn Account</div>
      </md-card-header>

      <md-card-content>
        <div class="setting-content">
          <div class="profile-image-box">
            <img
              class="profile-image"
              v-if="profileImage"
              :src="profileImage"
            />
            <img
              v-else
              class="profile-image"
              src="@/assets/images/account_placeholder.png"
              alt="Account"
            />
          </div>
          <div class="user-info">
            <AccountDetailCard title="Basic Information">
              <h3>Display Name:</h3>
              <p>{{ displayName }}</p>
              <h3>UID:</h3>
              <p>{{ uid }}</p>
            </AccountDetailCard>
            <AccountDetailCard title="Third party platform">
              <h3>LINE:</h3>
              <div>
                <md-button class="line-green"
                  ><img
                    class="line-logo"
                    src="@/assets/images/line_logo.png"
                  />Log In</md-button
                >
              </div>
              <i
                >Link your GarnBarn Account with LINE to recieve assignment
                notfication on LINE
              </i>
            </AccountDetailCard>
            <AccountDetailCard title="Account Management & Credential">
              <h3>
                ID Token:
                <md-icon
                  >help
                  <md-tooltip md-direction="right"
                    >ID Token is containing your account information and can be
                    used to access your GarnBarn Account. It will live for 1
                    hour after being generated.</md-tooltip
                  >
                </md-icon>
              </h3>
              <md-button
                class="md-secondary"
                v-if="!idTokenData.isShow"
                @click="onShowIdToken"
              >
                Show your ID Token
              </md-button>
              <md-field v-if="idTokenData.isShow">
                <label>ID Token</label>
                <md-textarea
                  v-model="idTokenData.idToken"
                  readonly
                ></md-textarea>
              </md-field>
            </AccountDetailCard>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "@/layouts/Main.vue";
import firebase from "firebase";
import DialogBox from "@/components/DialogBox/DialogBox";
import AccountDetailCard from "@/components/Account/AccountDetailCard.vue";

@Component({
  components: {
    Layout,
    AccountDetailCard,
  },
})
export default class Account extends Vue {
  idTokenData = {
    isShow: false,
    idToken: "",
  };
  user: firebase.User | null = null;
  informDialogBox = new DialogBox("informDialogBox");

  async callback(user: firebase.User, loadingDialogBox: DialogBox) {
    this.idTokenData.idToken = await user.getIdToken();
    loadingDialogBox.dismiss();
    this.user = user;
  }

  onShowIdToken() {
    this.informDialogBox.show({
      dialogBoxContent: {
        title: "Are you sure?",
        content:
          "ID Token is containing your account information and can be used to access your GarnBarn Account. Please proceed by your own risk.",
      },
      dialogBoxActions: [
        {
          buttonContent: "Yes",
          buttonClass: "md-secondary",
          onClick: () => {
            this.informDialogBox.dismiss();
            this.idTokenData.isShow = true;
          },
        },
        {
          buttonContent: "No",
          buttonClass: "md-primary",
          onClick: () => {
            this.informDialogBox.dismiss();
          },
        },
      ],
    });
  }

  get profileImage(): string | null | undefined {
    if (!this.user?.photoURL) {
      return null;
    }
    let url = this.user.photoURL;
    if (
      url.startsWith("https://lh3.googleusercontent.com/") &&
      url.endsWith("photo.jpg")
    ) {
      url += "?sz=400";
    } else {
      let splitted = url.split("=");
      url = splitted[0] + "=s400-c";
    }
    return url;
  }

  get displayName(): string | null | undefined {
    return this.user?.displayName;
  }

  get uid(): string | undefined {
    return this.user?.uid;
  }
}
</script>

<style>
.line-green {
  background-color: #06c755 !important;
  border-radius: 5px !important;
  color: white !important;
}

.line-logo {
  width: 30px;
  margin-right: 10px;
}

.profile-image-box {
  max-height: 200px;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

.profile-image-box .profile-image {
  border-radius: 100px;
  margin-left: auto;
  margin-right: auto;
}

.account-card {
  padding: 10px;
  border-radius: 20px;
  text-align: left;
}

.setting-content {
  width: 100%;
}
</style>
