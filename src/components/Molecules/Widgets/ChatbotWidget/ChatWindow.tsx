import React, { useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { Message } from "./index";
import { tv } from "tailwind-variants";
import Input from "@/components/Atoms/Controls/Input";
import Button from "@/components/Atoms/Controls/Button";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

interface ChatWindowProps {
  title: string;
  subtitle: string;
  messages: Message[];
  isLoadingNewMessage: boolean;
  welcomeMessage?: string;
  welcomeDescription?: string;
  onClose: () => void;
  onSendMessage?: (message: string) => Promise<void>;
}

// Separated variants for better organization and reuse
const popup = tv({
  base: [
    // Structure & Layout
    "flex",
    "flex-col",
    "h-full",
    "border-2",
    "border-primary-400",
    "rounded-2xl",
    "overflow-y-scroll",
    "overflow-x-hidden",
  ],
});

const closeButton = tv({
  base: [
    "p-1",
    "text-white",
    "rounded-full",
    "transition-colors",
    "duration-200",
    "hover:bg-gray-200",
    "hover:text-nonUsers",
    "focus:outline-none",
  ],
});

const header = tv({
  base: [
    "p-4",
    "border-b",
    "border-white",
    "border-opacity-10",
    "flex",
    "justify-between",
    "items-center",
  ],
});

const messagesContainer = tv({
  base: [
    "p-4",
    "flex-auto",
    "justify-between",
    "items-center",
    "overflow-y-scroll",
  ],
});

const messageStyles = tv({
  base: [
    "p-3",
    "rounded-lg",
    "max-w-[80%]",
    "w-fit",
    "min-w-[80px]",
    "mb-2",
    "text-white",
  ],
  variants: {
    type: {
      user: "bg-primary-600 text-white ml-auto",
      bot: "bg-white bg-opacity-10 text-white",
    },
  },
});

const footer = tv({
  base: [
    "px-4",
    "py-2",
    "border-t",
    "border-white",
    "border-opacity-10",
    "flex",
    "gap-2",
    "items-center",
  ],
});

const emptyStateContainer = tv({
  base: [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-full",
    "p-8",
    "text-center",
    "space-y-4",
  ],
});

const emptyStateIcon = tv({
  base: ["w-16", "h-16", "text-primary-400", "opacity-80", "mb-4"],
});

const emptyStateTitle = tv({
  base: ["text-xl", "font-semibold", "text-white"],
});

const emptyStateText = tv({
  base: ["text-sm", "text-white", "text-opacity-60", "max-w-[280px]"],
});

const ChatWindow: React.FC<ChatWindowProps> = ({
  title,
  subtitle,
  messages,
  isLoadingNewMessage,
  welcomeMessage = "Start a Conversation",
  welcomeDescription = "Send a message to begin chatting with our AI assistant. We're here to help!",
  onClose,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const methods = useForm();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const onSubmit = async (data: FieldValues) => {
    if (data.message.trim() && onSendMessage) {
      await onSendMessage(data.message);
      methods.reset();
    }
  };

  let messagesNodeToRender;

  if (messages.length === 0) {
    messagesNodeToRender = (
      <div className={messagesContainer()}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1], // Cubic bezier for smooth easing
          }}
          className={emptyStateContainer()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <IoChatbubbleEllipsesOutline className={emptyStateIcon()} />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={emptyStateTitle()}
          >
            {welcomeMessage}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={emptyStateText()}
          >
            {welcomeDescription}
          </motion.p>
        </motion.div>
      </div>
    );
  } else {
    messagesNodeToRender = (
      <>
        {/* Messages */}
        <div className={messagesContainer()}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={messageStyles({ type: message.sender })}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
          {isLoadingNewMessage && (
            <div className="p-3 rounded-lg max-w-[80%] mb-2 text-white">
              <IoChatbubbleEllipsesOutline className="w-4 h-4 animate-spin" />
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className={popup()}>
      {/* Header */}
      <div className={header()}>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-white text-opacity-60 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className={closeButton()}
          aria-label="Close dialog"
        >
          <IoClose size={20} />
        </button>
      </div>

      {messagesNodeToRender}

      {/* Always show the input form, even when there are no messages */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={footer()}>
          <Input
            name="message"
            type="text"
            placeholder="Type a message..."
            rootClassName="pt-0 pb-0"
            showValidationErrors={false}
            disabled={isLoadingNewMessage}
            minLength={3}
          />
          <Button
            type="submit"
            className="h-full"
            disabled={isLoadingNewMessage}
          >
            <IoSend size={20} />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChatWindow;
