import type { Meta, StoryObj } from "@storybook/react";
import ChatbotWidget from "./index";

const meta: Meta<typeof ChatbotWidget> = {
  title: "Molecules/Widgets/ChatbotWidget",
  component: ChatbotWidget,
  parameters: {
    layout: "centered",
    componentSubtitle: `
        A chatbot widget component that allows users to interact with a chatbot.
        `,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatbotWidget>;

export default meta;

type Story = StoryObj<typeof ChatbotWidget>;

export const Default: Story = {
  args: {
    title: "Chat with us",
    subtitle: "We typically reply within a few minutes",
    defaultMessages: [],
    onSendMessage: async (message) => {
      console.log("Message sent:", message);
      return null;
    },
  },
  render: (args) => {
    return <ChatbotWidget {...args} />;
  },
};

export const BottomRight: Story = {
  args: {
    ...Default.args,
    position: "bottom-right",
  },
  render: (args) => {
    return <ChatbotWidget {...args} />;
  },
};

export const BottomLeft: Story = {
  args: {
    ...Default.args,
    position: "bottom-left",
  },
  render: (args) => {
    return <ChatbotWidget {...args} />;
  },
};

Default.parameters = {
  docs: {
    description: {
      story: "A chatbot widget with no messages.",
    },
  },
};

BottomRight.parameters = {
  docs: {
    description: {
      story: "A chatbot widget with a default position.",
    },
  },
};

BottomLeft.parameters = {
  docs: {
    description: {
      story: "A chatbot widget with a bottom left position.",
    },
  },
};

meta.parameters = {
  docs: {
    description: {
      component: `
# Chatbot Widget Component

The Chatbot Widget component is a customizable chatbot widget that allows users to interact with a chatbot.

## Features

- Customizable title and subtitle
- Customizable default messages
- Customizable onSendMessage function
- Customizable position

## Usage

To use the Chatbot Widget component:

\`\`\`jsx
import { ChatbotWidget } from './ChatbotWidget';

const MyPage = () => {
  return (
    <ChatbotWidget 
      title="Chat with us"
      subtitle="We typically reply within a few minutes"
      onSendMessage={async (message) => {
        console.log("Message sent:", message);
        return null;
      }}
    />
  );
};
\`\`\`

## Props

The following table shows which props are applicable to the Chatbot Widget component:

### Prop Descriptions

| Prop Name | Type | Description |
|-----------|------|-------------|
| title | string | The title of the chatbot widget |
| subtitle | string | The subtitle of the chatbot widget |
| defaultMessages | Array<Message> | The default messages of the chatbot widget |
| position | string | The position of the chatbot widget |
| className | string | Additional CSS classes |
| isOpen | boolean | Whether the chatbot widget is open |
| onSendMessage | function | The function to send a message |
| onToggle | function | The function to toggle the chat window |
      `,
    },
  },
};
