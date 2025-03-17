import React from "react";
import { motion } from "framer-motion";
import { tv } from "tailwind-variants";
import { Button } from "@/components";
import { animationVariants } from "../utils/animations";

const navigation = tv({
  base: [
    // Layout
    "flex",
    "justify-between",
    "items-center",
    "gap-4",
    "px-6",
    "py-4",
    "mt-auto",

    // Visual
    "bg-nonUsers/50",
    "backdrop-blur-sm",
    "sticky",
    "bottom-0",
    "z-10",
  ],
});

interface ModalNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  getDirection: (current: number, previous: number) => number;
  prevStep: React.RefObject<number>;
}

export const ModalNavigation: React.FC<ModalNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  getDirection,
  prevStep,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <motion.div
      className={navigation()}
      variants={animationVariants.slideTransition}
      initial="enter"
      animate="center"
      exit="exit"
      custom={getDirection(currentStep, prevStep.current ?? 0)}
    >
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isFirstStep}
        aria-label="Previous step"
      >
        Go Back
      </Button>
      <Button
        onClick={onNext}
        aria-label={isLastStep ? "Complete steps" : "Next step"}
      >
        {isLastStep ? "Finish" : "Continue"}
      </Button>
    </motion.div>
  );
};
