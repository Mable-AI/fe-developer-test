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
- Floating chat interface with smooth animations
- Customizable positioning and appearance
- Full keyboard navigation support
- Responsive design for mobile and desktop
- ARIA-compliant for accessibility
- Loading states and error handling

### Basic Usage
\`\`\`tsx
import { ChatbotWidget } from "@/components/Molecules/ChatbotWidget";

export function MyComponent() {
  return (
    <ChatbotWidget 
      title="Support Chat"
      position="fixed"
      widgetPosition="bottom-right"
    >
      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <p>Hello! How can I help you today?</p>
        </div>
      </div>
    </ChatbotWidget>
  );
}
\`\`\`

### Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | The title shown in the chat window header |
| chats | ChatMessage[] | Array of chat messages to display |
| isLoading | boolean | Loading state for the chat interface |
| isOpen | boolean | Controlled open state of the widget |
| setIsOpen | (open: boolean) => void | Callback for controlling open state |
| className | string | Additional CSS classes |
| disabled | boolean | Disables the chat widget |
| position | 'static' / 'fixed' / 'absolute' / 'relative' | Position style of the widget |
| widgetPosition | 'top-right' / 'top-left' / 'bottom-right' / 'bottom-left' | Corner position of the widget |
| onSubmit | (userMessage: string) => void | Callback function when the chat form is submitted |
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatbotWidget>;

// Sample chat messages
const sampleChats = [
  {
    id: "1",
    message: "Hello! How can I help you today?",
    sender: "bot" as const,
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    message: "I have a question about your services.",
    sender: "user" as const,
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    message: "I'd be happy to help! What would you like to know?",
    sender: "bot" as const,
    timestamp: new Date().toISOString(),
  },
];

export const Default: Story = {
  args: {
    title: "Support Chat",
    widgetPosition: "bottom-right",
    chats: sampleChats,
    onSubmit: (userMessage: string) => {
      console.log(userMessage);
    },
  },
};

export const WithChats: Story = {
  args: {
    title: "Support Chat",
    chats: sampleChats,
    onSubmit: (userMessage: string) => {
      console.log(userMessage);
    },
  },
};

export const Loading: Story = {
  args: {
    title: "Support Chat",
    chats: sampleChats,
    isLoading: true,
    widgetPosition: "bottom-right",
    onSubmit: (userMessage: string) => {
      console.log(userMessage);
    },
  },
};

export const Disabled: Story = {
  args: {
    title: "Support Chat",
    disabled: true,
    onSubmit: (userMessage: string) => {
      console.log(userMessage);
    },
  },
};

export const TopLeft: Story = {
  args: {
    title: "AI Assistant",
    position: "fixed",
    widgetPosition: "top-left",
    onSubmit: (userMessage: string) => {
      console.log(userMessage);
    },
  },
};

export const CustomStyling: Story = {
  args: {
    title: "Custom Chat",
    className: "custom-chat-widget",
    widgetPosition: "bottom-right",
    onSubmit: (userMessage: string) => {
      console.log(userMessage);
    },
  },
};
