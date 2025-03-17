import React from "react";
import Label from "@/components/Atoms/Data_Display/Label";
import { tv } from "tailwind-variants";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
  defaultValue?: string | number | readonly string[];
  errors?: boolean;
}

interface TextareaComponentProps extends TextareaProps {
  label?: string;
  footnote?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const textareaStyle = tv({
  base: "body-3 w-full rounded-xl p-4 bg-white bg-opacity-10 ring-0 outline-0 focus:ring-1 active:ring-1 focus:ring-white active:ring-white transition-all ease-in-out duration-300 text-white",
  variants: {
    error: {
      true: "border border-error-600",
      false: "",
    },
  },
});

const BaseTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows, disabled, errors, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        defaultValue={props.defaultValue}
        rows={rows}
        disabled={disabled}
        className={textareaStyle({ className, error: errors })}
        {...props}
      />
    );
  },
);
BaseTextarea.displayName = "BaseTextarea";

export default function TextArea({
  id,
  label,
  footnote,
  rows = 3,
  disabled = false,
  defaultValue,
  className,
  errors,
  ...rest
}: TextareaComponentProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label htmlFor={id} className="text-white text-lg">
          {label}
        </Label>
      )}
      <BaseTextarea
        id={id}
        rows={rows}
        disabled={disabled}
        defaultValue={defaultValue}
        errors={errors}
        {...rest}
      />
      {footnote && <p className="text-white">{footnote}</p>}
    </div>
  );
}
