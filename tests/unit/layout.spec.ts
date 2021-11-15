import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import VueMaterial from "vue-material";
import Layout from "@/layouts/Main.vue";

// Import required dependency
import firebase from "firebase/app";
import DialogBox from "@/components/DialogBox/DialogBox";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

export type CallbackFunction = (
  user: firebase.User,
  loadingDialogBox: DialogBox
) => void;

function createWrapper(callback: CallbackFunction): Wrapper<Layout, Element> {
  return mount(Layout, {
    localVue,
    propsData: {
      callback: callback,
    },
  });
}

describe("Test App Main Layout", () => {
  test("Test Click on top left logo", () => {
    // TODO: Write the actual test for this component after the merge PR #37
    expect(true).toEqual(true);
  });
});
