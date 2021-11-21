import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import AssignmentDetail from "@/components/Assignment/AssignmentDetail.vue";
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
    author: "A",
    tag: {
      author: "A",
      id: 1,
      name: "ISP",
    },
    name: "Do Test",
    description: "Write test with > 100% coverage",
    dueDate: 1635439072,
  };

  const wrapper = createWrapper(assignment);
  const assignmentDetailInstance = wrapper.vm as any;
  const date = assignmentDetailInstance.convertUnixTimeToDate(
    assignment.dueDate
  );
  test("Test Format Date", () => {
    const formatDate = assignmentDetailInstance.getFormatDate;
    expect(wrapper.text()).toContain(formatDate);
  });
  test("Test Format Time", () => {
    const formatTime = assignmentDetailInstance.getFormatTime;
    expect(wrapper.text()).toContain(formatTime);
  });
  test("Test Assignment with no due date", () => {
    const assignment: Assignment = {
      id: 1,
      author: "A",
      tag: {
        author: "A",
        id: 1,
        name: "ISP",
      },
      name: "Do Test",
      description: "Write test with > 100% coverage",
    };
    const wrapper = createWrapper(assignment);
    expect(wrapper.text()).toContain("-");
  });
});
