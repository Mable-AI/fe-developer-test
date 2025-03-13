// ... (Avatar component code remains the same)

// Storybook Documentation
import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./index";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Custom/Avatar",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Displays an avatar image or name initials with customizable size and shape.",
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    rounded: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    alt: "User Avatar",
    size: "md",
    rounded: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    ...Default.args,
    size: "md",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "lg",
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
    rounded: false,
  },
};

export const CustomStyles: Story = {
  args: {
    ...Default.args,
    className: "border-2 border-blue-500",
  },
};

export const WithFallbackName: Story = {
  args: {
    ...Default.args,
    src: undefined,
    name: "John Doe",
  },
};

export const WithoutNameAndSrc: Story = {
  args: {
    ...Default.args,
    src: undefined,
  },
};
