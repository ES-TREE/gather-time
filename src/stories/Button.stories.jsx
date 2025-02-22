import { fn } from "@storybook/test";

import Button from "../components/common/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
};

export const Fill = {
  args: {
    fill: true,
    children: "버튼",
  },
};

export const Outline = {
  args: {
    fill: false,
    children: "버튼",
  },
};
