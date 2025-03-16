import Badge from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Misc/Badge",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Badges are tags that give a quick visual indication to users of the properties of certain elements",
  },
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryBadge: Story = {
  args: {
    variant: "primary",
    rounded: false,
    label: "BETA",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    rounded: false,
    label: "OPTIONAL",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    rounded: false,
    label: "PREMIUM",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    rounded: false,
    label: "WARNING",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    rounded: false,
    label: "Error",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    rounded: false,
    label: "NOTIFICATION",
  },
};

export const CustomBadge: Story = {
  args: {
    variant: "custom",
    label: "CUSTOM",
    className: "bg-purple-800 hover:bg-purple-700", // example override
    rounded: true,
  },
};
