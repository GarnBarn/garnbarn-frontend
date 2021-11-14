import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import TagBox from "@/components/Tag/TagBox.vue";
import { Tag } from "@/types/garnbarn/Tag";
import VueMaterial from "vue-material";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(tag: Tag): Wrapper<TagBox, Element> {
  return mount(TagBox, {
    localVue,
    propsData: {
      tag: tag,
    },
  });
}

describe("Test TagBox", () => {
  const tag: Tag = {
    id: 1,
    author: "A",
    name: "Do Test",
    color: "Aquamarine",
  };

  const wrapper = createWrapper(tag);
  test("Test Tag name", () => {
    expect(wrapper.text()).toContain("Do Test");
  });
});
