import { mount } from "@cypress/vue";
import VueMaterial from "vue-material";
import Vue from "vue";
import "vue-material/dist/vue-material.min.css";
import "@/assets/css/light-theme.css";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
Vue.use(VueMaterial);

describe("Test Tag Box Chip", () => {
  it("Check when the Color is not defined", () => {
    mount(TagBoxChip);
    cy.get(".md-chip").should("be.visible");
  });

  it("Check when the background color is black tone", () => {
    mount(TagBoxChip, {
      propsData: {
        color: "#4a5463",
        text: "This is the Tag",
      },
      stubs: { transition: false },
    });
    cy.get(".md-chip").should("be.visible");

    cy.get(".md-chip").should("contain.text", "This is the Tag");
    cy.get(".md-chip").should(
      "have.css",
      "background-color",
      `rgb(74, 84, 99)`
    );
    cy.get(".md-chip").should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Check when the background color is white tone", () => {
    mount(TagBoxChip, {
      propsData: {
        color: "#b0ffb3",
        text: "This is the Tag",
      },
      stubs: { transition: false },
    });
    cy.get(".md-chip").should("be.visible");

    cy.get(".md-chip").should("contain.text", "This is the Tag");
    cy.get(".md-chip").should(
      "have.css",
      "background-color",
      `rgb(176, 255, 179)`
    );
    cy.get(".md-chip").should("have.css", "color", "rgb(0, 0, 0)");
  });
});
