import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import AssignmentDetail from "@/components/AssignmentDetail.vue";
import { Assignment } from "@/types/garnbarn/Assignment";
import VueMaterial from "vue-material";


const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(
    assignment: Assignment
  ): Wrapper<AssignmentDetail, Element> {
    return mount(AssignmentDetail, {
      localVue,
      propsData: {
        assignment: assignment,
      },
    });
}

describe("Test Assignment Display Time", () => {
    const assignment: Assignment = {
        id: 1,
        tag: {
            "id": 1,
            "name": "ISP"
        },
        name: "Do Test",
        description: "Write test with > 100% coverage",
        dueDate: 1635439072
    };

    const wrapper = createWrapper(assignment);
    test("Test Format Date", () => {
      expect(wrapper.text()).toContain("28 October");
    });
    test("Test Format Time", () => {
      expect(wrapper.text()).toContain("23:37");
    })
    test("Test Assignment with no due date", () => {
    const assignment: Assignment = {
        id: 1,
        tag: {
            "id": 1,
            "name": "ISP"
        },
        name: "Do Test",
        description: "Write test with > 100% coverage",
      };
      const wrapper = createWrapper(assignment);
      const assignmentDetailInstance = wrapper.vm as any;
      expect(assignmentDetailInstance.date).toBe(undefined);
      expect(wrapper.text()).toContain("No Due Date")
    })
});
