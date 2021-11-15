import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import TagDetail from "@/components/TagDetail.vue";
import { Tag } from "@/types/garnbarn/Tag";
import VueMaterial from "vue-material";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(tag: Tag): Wrapper<TagDetail, Element> {
  return mount(TagDetail, {
    localVue,
    propsData: {
      tag: tag,
    },
  });
}

describe("Test TagDetail Box", () => {
  test("Test Normal Case", () => {
    const tag: Tag = {
      id: 1,
      author: "A",
      name: "Do Test",
      color: "Aquamarine",
    };
    const wrapper = createWrapper(tag);
    // TODO: Write the actual test for this component after the merge PR #37
    expect(true).toEqual(true);
  });
});
