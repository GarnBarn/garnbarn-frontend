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
          <center>
            <md-button
              class="md-accent md-raised rounded-button"
              @click="onSignOut"
              ><md-icon>exit_to_app</md-icon> Sign Out</md-button
            >
          </center>
          <div class="user-info">
            <AccountDetailCard title="Basic Information">
              <h3>Display Name:</h3>
              <p>{{ displayName }}</p>
              <h3>UID:</h3>
              <p>{{ uid }}</p>
            </AccountDetailCard>
            <AccountDetailCard title="Third party platform">
              <h3>LINE: <md-chip>Still in development</md-chip></h3>
              <div>
                <md-button class="line-green" @click="onClickLineLogin"
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
                    used to access your GarnBarn Account. It will life for 1
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
import garnBarnApiConfig from "@/GarnBarnApiConfig.json";

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

  callback(user: firebase.User, loadingDialogBox: DialogBox) {
    user
      .getIdToken()
      .then((idToken) => {
        this.idTokenData.idToken = idToken;
        loadingDialogBox.dismiss();
        this.user = user;
      })
      .catch((e) => {
        console.error(e);
        loadingDialogBox.dismiss();
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "An error occurred",
            content: e,
          },
          dialogBoxActions: [
            {
              buttonContent: "Try again",
              buttonClass: "md-primary",
              onClick: () => {
                this.callback(user, loadingDialogBox);
              },
            },
          ],
        });
      });
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

  onSignOut(): void {
    this.informDialogBox.show({
      dialogBoxContent: {
        title: "Are you sure?",
        content:
          "You are about to sign-out from this account. You can sign-in back again using the same Google Account you used to sign in before.",
      },
      dialogBoxActions: [
        {
          buttonContent: "Yes",
          buttonClass: "md-primary",
          onClick: () => {
            this.informDialogBox.dismiss().then(() => {
              this.onSignOutHander();
            });
          },
        },
        {
          buttonContent: "No",
          buttonClass: "md-secondary",
          onClick: () => {
            this.informDialogBox.dismiss();
          },
        },
      ],
    });
  }

  onSignOutHander(): void {
    this.informDialogBox
      .show({
        dialogBoxContent: {
          title: "Signing out",
          content: "Please wait.",
        },
        dialogBoxActions: [],
      })
      .then(() => {
        return firebase.auth().signOut();
      })
      .then(() => {
        this.informDialogBox.dismiss();
        this.$router.replace("/");
      });
  }

  generateLineLoginUrl() {
    let baseUrl = "https://access.line.me/oauth2/v2.1/authorize?";
    let currentPath = window.location.href.split("/");
    let redirectUri =
      currentPath[0] + "//" + currentPath[2] + "/account/linkAccount";

    baseUrl += "response_type=code&";
    baseUrl += `client_id=${garnBarnApiConfig.lineClientId}&`;
    baseUrl += `redirect_uri=${encodeURI(redirectUri)}&`;
    baseUrl += "state=line&";
    baseUrl += "scope=profile&";
    baseUrl += "garnbarn_third_party=line";
    return baseUrl;
  }

  onClickLineLogin() {
    const redirectUrl = window.location.href;
    this.informDialogBox.show({
      dialogBoxContent: {
        title: "You'll be redirected",
        content:
          "To signin with LINE, You will be redirect to LINE. Please accept all consent from LINE inorder to continue linking account.",
      },
      dialogBoxActions: [
        {
          buttonContent: "OK",
          buttonClass: "md-primary",
          onClick: () => {
            window.location.replace(this.generateLineLoginUrl());
          },
        },
        {
          buttonContent: "Cancel",
          buttonClass: "md-secondart",
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

.rounded-button {
  border-radius: 20px !important;
}
</style>