import type { Meta, StoryObj } from "@storybook/react";
import ChatWidget from "./index";

const meta: Meta<typeof ChatWidget> = {
  title: "Molecules/Chat/ChatWidget",
  component: ChatWidget,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "ChatWidget is a floating chat button that opens a chat interface when clicked, providing an easy-to-deploy chat solution.",
    docs: {
      description: {
        component: `
# ChatWidget Component

The ChatWidget component is a floating chat interface suitable for adding real-time conversations or custom interactions. It supports theme variants, typing indicators, and a welcome message.

## Features

- Floating toggle button
- Animated transitions with Framer Motion
- Configurable position and placeholder
- Optional typing indicator
- Customizable theme variants
- Light/dark mode ready
- Focus management for accessibility

## Props

| Prop Name           | Type                                          | Description                                                         | Default                       |
|---------------------|-----------------------------------------------|---------------------------------------------------------------------|-------------------------------|
| position            | "bottomRight" \| "bottomLeft" \| "topRight" \| "topLeft" | Floating button position                                            | "bottomRight"                 |
| title               | React.ReactNode                               | Title for the chat window                                           | "Chat Support"               |
| placeholder         | string                                        | Input placeholder text                                              | "Type your message..."        |
| initiallyOpen       | boolean                                       | Whether the chat window is initially open                           | false                         |
| onSendMessage       | (message: string) => void \| Promise<void>    | Callback for sending messages                                       | -                             |
| variant             | "default" \| "primary"                        | Theme variant                                                       | "default"                     |
| welcomeMessage      | string                                        | Initial bot message                                                 | "Hello! How can I help you?"  |
| showTypingIndicator | boolean                                       | Whether to display a typing indicator after user sends a message    | true                          |
| typingDuration      | number                                        | Typing indicator duration in ms                                     | 2000                          |
| buttonIcon          | React.ReactNode                               | Custom icon for the widget button                                   | <IoChatbubbleEllipsesOutline /> |
| buttonClassName     | string                                        | Additional class for styling the chat toggle button                 | -                             |

## Usage

\`\`\`jsx
import { ChatWidget } from "./ChatWidget";

export default function ChatExample() {
  return <ChatWidget />;
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

export const Default: Story = {
  args: {
    initiallyOpen: false,
    welcomeMessage: "Hello! How can I help you?",
    variant: "primary",
  },
};

export const WithOnSendMessage: Story = {
  args: {
    onSendMessage: async (message: string): Promise<string> => {
      console.log(`User typed: ${message}`);
      // simulate a bot response
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve("Hello from the bot!");
        }, 2000),
      );
    },
    variant: "primary",
    welcomeMessage: "Hi! Type something and I'll respond.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "primary",
    buttonIcon: "Chat!",
    welcomeMessage: "Hello from custom icon!",
  },
};

export const CustomPosition: Story = {
  args: {
    position: "topLeft",
    welcomeMessage: "Welcome from the top left corner!",
  },
};

export const PrimaryVariant: Story = {
  args: {
    variant: "primary",
    initiallyOpen: true,
    welcomeMessage: "This is the primary-themed chat!",
  },
};

export const WithTypingIndicator: Story = {
  args: {
    showTypingIndicator: true,
    typingDuration: 3000,
    welcomeMessage: "Chat with me! I'm 'typing' after each of your messages.",
  },
};
