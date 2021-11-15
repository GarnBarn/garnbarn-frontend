import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import { createMock } from "ts-auto-mock";
import UserProfileIcon from "@/components/UserProfileIcon.vue";
import VueMaterial from "vue-material";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import { AccountDetail } from "@/types/GarnBarnApi/AccountApi";
import { AxiosResponse } from "axios";

jest.mock("@/services/GarnBarnApi/GarnBarnApi");

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(
  uid: string,
  garnBarnApiCaller: GarnBarnApi
): Wrapper<UserProfileIcon, Element> {
  return mount(UserProfileIcon, {
    localVue,
    propsData: {
      uid: uid,
      garnBarnApiCaller: garnBarnApiCaller,
    },
  });
}

describe("Test UserProfileIcon", () => {
  let isReject = false;
  const garnGarnApiMock = createMock<GarnBarnApi>({
    v1: {
      accounts: {
        getAccountDetail: (fourceRefresh: boolean, uid: string) => {
          return new Promise((resolve, reject) => {
            if (!isReject) {
              resolve({
                data: {
                  displayName: "Example",
                  profileImage: "http://example.com/img/example",
                  platform: {},
                },
              } as AxiosResponse<AccountDetail>);
            } else {
              reject("Error from UserProfileIcon test!");
            }
          });
        },
      },
    },
  });
  test("Test Normal Case", async () => {
    const wrapper = createWrapper("123456", garnGarnApiMock);
    await wrapper.vm.$nextTick();
    const image = wrapper.get(".profile-image");
    expect(wrapper.vm.$data.isReady).toEqual(true);
    expect(image.attributes().src).toEqual("http://example.com/img/example");
    expect(wrapper.vm.$data.author.displayName).toEqual("Example");
  });
  test("Test when the API response error status", async () => {
    isReject = true;
    const wrapper = createWrapper("?", garnGarnApiMock);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    const image = wrapper.get(".profile-image");
    expect(wrapper.vm.$data.isReady).toEqual(true);
    expect(image.attributes().src).toEqual(
      "@/assets/images/account_placeholder.png"
    );
  });
});
