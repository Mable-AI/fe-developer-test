import { forwardRef, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoPaperPlaneOutline } from "react-icons/io5";
import { tv } from "tailwind-variants";
import { useForm } from "react-hook-form";
import {
  FloatingFocusManager,
  useRole,
  useClick,
  useInteractions,
  useFloating,
} from "@floating-ui/react";

const chatContainer = tv({
  base: [
    // Structure & Layout
    "fixed",
    "flex",
    "flex-col",
    "w-80",
    "sm:w-96",
    "h-96",
    "sm:h-[450px]",
    "max-h-[80vh]",
    "max-w-[90vw]",
    "rounded-2xl",
    "overflow-hidden",
    "shadow-xl",
    "z-50",

    // Focus states
    "outline-none",
  ],
  variants: {
    position: {
      bottomRight: "bottom-20 right-6",
      bottomLeft: "bottom-20 left-6",
      topRight: "top-20 right-6",
      topLeft: "top-20 left-6",
    },
    variant: {
      default: "bg-white text-gray-800 border border-gray-200",
      primary:
        "bg-[linear-gradient(158deg,_rgba(79,_183,_221,_0.05)_0%,_rgba(79,_183,_221,_0.10)_100%)] backdrop-blur-xl text-white border border-primary-400",
    },
  },
  defaultVariants: {
    position: "bottomRight",
    variant: "default",
  },
});

const header = tv({
  base: [
    // Layout
    "flex",
    "justify-between",
    "items-center",
    "px-4",
    "py-3",
    "w-full",

    // Typography
    "text-lg",
    "font-medium",

    // Visual
    "border-b",
    "sticky",
    "top-0",
    "z-10",
  ],
  variants: {
    variant: {
      default: "bg-white border-gray-200 text-gray-800",
      primary: "bg-primary-500 border-primary-600 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const closeButton = tv({
  base: [
    // Base styles
    "p-1.5",
    "rounded-full",
    "-mr-1",

    // Transitions
    "transition-all",
    "duration-200",

    // Focus states
    "outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",

    // Interactive
    "cursor-pointer",
    "select-none",
    "touch-manipulation",
  ],
  variants: {
    variant: {
      default:
        "text-gray-600 hover:text-gray-800 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
      primary:
        "text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20 focus:ring-primary-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const messageContainer = tv({
  base: ["flex-1", "overflow-y-auto", "p-4", "space-y-4"],
});

const messageItem = tv({
  base: [
    "max-w-[80%]",
    "px-4",
    "py-2",
    "rounded-lg",
    "shadow-sm",
    "break-words",
  ],
  variants: {
    sender: {
      user: "ml-auto bg-primary-500 text-white rounded-tr-none",
      bot: "mr-auto bg-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-700 dark:text-gray-100",
    },
  },
  defaultVariants: {
    sender: "bot",
  },
});

const typingIndicator = tv({
  base: [
    "flex",
    "space-x-1.5",
    "px-4",
    "py-2.5",
    "rounded-lg",
    "mr-auto",
    "bg-gray-100",
    "w-16",
    "dark:bg-gray-700",
  ],
});

const typingDot = tv({
  base: [
    "w-2",
    "h-2",
    "rounded-full",
    "bg-gray-500",
    "dark:bg-gray-400",
    "animate-bounce",
  ],
});

const inputContainer = tv({
  base: ["p-3", "border-t", "bg-white", "dark:bg-gray-800"],
  variants: {
    variant: {
      default: "border-gray-200",
      primary: "border-primary-600 bg-primary-900/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const form = tv({
  base: ["flex", "items-center", "gap-2"],
});

const input = tv({
  base: [
    "flex-1",
    "px-4",
    "py-2",
    "border",
    "rounded-full",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary-500",
    "transition-all",
    "duration-200",
  ],
  variants: {
    variant: {
      default:
        "border-gray-300 bg-white text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
      primary:
        "border-primary-400 bg-primary-900/10 text-white placeholder-white/70",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const sendButton = tv({
  base: [
    "p-2",
    "rounded-full",
    "flex",
    "items-center",
    "justify-center",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ],
  variants: {
    variant: {
      default:
        "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500",
      primary:
        "bg-white/10 text-white hover:bg-white/20 active:bg-white/30 focus:ring-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const chatAnimations = {
  container: {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  },
  message: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  },
};

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void | Promise<void> | Promise<string>;
  position?: "bottomRight" | "bottomLeft" | "topRight" | "topLeft";
  title?: string;
  placeholder?: string;
  variant?: "default" | "primary";
  isTyping?: boolean;
}

interface FormValues {
  message: string;
}

export const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(
  (
    {
      isOpen,
      onClose,
      messages,
      onSendMessage,
      position = "bottomRight",
      title = "Chat Support",
      placeholder = "Type your message...",
      variant = "default",
      isTyping = false,
    },
    ref,
  ) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
    } = useForm<FormValues>();

    const { context } = useFloating({
      open: isOpen,
      onOpenChange: (open) => {
        if (!open) onClose();
      },
    });

    const click = useClick(context);
    const role = useRole(context);
    const { getFloatingProps } = useInteractions([click, role]);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages, isTyping]);

    const onSubmit = async (data: FormValues) => {
      if (!data.message.trim()) return;

      await onSendMessage(data.message);
      reset();
    };

    return (
      <FloatingFocusManager context={context} modal>
        <motion.div
          ref={ref}
          className={chatContainer({ position, variant })}
          {...getFloatingProps()}
          variants={chatAnimations.container}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-labelledby="chat-title"
        >
          <header className={header({ variant })}>
            <h2 id="chat-title">{title}</h2>
            <button
              onClick={onClose}
              className={closeButton({ variant })}
              aria-label="Close chat"
            >
              <IoClose size={20} />
            </button>
          </header>

          <div
            ref={messageContainerRef}
            className={messageContainer()}
            role="log"
            aria-live="polite"
          >
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={messageItem({ sender: message.sender })}
                  variants={chatAnimations.message}
                  initial="hidden"
                  animate="visible"
                >
                  {message.text}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className={typingIndicator()}
                  variants={chatAnimations.message}
                  initial="hidden"
                  animate="visible"
                >
                  <span
                    className={typingDot()}
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className={typingDot()}
                    style={{ animationDelay: "300ms" }}
                  />
                  <span
                    className={typingDot()}
                    style={{ animationDelay: "600ms" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className={inputContainer({ variant })}>
            <form onSubmit={handleSubmit(onSubmit)} className={form()}>
              <input
                {...register("message", { required: true })}
                className={input({ variant })}
                placeholder={placeholder}
                aria-label="Type your message"
                autoComplete="off"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className={sendButton({ variant })}
                disabled={isSubmitting}
                aria-label="Send message"
              >
                <IoPaperPlaneOutline size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </FloatingFocusManager>
    );
  },
);

ChatWindow.displayName = "ChatWindow";

export default ChatWindow;
