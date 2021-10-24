import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import TagBox from "@/components/TagBox.vue";
import { Tag } from "@/types/garnbarn/Tag";
import VueMaterial from "vue-material";

const tag: Tag = {
  id: "1",
  name: "Do Test",
  color: "Aquamarine"
};

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

describe("Test TagBox", () => {
  let wrapper: Wrapper<TagBox, Element>;
  beforeEach(() => {
    wrapper = mount(TagBox, {
      localVue,
      propsData: {
        tag: tag,
      },
    });
  });

  test("Test Tag name", () => {
      expect(wrapper.text()).toContain("Do Test");
  });
    test.todo("Test Tag color");
});
