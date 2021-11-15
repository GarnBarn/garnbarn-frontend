import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import TagBoxChip from "@/components/Tag/TagBoxChip.vue";
import { Tag } from "@/types/garnbarn/Tag";
import VueMaterial from "vue-material";

const localVue = createLocalVue(VueMaterial);
localVue.use(VueMaterial);

function createWrapper(
  color: string,
  text: string
): Wrapper<TagBoxChip, Element> {
  return mount(TagBoxChip, {
    localVue,
    propsData: {
      color: color,
      text: text,
    },
  });
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

describe("Test TagBoxChip Component", () => {
  test("Test Dark Background", () => {
    const hexColorCode = "#111111";
    const text = "I'm Black";
    const wrapper = createWrapper(hexColorCode, text);
    const chip = wrapper.get(".md-chip");
    const style = window.getComputedStyle(wrapper.element);
    expect(wrapper.text()).toContain(text);
    expect(style.backgroundColor).toEqual(hexToRgb(hexColorCode));
    // If the background color is dark, The font color should automatically switch to white.
    expect(style.color.toString()).toEqual(hexToRgb("#ffffff"));
  });

  test("Test Dark Background", () => {
    const hexColorCode = "#fac5c5";
    const text = "I'm White";
    const wrapper = createWrapper(hexColorCode, text);
    const chip = wrapper.get(".md-chip");
    const style = window.getComputedStyle(wrapper.element);
    expect(wrapper.text()).toContain(text);
    expect(style.backgroundColor).toEqual(hexToRgb(hexColorCode));
    // If the background color is light, The font color should automatically switch to black.
    expect(style.color.toString()).toEqual(hexToRgb("#000000"));
  });
});
