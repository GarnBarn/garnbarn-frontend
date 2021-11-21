import { mount } from "@cypress/vue";
import VueMaterial from "vue-material";
import Vue from "vue";
import "vue-material/dist/vue-material.min.css";
import "@/assets/css/light-theme.css";
import AssignmentBox from "@/components/AssignmentBox.vue";
Vue.use(VueMaterial);

const assignment = {
  id: 1,
  name: "Test 1",
  author: "A",
  reminderTime: [50, 50, 50],
  description:
    "The overflow-wrap property in CSS allows you to specify that the browser can break a line of text inside the targeted element onto multiple lines in an otherwise unbreakable place. This helps to avoid an unusually long string of text causing layout problems due to overflow.",
  dueDate: 1635439072,
};

describe("Test Assignment Box", () => {
  it("Check assignment box color when there's no tag", () => {
    mount(AssignmentBox, {
      propsData:{ assignment },
      stubs: { transition: false },
    });

    cy.get(".assignment-card").should(
      "have.css",
      "background-color",
      "rgb(249, 249, 249)"
    );
  });
});
