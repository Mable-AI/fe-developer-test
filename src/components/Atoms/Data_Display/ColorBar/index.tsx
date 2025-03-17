import React from "react";
import { tv } from "tailwind-variants";
import { Tooltip } from "../../Misc/Tooltip";

interface DataItem {
  value: number;
  color: string;
  label: string;
  tooltipContent?: React.ReactNode;
}

interface BarFillProps {
  className?: string;
  data: DataItem[];
  size?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "full";
}

const barFillVariants = tv({
  base: "flex w-full overflow-hidden relative transition-all duration-300",
  variants: {
    size: {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
    },
    rounded: {
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "full",
  },
});

const tooltipVariants = tv({
  base: "bg-tooltip/40 backdrop-blur-2xl text-white p-2 rounded text-sm whitespace-nowrap",
});

const BarFill: React.FC<BarFillProps> = ({
  className,
  data,
  size,
  rounded,
}) => {
  // Calculate the total value
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={barFillVariants({ className, size, rounded })}>
      {data.map((item, index) => {
        // Calculate the width percentage for each item
        const widthPercentage = (item.value / totalValue) * 100;

        return (
          <Tooltip
            key={`${item.label}-${index}`}
            variants="custom"
            content={
              <div className={tooltipVariants()}>
                {item.tooltipContent || (
                  <div className="flex items-center min-w-[300px] justify-between">
                    <div>{item.label}</div>
                    <div className="flex">
                      {item.value.toLocaleString()} (
                      {widthPercentage.toFixed(2)}%)
                    </div>
                  </div>
                )}
              </div>
            }
          >
            <div
              className={`${item.color} relative transition-all duration-500 ease-in-out hover:brightness-110`}
              style={{
                width: `${widthPercentage}%`,
                backgroundColor: item.color,
              }}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export default BarFill;
