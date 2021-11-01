<template>
  <md-dialog
    :md-active.sync="dialogBox.active"
    :md-close-on-esc="dialogBox.dialogConfig.config.closeOnEsc"
    :md-click-outside-to-close="
      dialogBox.dialogConfig.config.clickOutsideToClose
    "
    :md-fullscreen="dialogBox.dialogConfig.config.fullscreen"
  >
    <md-dialog-title v-if="!isCustomDialogBox">{{
      dialogBox.dialogConfig.dialogBoxContent.title
    }}</md-dialog-title>

    <md-dialog-content v-if="!isCustomDialogBox">
      {{ dialogBox.dialogConfig.dialogBoxContent.content }}
    </md-dialog-content>

    <slot v-else></slot>

    <md-dialog-actions
      v-if="dialogBox.dialogConfig.dialogBoxActions.length !== 0"
    >
      <div
        v-for="action in dialogBox.dialogConfig.dialogBoxActions"
        :key="dialogBox.dialogConfig.dialogBoxActions.indexOf(action)"
      >
        <md-button
          :class="action.buttonClass + ' action-button'"
          id="actionButton"
          @click="action.onClick"
        >
          <div>
            {{ action.buttonContent }}
          </div>
        </md-button>
      </div>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DialogConfig } from "@/types/components/DialogBox";
import DialogBoxEventBus, { DialogEvent } from "./DialogBoxEventBus";

@Component
export default class DialogBoxComponent extends Vue {
  @Prop({ required: true }) readonly dialogBoxId!: string;
  @Prop({ default: false }) readonly isCustomDialogBox!: boolean;
  dialogBox = {
    active: false,
    dialogConfig: {
      config: {
        closeOnEsc: false,
        clickOutsideToClose: false,
        fullscreen: false,
      },
      dialogBoxContent: {
        title: "",
        content: "",
      },
      dialogBoxActions: [
        {
          buttonContent: "close",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.dialogBox.active = false;
          },
        },
      ],
    },
  };

  mounted(): void {
    DialogBoxEventBus.$on(DialogEvent.show, (dialogConfig: DialogConfig) => {
      if (dialogConfig.dialogBoxId !== this.dialogBoxId) {
        return;
      }
      if (
        !this.isCustomDialogBox &&
        typeof dialogConfig.dialogBoxContent === "undefined"
      ) {
        DialogBoxEventBus.$emit(`RESPONSE-${this.dialogBoxId}`, {
          success: false,
          message:
            "dialogBoxContent must be specified since " +
            this.dialogBoxId +
            " dialog is not a customDialog",
        });
        return;
      }
      this.dialogBox.active = false;
      this.$set(this.dialogBox, "dialogConfig", dialogConfig);
      this.dialogBox.active = true;
      DialogBoxEventBus.$emit(`RESPONSE-${this.dialogBoxId}`, {
        success: true,
      });
    });
    DialogBoxEventBus.$on(DialogEvent.dismiss, (config: DialogConfig) => {
      if (config.dialogBoxId !== this.dialogBoxId) {
        return;
      }
      this.$data.dialogBox.active = false;
      DialogBoxEventBus.$emit(`RESPONSE-${this.dialogBoxId}`, {
        success: true,
      });
    });
  }
}
</script>

<style scoped>
.action-button {
  margin: 5px !important;
  border-radius: 100px;
}

.md-dialog /deep/.md-dialog-container {
  max-width: 768px;
}
</style>
