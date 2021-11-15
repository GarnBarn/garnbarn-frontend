import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import SecretQrDialog from "@/components/Tag/SecretQrDialog.vue";
import { Tag } from "@/types/garnbarn/Tag";
import DialogBoxCompoent from "@/components/DialogBox/DialogBoxComponent.vue";
import DialogBox from "@/components/DialogBox/DialogBox";
import VueMaterial from "vue-material";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(tag: Tag): Wrapper<SecretQrDialog, Element> {
  return mount(SecretQrDialog, {
    localVue,
    propsData: {
      tag: tag,
    },
  });
}

function generateQrCodeUrl(tagId: number, secret: string): string {
  return window.decodeURI(
    `https://chart.googleapis.com/chart?cht=qr&chl=otpauth://totp/GarnBarn%20%28Tag%3A%20${tagId}%29?secret=${secret}&chs=180x180&choe=UTF-8`
  );
}

describe("Test Secret QR DialogBox", () => {
  test("Test Test GetAuthAppUrl", async () => {
    const tag: Tag = {
      id: 1,
      author: "A",
      name: "Do Test",
      color: "Aquamarine",
      secretKeyTotp: "1234",
    };

    const wrapper = createWrapper(tag);
    const secretDialogBox = new DialogBox("secretQrDialog");
    secretDialogBox.show();
    await wrapper.vm.$nextTick();
    const dialogBox = wrapper.findAllComponents(DialogBoxCompoent).wrappers[0];
    const qrImage = wrapper.get("#secret-qr-code");
    expect(dialogBox.text()).toContain(`Tag Created with id ${tag.id}`);
    expect(window.decodeURI(qrImage.attributes().src)).toEqual(
      generateQrCodeUrl(1, "1234")
    );
  });
});
