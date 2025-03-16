import TextArea from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Atoms/Control/Textarea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Displays a form textarea or a component that looks like a textarea.",
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Comp: Story = {
  args: {
    label: "Your message",
    placeholder: "Type your message here",
    footnote: "Your message will be copied to the support team.",
    rows: 5,
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: "Type your message here",
    footnote: "Your message will be copied to the support team.",
    rows: 5,
  },
};

export const NoFootnote: Story = {
  args: {
    label: "Your message",
    placeholder: "Type your message here",
    rows: 5,
  },
};

export const NoLabelNoFootnote: Story = {
  args: {
    placeholder: "Type your message here",
    rows: 5,
  },
};

export const Disabled: Story = {
  args: {
    label: "Your message",
    placeholder: "Type your message here",
    footnote: "Your message will be copied to the support team.",
    rows: 5,
    disabled: true,
  },
};

export const DisabledNoLabel: Story = {
  args: {
    placeholder: "Type your message here",
    footnote: "Your message will be copied to the support team.",
    rows: 5,
    disabled: true,
  },
};
