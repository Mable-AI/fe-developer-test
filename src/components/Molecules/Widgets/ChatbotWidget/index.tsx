import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ChatWindow from "./ChatWindow";
import Button from "@/components/Atoms/Controls/Button";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type Position = "bottom-right" | "bottom-left";

export interface ChatbotWidgetProps {
  position?: Position;
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  onSendMessage?: (message: string) => Promise<{ message: string } | null>;
  defaultMessages?: Message[];
  className?: string;
}

const CHATBOT_WIDGET_POSITIONS: Record<
  "BOTTOM_RIGHT" | "BOTTOM_LEFT",
  Position
> = {
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
};

const positionClasses = {
  [CHATBOT_WIDGET_POSITIONS.BOTTOM_RIGHT]: "bottom-4 right-4",
  [CHATBOT_WIDGET_POSITIONS.BOTTOM_LEFT]: "bottom-4 left-4",
};

const chatWindowPositionClasses = {
  [CHATBOT_WIDGET_POSITIONS.BOTTOM_RIGHT]: "bottom-20 right-0",
  [CHATBOT_WIDGET_POSITIONS.BOTTOM_LEFT]: "bottom-20 left-0",
};

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  position = CHATBOT_WIDGET_POSITIONS.BOTTOM_RIGHT,
  title = "Chat with us",
  subtitle = "",
  isOpen: controlledIsOpen,
  defaultMessages = [],
  className,
  onToggle,
  onSendMessage,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([...defaultMessages]);
  const [isLoadingNewMessage, setIsLoadingNewMessage] = useState(false);

  const isOpen = controlledIsOpen ?? internalIsOpen;

  const generateUniqueId = () => crypto.randomUUID();

  const handleToggle = () => {
    const newState = !isOpen;
    setInternalIsOpen(newState);
    if (isOpen) {
      setMessages([]);
    }
    setIsLoadingNewMessage(false);
    onToggle?.(newState);
  };

  const handleSendMessage = async (message: string) => {
    const uniqueId = generateUniqueId();
    const userMessage: Message = {
      id: uniqueId,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    try {
      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setIsLoadingNewMessage(true);

      // Wait for AI response
      const response = onSendMessage ? await onSendMessage(message) : null;

      const botMessage: Message = {
        id: generateUniqueId(),
        content:
          response?.message || "AI is currently busy. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Handle error by showing error message
      const errorMessage: Message = {
        id: generateUniqueId(),
        content: "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      console.error(err);
    } finally {
      setIsLoadingNewMessage(false);
    }
  };

  useEffect(() => {
    if (defaultMessages.length > 0) {
      setMessages(defaultMessages);
    }
  }, [defaultMessages.length]);

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${chatWindowPositionClasses[position]} w-[400px] h-[600px] bg-background rounded-xl shadow-lg overflow-hidden`}
          >
            <ChatWindow
              title={title}
              subtitle={subtitle}
              messages={messages}
              isLoadingNewMessage={isLoadingNewMessage}
              onClose={handleToggle}
              onSendMessage={handleSendMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleToggle}
          className="rounded-full p-4 shadow-lg"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <IoMdClose size={24} />
          ) : (
            <IoChatbubbleEllipsesOutline size={24} />
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default ChatbotWidget;
