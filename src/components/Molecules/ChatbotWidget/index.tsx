import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoChatbubbleEllipses } from "react-icons/io5";
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
    "fixed",
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
  },
});

type WidgetPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type Position = "absolute" | "fixed" | "relative" | "static";

interface ChatbotWidgetProps {
  title?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  setIsOpen?: (open: boolean) => void;
  disabled?: boolean;
  position?: Position;
  widgetPosition?: WidgetPosition;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  title = "Chat Support",
  children,
  isOpen: controlledIsOpen,
  setIsOpen,
  className,
  disabled = false,
  position = "static",
  widgetPosition = "top-right",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const onOpenChange = setIsOpen ?? setInternalIsOpen;

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
                className="bg-white rounded-lg shadow-lg p-4 w-[300px]  flex flex-col"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
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
                {children}
              </motion.div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
