import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import DialogBoxComponent from "@/components/DialogBox/DialogBoxComponent.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import VueMaterial from "vue-material";
import { DialogConfig } from "@/types/components/DialogBox";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(
  dialogBoxId: string,
  isCustom: boolean
): Wrapper<DialogBoxComponent, Element> {
  return mount(DialogBoxComponent, {
    localVue,
    propsData: {
      dialogBoxId: dialogBoxId,
      isCustomDialogBox: isCustom,
    },
    stubs: {
      MdPortal: { template: "<div><slot/></div>" },
    },
  });
}

function generateDialogTimeoutMessage(dialogId: string) {
  return `Timeout reciving response from DialogBoxComponent. Did you create the DialogBoxComponent with this id yet? (RESPONSE-${dialogId})`;
}

describe("Test DialogBoxComponent", () => {
  const wrapper = createWrapper("TestDialogBox", false);
  const customDialogBoxWrapper = createWrapper("TestCustomDialogBox", true);
  const dialogConfig: DialogConfig = {
    dialogBoxContent: {
      title: "This is a test Dialogbox",
      content: "Example content Dialog Box",
    },
    config: {},
  };

  test("Test Showing and Dismissing by clicking on Default DialogBox", async () => {
    const testDialogBox = new DialogBox("TestDialogBox");
    await testDialogBox.show(dialogConfig);
    expect(wrapper.vm.$data.dialogBox.active).toEqual(true);
    expect(wrapper.text()).toContain("This is a test Dialogbox");
    expect(wrapper.text()).toContain("Example content Dialog Box");

    const actionButtons = wrapper.find("#actionButton");
    actionButtons.trigger("click");
    // Wait for the dialogBox to dismiss from the app
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.dialogBox.active).toEqual(false);
    expect(wrapper.text()).not.toContain("This is a test Dialogbox");
    expect(wrapper.text()).not.toContain("Example content Dialog Box");
  });

  test("Test Call dismiss method", async () => {
    const testDialogBox = new DialogBox("TestDialogBox");
    await expect(testDialogBox.show(dialogConfig)).resolves.toBeUndefined();
    await testDialogBox.dismiss();
    expect(wrapper.vm.$data.dialogBox.active).toEqual(false);
    expect(wrapper.text()).not.toContain("This is a test Dialogbox");
    expect(wrapper.text()).not.toContain("Example content Dialog Box");
  });

  test("Test Showing default dialogbox without specifing the dialogBoxConent", async () => {
    const testDialogBox = new DialogBox("TestDialogBox");
    await expect(testDialogBox.show()).rejects.toEqual(
      "dialogBoxContent must be specified since TestDialogBox dialog is not a customDialog"
    );
  });

  test("Test Showing/Dismissing DialogBox with other id", async () => {
    const someOtherDialogBox = new DialogBox("SomeOtherDialogBox");
    // This should be fine. Sine the Dialog dismiss event has been transimited in the same event channel.
    await expect(
      someOtherDialogBox.show({
        dialogBoxContent: {
          title: "This is a test Dialogbox",
          content: "Example content Dialog Box",
        },
      })
    ).rejects.toEqual(generateDialogTimeoutMessage("SomeOtherDialogBox"));
    // Since we call show with the other dialog box id. The current focused DialogBox shouldn't be displayed
    expect(wrapper.vm.$data.dialogBox.active).toEqual(false);
  });

  test("Test Dismissing DialogBox with other id", async () => {
    const testDialogBox = new DialogBox("TestDialogBox");
    const someOtherDialogBox = new DialogBox("SomeOtherDialogBox");
    await expect(
      testDialogBox.show({
        dialogBoxContent: {
          title: "This is a test Dialogbox",
          content: "Example content Dialog Box",
        },
      })
    ).resolves.toBeUndefined();
    expect(wrapper.vm.$data.dialogBox.active).toEqual(true);
    // This is fine. Sine the Dialog dismiss event has been transimited in the same event channel.
    await expect(someOtherDialogBox.dismiss()).rejects.toEqual(
      generateDialogTimeoutMessage("SomeOtherDialogBox")
    );
    // The current dialogBox shouldn't be affected.
    expect(wrapper.vm.$data.dialogBox.active).toEqual(true);
  });

  test("Test Custom DialogBox", async () => {
    const testCustomDialogBox = new DialogBox("TestCustomDialogBox");
    await testCustomDialogBox.show();
    expect(customDialogBoxWrapper.vm.$data.dialogBox.active).toEqual(true);
    await testCustomDialogBox.dismiss();
    expect(customDialogBoxWrapper.vm.$data.dialogBox.active).toEqual(false);
  });
});
