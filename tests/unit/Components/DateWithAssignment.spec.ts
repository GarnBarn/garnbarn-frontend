import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import VueMaterial from "vue-material";

import DateWithAssignment from "@/components/Assignment/DateWithAssignment.vue";
import { Assignment } from "@/types/garnbarn/Assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox.vue";

jest.mock("@/services/GarnBarnApi/GarnBarnApi");

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(
  date: Date,
  assignments: Array<Assignment>
): Wrapper<DateWithAssignment, Element> {
  return mount(DateWithAssignment, {
    localVue,
    propsData: {
      date: date,
      assignments: assignments,
    },
  });
}

describe("Test DateWithAssignment Component", () => {
  test("Test Normal Case", async () => {
    const currentDate = new Date();
    const wrapper = createWrapper(currentDate, [
      { id: 1, name: "Example", author: "1234", dueDate: Date.now() + 100 },
      { id: 2, name: "Example 2", author: "ABCD", dueDate: Date.now() + 5 },
      { id: 3, name: "Example 3", author: "EFGH", dueDate: Date.now() + 10 },
      { id: 4, name: "Example 3", author: "EFGH" },
    ]);
    const assignmentBoxComponent = wrapper.findAllComponents(AssignmentBox);
    expect(wrapper.text()).toContain(
      currentDate.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
    expect(assignmentBoxComponent.length).toEqual(3);
    const expectOrder = [2, 3, 1];
    assignmentBoxComponent.wrappers.forEach((item, index) => {
      expect(item.vm.$props.assignment.id).toEqual(expectOrder[index]);
    });
  });
});
