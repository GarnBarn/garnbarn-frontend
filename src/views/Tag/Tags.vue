<template>
  <layout :callback="callback">
    <div>
      <md-table v-model="tags" md-sort="id">
        <md-table-toolbar>
          <div class="md-title left-align">All Tags</div>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
            item.id
          }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name" class="left-align">{{
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
          <md-table-cell md-numeric>
            <md-menu md-size="small" md-align-trigger>
              <md-button md-menu-trigger class="md-icon-button">
                <md-icon> more_horiz </md-icon>
              </md-button>
              <md-menu-content>
                <md-menu-item @click="unsubscribe(item)">
                  Unsubscribe
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <div class="load-next-box">
        <md-button class="md-secondary" v-if="getNextData" @click="processNext"
          >Load next Tags?</md-button
        >
        <h3 v-else><i>That all Tags you got.</i> ƪ(=ｘωｘ=ƪ)</h3>
      </div>
        <md-speed-dial :class="bottomPosition" class="md-bottom-right">
        <md-speed-dial-target class="md-primary">
          <md-icon class="md-morph-initial">menu</md-icon>
          <md-icon class="md-morph-final">edit</md-icon>
        </md-speed-dial-target>

        <md-speed-dial-content>
          <md-button class="md-icon-button" @click="edit">
            <md-icon>add</md-icon>
            <md-tooltip> Create new Tag </md-tooltip>
          </md-button>

          <md-button class="md-icon-button" @click="subscribe">
            <md-icon>notification_add</md-icon>
            <md-tooltip> Subscribe to a Tag </md-tooltip>
          </md-button>
        </md-speed-dial-content>
      </md-speed-dial>
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

            <md-tab md-disabled>
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
            <DialogBoxComponent
        :dialogBoxId="'subscribeDialogBox'"
        :isCustomDialogBox="true"
        class="blur"
      >
        <md-card-content>
          <md-tabs md-dynamic-height>
            <md-tab md-label="Subscribe">
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

@Component({
  components: {
    Layout,
    DialogBoxComponent,
    Create,
    UserProfileIcon,
    TagBoxChip,
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
  garnBarnAPICaller: GarnBarnApi | undefined = undefined;
  firebaseUser: firebase.User | undefined = undefined;
  tags: Array<Tag> = [];
  getNextData: GetAllTagApiNextFunctionWrapper | null = null;

  callback(user: firebase.User, loadingDialogBox: DialogBox): void {
    this.garnBarnAPICaller = new GarnBarnApi(user);
    this.garnBarnAPICaller.v1.tags.all().then((apiResponse) => {
      this.tags = this.tags.concat(apiResponse.data.results);
      this.getNextData = apiResponse.data.next;
      loadingDialogBox.dismiss();
    });
    this.firebaseUser = user;
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
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Tag created",
            content: `Your Tag has been created with id ${apiResponse.data.id}`,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                this.informDialogBox.dismiss();
                if (!this.garnBarnAPICaller?.v1.assignments.getFirebaseUser()) {
                  return;
                }
                this.loadingDialogBox.show();
                this.tags = [];
                this.callback(
                  this.garnBarnAPICaller?.v1.tags.getFirebaseUser(),
                  this.loadingDialogBox
                );
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

  subscribe(tag: Tag): void {
    this.garnBarnAPICaller?.v1.tags
      .subscribe(tag.id)
      .then((apiResponse) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Tag subscribed",
            content: `You have subscribed to ${tag.name}.`,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                this.informDialogBox.dismiss();
              },
            },
          ],
        });
      })
      .catch((e) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Error",
            content: e.message,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
              },
            },
          ],
        });
      });
  }

  unsubscribe(tag: Tag): void {
    this.garnBarnAPICaller?.v1.tags
      .unsubscribe(tag.id)
      .then((apiResponse) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Tag unsubscribed",
            content: `You have unsubscribed from ${tag.name}.`,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
              },
            },
          ],
        });
      })
      .catch((e) => {
        this.informDialogBox.show({
          dialogBoxContent: {
            title: "Error",
            content: e.message,
          },
          dialogBoxActions: [
            {
              buttonContent: "Ok",
              buttonClass: "md-secondary",
              onClick: async () => {
                await this.informDialogBox.dismiss();
              },
            },
          ],
        });
      });
  }

  getSubscriberDetail(uid: string) {
    if (uid === this.firebaseUser?.uid) {
      return {
        displayName: this.firebaseUser.displayName,
        profileImage: this.firebaseUser.photoURL,
      };
    }
    // TODO: After User API is ready, Edit these line to get data from it..
    return {
      displayName: "Unknown",
      profileImage: null,
    };
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

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 100px;
}

.flex-start {
  display: flex;
  justify-content: flex-start;
}

.left-align {
  margin-left: 0;
  margin-right: auto;
}

.row-flex {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 3px;
  max-width: 500px;
}
</style>
