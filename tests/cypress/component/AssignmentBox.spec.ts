import { mount } from "@cypress/vue";
import VueMaterial from "vue-material";
import Vue from "vue";
import "vue-material/dist/vue-material.min.css";
import "@/assets/css/light-theme.css";
import AssignmentBox from "@/components/AssignmentBox.vue";
Vue.use(VueMaterial);

describe("Test Assignment Box", () => {
  it("Check assignment box color when there's no tag", () => {
    mount(AssignmentBox);
    cy.get(".assignment-card").should(
      "have.css",
      "background-color",
      "#f9f9f9"
    );
  });
});
