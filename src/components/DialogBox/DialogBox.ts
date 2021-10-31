import DialogBoxEventBus, {
  DialogEvent,
  DialogEventResponse,
} from "./DialogBoxEventBus";
import { DialogConfig } from "@/types/components/DialogBox";

export class DialogBox {
  private _dialogBoxId: string;
  constructor(dialogBoxId: string) {
    this._dialogBoxId = dialogBoxId;
  }

  show(dialogConfig?: DialogConfig): Promise<void> {
    dialogConfig = this._checkDialogBoxId(dialogConfig ?? {});
    dialogConfig = this._parseDialogConfig(dialogConfig);
    const responseChannelId = `RESPONSE-${dialogConfig.dialogBoxId}`;
    const eventSubscriber = this._listenResponse(responseChannelId);
    DialogBoxEventBus.$emit(DialogEvent.show, dialogConfig);
    return eventSubscriber;
  }

  dismiss(dialogConfig?: DialogConfig): Promise<void> {
    dialogConfig = this._checkDialogBoxId(dialogConfig ?? {});
    const responseChannelId = `RESPONSE-${dialogConfig.dialogBoxId}`;
    const eventSubscriber = this._listenResponse(responseChannelId);
    DialogBoxEventBus.$emit(DialogEvent.dismiss, dialogConfig);
    return eventSubscriber;
  }

  private async _listenResponse(responseChannelId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeoutCounter = setTimeout(() => {
        DialogBoxEventBus.$off(responseChannelId);
        // If exceed 200ms without response form DialogBoxComponent, Considered as it it a lost package.
        reject(
          `Timeout reciving response from DialogBoxComponent. Did you create the DialogBoxComponent with this id yet? (${responseChannelId})`
        );
      }, 200);
      DialogBoxEventBus.$on(
        responseChannelId,
        (response: DialogEventResponse) => {
          clearTimeout(timeoutCounter);
          if (!response.success) {
            reject(response.message);
          }
          DialogBoxEventBus.$off(responseChannelId);
          resolve();
        }
      );
    });
  }

  private _checkDialogBoxId(dialogConfig: DialogConfig): DialogConfig {
    if (typeof dialogConfig.dialogBoxId === "undefined") {
      dialogConfig.dialogBoxId = this._dialogBoxId;
    }
    return dialogConfig;
  }

  private _parseDialogConfig(dialogConfig: DialogConfig): DialogConfig {
    if (typeof dialogConfig.config === "undefined") {
      dialogConfig.config = {
        closeOnEsc: false,
        clickOutsideToClose: false,
        fullscreen: false,
      };
    } else {
      dialogConfig.config.closeOnEsc = dialogConfig.config.closeOnEsc ?? false;
      dialogConfig.config.clickOutsideToClose =
        dialogConfig.config.clickOutsideToClose ?? false;
      dialogConfig.config.fullscreen = dialogConfig.config.fullscreen ?? false;
    }

    if (typeof dialogConfig.dialogBoxActions === "undefined") {
      dialogConfig.dialogBoxActions = [
        {
          buttonContent: "Close",
          buttonClass: "md-secondary",
          onClick: (): void => {
            this.dismiss();
          },
        },
      ];
    }
    return dialogConfig;
  }
}
