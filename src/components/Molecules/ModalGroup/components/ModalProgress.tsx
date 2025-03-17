import React from "react";
import { motion } from "framer-motion";
import { tv } from "tailwind-variants";

const progress = tv({
  base: ["flex", "items-center", "justify-center", "gap-2", "w-full", "py-4"],
});

const stepIndicator = tv({
  base: ["w-2", "h-2", "rounded-full", "transition-all", "duration-200"],
  variants: {
    status: {
      active: "bg-white",
      completed: "bg-white/50",
      upcoming: "bg-white/20",
    },
  },
});

interface ModalProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const ModalProgress: React.FC<ModalProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className={progress()}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          className={stepIndicator({
            status:
              index === currentStep
                ? "active"
                : index < currentStep
                  ? "completed"
                  : "upcoming",
          })}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
};
