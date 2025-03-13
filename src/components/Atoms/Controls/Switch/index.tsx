import React, { InputHTMLAttributes, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ name, label, className, checked, onChange, ...rest }, ref) => {
    const formContext = useFormContext();
    const isControlled = checked !== undefined && onChange !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isControlled && onChange) {
        onChange(e);
      }
    };

    const inputProps = isControlled
      ? { checked, onChange: handleChange }
      : formContext
        ? formContext.register(name)
        : {};

    const labelClass = tv({
      base: "flex items-center w-fit",
      variants: {
        disabled: {
          true: "cursor-not-allowed opacity-60",
          false: "cursor-pointer",
        },
      },
    });

    const trackClass = tv({
      base: [
        // Base styles
        "relative",
        "cursor-pointer",
        "w-11",
        "h-6",
        "rounded-full",
        "transition-all",
        "duration-200",
        "ease-in-out",
        // Colors
        "bg-gray-200",
        "dark:bg-gray-700",
        "peer-checked:bg-primary-400",
        // Focus styles
        "peer-focus-visible:ring-2",
        "peer-focus-visible:ring-primary-400",
        "peer-focus-visible:ring-offset-2",
        "peer-focus-visible:ring-offset-background",
        // Thumb styles
        "after:content-['']",
        "after:absolute",
        "after:top-0.5",
        "after:left-[2px]",
        "after:bg-white",
        "after:border-gray-300",
        "after:border",
        "after:rounded-full",
        "after:h-5",
        "after:w-5",
        "after:transition-all",
        "peer-checked:after:translate-x-full",
        "peer-checked:after:border-white",
        // Disabled state
        "peer-disabled:opacity-60",
        "peer-disabled:cursor-not-allowed",
      ],
    });

    const switchInputId = `switch-${name}-${crypto.randomUUID()}`;

    return (
      <div className={labelClass({ disabled: rest.disabled, className })}>
        {label && <span className="body-2 text-white mr-3">{label}</span>}

        <input
          type="checkbox"
          id={switchInputId}
          className="sr-only peer"
          {...inputProps}
          {...rest}
          ref={ref}
          aria-checked={checked}
          role="switch"
          tabIndex={rest.disabled ? -1 : 0}
        />
        <label
          className={trackClass()}
          htmlFor={switchInputId}
          aria-hidden="true"
        />
      </div>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
