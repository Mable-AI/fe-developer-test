import React from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { tv } from "tailwind-variants";
import { animationVariants } from "../utils/animations";

const header = tv({
  base: [
    // Layout
    "flex",
    "justify-between",
    "items-center",
    "bg-inherit",
    "w-full",

    // Typography
    "text-xl",
    "font-medium",

    // Visual
    "sticky",
    "top-0",
    "z-10",
  ],
  variants: {
    space: {
      default: "px-6 py-4",
      extra: "p-8 pb-4",
    },
  },
});

const closeButton = tv({
  base: [
    // Base styles
    "p-2",
    "rounded-lg",
    "-mr-2",

    // Colors
    "text-white/70",
    "hover:text-white",
    "hover:bg-white/10",
    "active:bg-white/20",

    // Transitions
    "transition-all",
    "duration-200",

    // Focus states
    "outline-none",

    // Interactive
    "cursor-pointer",
    "select-none",
    "touch-manipulation",
  ],
});

interface ModalHeaderProps {
  title: React.ReactNode;
  onClose: () => void;
  currentStep: number;
  getDirection: (current: number, previous: number) => number;
  prevStep: React.RefObject<number>;
  space?: "default" | "extra";
  labelId: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  currentStep,
  getDirection,
  prevStep,
  space = "default",
  labelId,
}) => {
  return (
    <header className={header({ space })}>
      <AnimatePresence
        mode="wait"
        custom={getDirection(currentStep, prevStep.current ?? 0)}
        initial={false}
      >
        <motion.h2
          key={`title-${currentStep}`}
          variants={animationVariants.slideTransition}
          initial="enter"
          animate="center"
          exit="exit"
          custom={getDirection(currentStep, prevStep.current ?? 0)}
          id={labelId}
          className="flex items-center gap-4"
        >
          {title}
        </motion.h2>
      </AnimatePresence>

      <button
        onClick={onClose}
        className={closeButton()}
        aria-label="Close dialog"
      >
        <IoClose size={24} />
      </button>
    </header>
  );
};
