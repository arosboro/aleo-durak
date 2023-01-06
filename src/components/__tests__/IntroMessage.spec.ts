import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import IntroMessage from "../IntroMessage.vue";

describe("IntroMessage", () => {
  it("renders properly", () => {
    const wrapper = mount(IntroMessage, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
