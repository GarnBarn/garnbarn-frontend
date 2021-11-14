import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import AssignmentBox from "@/components/AssignmentBox.vue";
import { Assignment } from "@/types/garnbarn/Assignment";
import VueRouter from "vue-router";
import VueMaterial from "vue-material";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);
localVue.use(VueRouter);

const router = new VueRouter({
  routes: [{ path: "/assignment/:id", name: "assignment-page" }],
});

function createWrapper(
  assignment: Assignment
): Wrapper<AssignmentBox, Element> {
  return mount(AssignmentBox, {
    localVue,
    router,
    propsData: {
      assignment: assignment,
    },
  });
}

describe("Test AssignmentBox", () => {
  test("Test font color picker", () => {
    // The getFontColor will re
    const assignment: Assignment = {
      id: 1,
      name: "Hello Assignment",
      author: "A",
    };
    const wrapper = createWrapper(assignment);
    const assignmentBoxInstance = wrapper.vm as any;
    const testColorArray = [
      {
        color: [0, 0, 0],
        expected: "#ffffff",
      },
      {
        color: [255, 46, 31],
        expected: "#ffffff",
      },
      {
        color: [249, 249, 249],
        expected: "#000000",
      },
    ];
    testColorArray.forEach((testCase) => {
      expect(assignmentBoxInstance.getFontColor(testCase.color)).toBe(
        testCase.expected
      );
    });
  });
  test("Test assignment without Tag", () => {
    const assignment: Assignment = {
      id: 1,
      name: "Hello Assignment",
      author: "A",
    };
    const wrapper = createWrapper(assignment);
    expect(wrapper.text()).toContain("Hello Assignment");
    // Expect the Tag Box to not be displayed.
    expect(wrapper.findComponent({ name: "TagBox" }).exists()).toBe(false);
  });

  test("Test assignment with Tag", () => {
    const assignment: Assignment = {
      id: 1,
      name: "Hello Assignment",
      author: "A",
      tag: {
        id: 1,
        author: "A",
        name: "This is a Tag",
        color: "#111111",
      },
    };
    const wrapper = createWrapper(assignment);
    const assignmentBoxInstance = wrapper.vm as any;
    const rgbColor = assignmentBoxInstance.hexToRgb(assignment.tag?.color);
    const fontColor = assignmentBoxInstance.getFontColor(rgbColor);
    expect(wrapper.text()).toContain("This is a Tag");
    const tagBoxComponent = wrapper.findComponent({ name: "TagBox" });
    // Expect the Tag box to be displayed
    expect(tagBoxComponent.exists()).toBe(true);
    // Expect the Color of AssignmentBox to be the same as the tag color
    expect(wrapper.find(".assignment-card").attributes("style")).toBe(
      `--background-color: ${assignment.tag?.color}; --font-color: ${fontColor};`
    );
  });

  test("Click component to navigate to assignment page", async () => {
    const assignment: Assignment = {
      id: 1,
      name: "Hello Assignment",
      author: "A",
    };
    const wrapper = createWrapper(assignment);
    await wrapper.find(".assignment-card").trigger("click");
    expect(wrapper.vm.$router.currentRoute.fullPath).toBe("/assignment/1");
  });
});
