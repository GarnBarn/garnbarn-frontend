import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import AssignmentBox from "@/components/AssignmentBox.vue";
import { Assignment } from "@/types/garnbarn/Assignment";
import VueMaterial from "vue-material";

const assignment: Assignment = {
  id: "1",
  name: "Hello Assignment",
};

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

describe("Test AssignmentBox", () => {
  let wrapper: Wrapper<AssignmentBox, Element>;
  beforeEach(() => {
    wrapper = mount(AssignmentBox, {
      localVue,
      propsData: {
        assignment: assignment,
      },
    });
  });

  test("Test", () => {
    expect(wrapper.text()).toContain("Hello Assignment");
  });
});
