<template>
  <layout :callback="callback">
    <div>
      <md-table v-model="tags" md-sort="id">
        <md-table-toolbar>
          <div class="md-title left-align">
            All Tags <md-chip>Still in development</md-chip>
          </div>
          <md-button class="md-icon-button md-raised md-primary" @click="edit">
            <md-icon>add</md-icon>
            <md-tooltip> Create new Tag </md-tooltip>
          </md-button>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
            item.id
          }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="Author">
            <UserProfileIcon
              :uid="item.author"
              :garnBarnApiCaller="garnBarnAPICaller"
            >
            </UserProfileIcon>
          </md-table-cell>
          <md-table-cell md-label="Subscriber">
            <div
              v-if="item.subscriber && item.subscriber.length !== 0"
              class="row-flex"
            >
              <UserProfileIcon
                v-for="[index, subscriberUid] of item.subscriber.entries()"
                :key="index"
                :uid="subscriberUid"
                :garnBarnApiCaller="garnBarnAPICaller"
              >
              </UserProfileIcon>
            </div>
            <div v-else>
              <md-icon>minimize</md-icon>
            </div>
          </md-table-cell>
          <md-table-cell md-label="Color">
            <TagBoxChip :color="item.color" :text="item.color"></TagBoxChip>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <div class="load-next-box">
        <md-button class="md-secondary" v-if="getNextData" @click="processNext"
          >Load next Tags?</md-button
        >
        <h3 v-else><i>That all Tags you got.</i> ƪ(=ｘωｘ=ƪ)</h3>
      </div>
      <DialogBoxComponent
        :dialogBoxId="'createDialogBox'"
        :isCustomDialogBox="true"
        class="blur"
      >
        <md-card-content>
          <md-tabs md-dynamic-height>
            <md-tab md-label="Create">
              <Create
                :apiData="tagData"
                :creationType="creationType"
                md-dynamic-height
                ref="tagCreate"
              ></Create>
            </md-tab>

            <md-tab md-label="Delete" md-disabled>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                mollitia dolorum dolores quae commodi impedit possimus qui,
                atque at voluptates cupiditate. Neque quae culpa suscipit
                praesentium inventore ducimus ipsa aut.
              </p>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </DialogBoxComponent>
      <SecretQrDialog :tag="responseCreatedTag"> </SecretQrDialog>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import DialogBox from "@/components/DialogBox/DialogBox";
import Layout from "@/layouts/Main.vue";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import Create from "@/components/Create.vue";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import firebase from "firebase/app";
import { Tag } from "@/types/garnbarn/Tag";
import { GetAllTagApiNextFunctionWrapper } from "@/types/GarnBarnApi/GarnBarnApiResponse";
import UserProfileIcon from "@/components/UserProfileIcon.vue";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import SecretQrDialog from "@/components/Tag/SecretQrDialog.vue";

@Component({
  components: {
    Layout,
    DialogBoxComponent,
    Create,
    UserProfileIcon,
    TagBoxChip,
    SecretQrDialog,
  },
})
export default class Tags extends Vue {
  @Ref() readonly tagCreate!: Create;

  createDialogBox = new DialogBox("createDialogBox");
  loadingDialogBox = new DialogBox("loadingDialogBox");
  informDialogBox = new DialogBox("informDialogBox");
  creationType = "tag";
  tagData: TagApi = {
    name: undefined,
    color: undefined,
    reminderTime: [],
    subscriber: undefined,
  };
  responseCreatedTag: Tag = {
    id: 0,
    name: "",
    secretKeyTotp: "",
    author: "",
  };
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
  tags: Array<Tag> = [];
  getNextData: GetAllTagApiNextFunctionWrapper | null = null;

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.garnBarnAPICaller.v1.tags.all().then((apiResponse) => {
      this.tags = this.tags.concat(apiResponse.data.results);
      this.getNextData = apiResponse.data.next;
      loadingDialogBox.dismiss();
    });
  }

  processNext(): void {
    this.informDialogBox
      .show({
        dialogBoxContent: {
          title: "Grabing Data",
          content: "Grabing data from GarnBarn API",
        },
        dialogBoxActions: [],
      })
      .then(() => {
        if (!this.getNextData) {
          return Promise.reject("No next function");
        }
        return this.getNextData();
      })
      .then((apiResponse) => {
        this.tags = this.tags.concat(apiResponse.data.results);
        this.getNextData = apiResponse.data.next;
        this.informDialogBox.dismiss();
      });
  }

  edit(): void {
    this.createDialogBox.show({
      dialogBoxActions: [
        {
          buttonContent: "Save",
          buttonClass: "md-primary md-raised",
          onClick: async (): Promise<void> => {
            this.createTag();
            this.createDialogBox.dismiss();
          },
        },
        {
          buttonContent: "Exit",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.createDialogBox.dismiss();
          },
        },
      ],
    });
  }

  createTag(): void {
    this.garnBarnAPICaller?.v1.tags
      .create(this.tagCreate.apiData as TagApi)
      .then((apiResponse) => {
        this.responseCreatedTag = apiResponse.data;
        const secretQrCodeDialog = new DialogBox("secretQrDialog");
        secretQrCodeDialog.show({
          dialogBoxActions: [
            {
              buttonContent: "Close",
              buttonClass: "md-secondary",
              onClick: () => {
                this.informDialogBox.show({
                  dialogBoxContent: {
                    title: "Are you sure?",
                    content:
                      "This will only show only at the first time you create the tag. Loosing this key will lost tag subscriber control permanently",
                  },
                  dialogBoxActions: [
                    {
                      buttonContent: "Yes",
                      buttonClass: "md-primary",
                      onClick: () => {
                        if (
                          !this.garnBarnAPICaller?.v1.assignments.getFirebaseUser()
                        ) {
                          return;
                        }
                        this.loadingDialogBox.show();
                        this.tags = [];
                        this.callback(
                          this.garnBarnAPICaller?.v1.tags.getFirebaseUser(),
                          this.loadingDialogBox
                        );
                        this.informDialogBox.dismiss();
                        secretQrCodeDialog.dismiss();
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
              },
            },
          ],
        });
      })
      .catch((e) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "An Error occurred",
            content: e.message,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-primary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
                this.edit();
              },
            },
          ],
        });
      });
  }
}
</script>

<style scoped>
.blur {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.left-align {
  text-align: left;
}

.row-flex {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 3px;
  max-width: 500px;
}
</style>
