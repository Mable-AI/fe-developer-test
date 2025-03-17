import type { Meta, StoryObj } from "@storybook/react";
import ChatbotWidget from "./index";

const meta: Meta<typeof ChatbotWidget> = {
  title: "Molecules/ChatbotWidget",
  component: ChatbotWidget,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "A floating chatbot widget that can be toggled to show/hide a chat interface.",
    docs: {
      description: {
        component: `
### Overview
A floating chatbot widget that provides a toggleable chat interface. Built with accessibility and smooth animations in mind.

### Features

### Basic Usage

\`\`\`tsx
import { ChatbotWidget } from "@/components/Molecules/ChatbotWidget";

export function MyComponent() {
  return (
    <ChatbotWidget title="Support Chat">
      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <p>Hello! How can I help you today?</p>
        </div>
        {/* Add your chat interface components here */}
      </div>
    </ChatbotWidget>
  );
}
\`\`\`

### Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | The title shown in the chat window header |
| children | ReactNode | The content of the chat window |

### Accessibility
- Fully keyboard navigable
- ARIA labels and roles
- Focus management
- Screen reader friendly
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatbotWidget>;

export const Default: Story = {
  args: {
    title: "Support Chat",
    children: (
      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <p>Hello! How can I help you today?</p>
        </div>
        <div className="bg-primary-500/20 p-4 rounded-lg">
          <p>I have a question about your services.</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <p>I'd be happy to help! What would you like to know?</p>
        </div>
      </div>
    ),
  },
};

export const CustomTitle: Story = {
  args: {
    title: "AI Assistant",
    children: (
      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <p>Hi! I'm your AI assistant. Ask me anything!</p>
        </div>
      </div>
    ),
  },
};
