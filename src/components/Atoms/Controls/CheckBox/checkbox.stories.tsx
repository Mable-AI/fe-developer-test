import Checkbox from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Control/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "Checkbox is used for multiple choice options.",
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Checkboxes: Story = {
  args: {
    name: "checkboxInput",
    label: "Remember Me",
  },
  render: (args) => <Checkbox {...args} />,
};
