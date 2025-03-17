import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      color: {
        default: "text-gray-900 dark:text-white",
        muted: "text-gray-500 dark:text-gray-400",
        error: "text-red-500",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
      weight: "medium",
    },
  },
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, size, color, weight, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, color, weight }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
