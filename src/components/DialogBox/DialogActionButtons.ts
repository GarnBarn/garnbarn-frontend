import { DialogBoxAction } from "@/types/components/DialogBox";
import DialogBox from "@/components/DialogBox/DialogBox";
import VueRouter from "vue-router";

export class DialogActionButtons {
  private _router: VueRouter;
  private _dialogBox: DialogBox;
  private _previousPath: string | undefined;

  constructor(router: VueRouter, dialogBox: DialogBox, previousPath?: string) {
    this._router = router;
    this._dialogBox = dialogBox;
    this._previousPath = previousPath;
  }

  backButton(): DialogBoxAction {
    if (typeof this._previousPath === "undefined") {
      throw Error("The back button required the previousPath");
    }
    return {
      buttonContent: "Back",
      buttonClass: "md-primary",
      onClick: () => {
        this._dialogBox.dismiss();
        this._router.push({
          path: this._previousPath,
        });
      },
    };
  }

  dismissButton(): DialogBoxAction {
    return {
      buttonContent: "Dismiss",
      buttonClass: "md-secondary",
      onClick: () => {
        this._dialogBox.dismiss();
      },
    };
  }
}
