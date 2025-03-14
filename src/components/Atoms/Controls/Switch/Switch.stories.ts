import Switch from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Control/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "Switches are used to toggle between ",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InactiveToggle: Story = {
  name: "Toggle (Inactive)",
  args: {
    onChange: () => alert("Toggled"),
    name: "toggle",
    title: "This is a toggle Switch",
    checked: false,
  },
};

export const ActiveToggle: Story = {
  name: "Toggle (Active)",
  args: {
    onChange: () => alert("Toggled"),
    name: "toggle",
    title: "This is a toggle Switch",
    checked: true,
  },
};

export const DisabledToggle: Story = {
  name: "Toggle (Disabled)",
  args: {
    name: "toggle",
    title: "This is a toggle Switch",
    checked: false,
    disabled: true,
  },
};
