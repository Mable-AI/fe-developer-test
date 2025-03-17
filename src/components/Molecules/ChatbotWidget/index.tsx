import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoChatbubbleEllipses, IoSend } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm, FormProvider } from "react-hook-form";
import { tv } from "tailwind-variants";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { Input } from "@/components";

const toggleButton = tv({
  base: [
    "bg-primary-500",
    "text-white",
    "rounded-full",
    "p-4",
    "shadow-lg",
    "hover:bg-primary-600",
    "transition-colors",
    "duration-200",
  ],
  variants: {
    widgetPosition: {
      "top-right": ["top-4", "right-4"],
      "top-left": ["top-4", "left-4"],
      "bottom-right": ["bottom-4", "right-4"],
      "bottom-left": ["bottom-4", "left-4"],
    },
    position: {
      absolute: ["absolute"],
      fixed: ["fixed"],
      relative: ["relative"],
      static: ["static"],
    },
    size: {
      sm: ["p-2"],
      md: ["p-3"],
      lg: ["p-4"],
    },
  },
});

const messageColorDifferentiator = tv({
  base: ["text-sm", "text-gray-500", "p-2", "max-w-[80%]", "rounded-lg"],
  variants: {
    sender: {
      user: ["text-primary-500", "bg-secondary-500"],
      bot: ["text-secondary-500", "bg-primary-500"],
    },
  },
});

const messageAlignDifferentiator = tv({
  base: ["flex"],
  variants: {
    sender: {
      user: ["justify-end"],
      bot: ["justify-start"],
    },
  },
});
type WidgetPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type Position = "absolute" | "fixed" | "relative" | "static";
type chats = {
  id: string;
  message: string;
  sender: "user" | "bot";
  timestamp: string;
};

interface ChatbotWidgetProps {
  title?: string;
  isOpen?: boolean;
  className?: string;
  setIsOpen?: (open: boolean) => void;
  disabled?: boolean;
  position?: Position;
  widgetPosition?: WidgetPosition;
  chats?: chats[];
  isLoading?: boolean;
  onSubmit?: (userMessage: string) => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  title = "Chat Support",
  chats,
  isLoading,
  isOpen: controlledIsOpen,
  setIsOpen,
  className,
  disabled = false,
  position = "static",
  widgetPosition = "top-right",
  onSubmit,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const onOpenChange = setIsOpen ?? setInternalIsOpen;

  type FormValues = {
    message: string;
  };

  const form = useForm<FormValues>();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange,
    middleware: [offset(16), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <div className={className}>
      <button
        ref={refs.setReference}
        className={toggleButton({ position, widgetPosition })}
        {...getReferenceProps()}
        disabled={disabled}
      >
        <IoChatbubbleEllipses size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <motion.div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className="bg-nonUsers text-white border-2 border-primary-400 rounded-2xl p-4 w-[300px] md:w-[600px] flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.04, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close chat"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {!chats?.length ? (
                  <div className="flex items-center justify-center h-full py-4">
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px] p-4">
                    {chats?.map((chat) => (
                      <div
                        key={chat.id}
                        className={messageAlignDifferentiator({
                          sender: chat.sender,
                        })}
                      >
                        <p
                          className={messageColorDifferentiator({
                            sender: chat.sender,
                          })}
                        >
                          {chat.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <FormProvider {...form}>
                  <form
                    onSubmit={form.handleSubmit((data: FormValues) => {
                      onSubmit?.(data.message);
                    })}
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <Input
                        name="message"
                        type="text"
                        placeholder="How can I help you today?"
                        inputSize="md"
                        disabled={isLoading}
                      ></Input>
                      <button
                        className={toggleButton({ size: "md" })}
                        type="submit"
                      >
                        {isLoading ? (
                          <AiOutlineLoading3Quarters
                            height={12}
                            width={12}
                            className="animate-spin"
                          />
                        ) : (
                          <IoSend height={12} width={12} />
                        )}
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </motion.div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
