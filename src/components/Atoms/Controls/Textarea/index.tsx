import Label from "@/components/Atoms/Data_Display/Label";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
}

interface TextareaComponentProps extends TextareaProps {
  label?: string;
  footnote?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows, ...props }, ref) => {
    console.log("rows", rows);
    return (
      <textarea
        className={cn(
          "w-full rounded-md border border-outline bg-secondary px-3 py-2 text-sm shadow-sm placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-outline dark:placeholder:text-secondary dark:focus-visible:ring-primary text-text-secondary",
          className,
        )}
        rows={rows}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export default function TextArea({
  id,
  label,
  footnote,
  rows = 3,
  disabled,
  ...rest
}: TextareaComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={id} className="text-white text-lg">
          {label}
        </Label>
      )}
      <Textarea id={id} rows={rows} disabled={disabled} {...rest} />
      {footnote && <p className="text-white">{footnote}</p>}
    </div>
  );
}
