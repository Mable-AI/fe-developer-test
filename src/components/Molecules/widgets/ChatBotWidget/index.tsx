import React from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { tv } from "tailwind-variants";
import {
  useFloating,
  useClick,
  useInteractions,
  useRole,
  FloatingPortal,
} from "@floating-ui/react";
import { ChatWindow } from "./ChatWindow";

const widgetButton = tv({
  base: [
    // Structure & Layout
    "flex",
    "items-center",
    "justify-center",
    "w-14",
    "h-14",
    "rounded-full",
    "shadow-lg",

    // Colors & Visual
    "bg-primary-500",
    "text-white",
    "hover:bg-primary-600",
    "active:bg-primary-700",

    // Focus states
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary-400",
    "focus:ring-offset-2",

    // Transitions
    "transition-all",
    "duration-200",

    // Interactive
    "cursor-pointer",
    "select-none",
    "touch-manipulation",
  ],
  variants: {
    position: {
      bottomRight: ["fixed", "bottom-6", "right-6", "z-50"],
      bottomLeft: ["fixed", "bottom-6", "left-6", "z-50"],
      topRight: ["fixed", "top-6", "right-6", "z-50"],
      topLeft: ["fixed", "top-6", "left-6", "z-50"],
    },
  },
  defaultVariants: {
    position: "bottomRight",
  },
});

const buttonAnimations = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  tap: { scale: 0.9 },
  hover: { scale: 1.1 },
};

export interface ChatWidgetProps {
  position?: "bottomRight" | "bottomLeft" | "topRight" | "topLeft";
  title?: string;
  placeholder?: string;
  initiallyOpen?: boolean;
  onSendMessage?: (message: string) => void | Promise<void> | Promise<string>;
  variant?: "default" | "primary";
  welcomeMessage?: string;
  showTypingIndicator?: boolean;
  typingDuration?: number;
  buttonIcon?: string;
  buttonClassName?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  position = "bottomRight",
  title = "Chat Support",
  placeholder = "Type your message...",
  initiallyOpen = false,
  onSendMessage,
  variant = "default",
  welcomeMessage = "Hello! How can I help you today?",
  showTypingIndicator = true,
  typingDuration = 2000,
  buttonIcon = <IoChatbubbleEllipsesOutline size={24} />,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);
  const [messages, setMessages] = React.useState<
    Array<{
      id: string;
      text: string;
      sender: "user" | "bot";
      timestamp: Date;
    }>
  >(
    welcomeMessage
      ? [
          {
            id: "welcome",
            text: welcomeMessage,
            sender: "bot",
            timestamp: new Date(),
          },
        ]
      : [],
  );
  const [isTyping, setIsTyping] = React.useState(false);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const { getReferenceProps } = useInteractions([click, role]);

  const handleAddBotMessage = React.useCallback((message: string) => {
    const newMessage = {
      id: `bot-${Date.now()}`,
      text: `Our AI is processing your message:${message}, This Custom message is passed if Message is not handled by the user`,
      sender: "bot" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleSendMessage = React.useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      const newMessage = {
        id: `user-${Date.now()}`,
        text: message,
        sender: "user" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      if (showTypingIndicator && onSendMessage) {
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
        }, typingDuration);
      }

      if (onSendMessage) {
        const data = await onSendMessage(message);

        if (data) {
          const newMessage = {
            id: `bot-${Date.now()}`,
            text: data,
            sender: "bot" as const,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      } else {
        handleAddBotMessage(message);
      }
    },
    [onSendMessage, showTypingIndicator, typingDuration, handleAddBotMessage],
  );

  return (
    <>
      <motion.button
        ref={refs.setReference}
        className={widgetButton({ position, class: buttonClassName })}
        {...getReferenceProps()}
        initial="initial"
        animate="animate"
        whileTap="tap"
        whileHover="hover"
        variants={buttonAnimations}
        aria-label="Open chat window"
      >
        {buttonIcon}
      </motion.button>

      <FloatingPortal>
        {isOpen && (
          <ChatWindow
            ref={refs.setFloating}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            messages={messages}
            onSendMessage={handleSendMessage}
            title={title}
            placeholder={placeholder}
            variant={variant}
            isTyping={isTyping}
            position={position}
          />
        )}
      </FloatingPortal>
    </>
  );
};

export default ChatWidget;
