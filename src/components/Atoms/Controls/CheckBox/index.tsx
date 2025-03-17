import { forwardRef, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

interface CheckBoxProps {
  name: string;
  label?: string;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      name,
      label,
      className,
      checkboxClassName,
      labelClassName,
      checked,
      disabled,
      onChange,
      size = "md",
      ...rest
    },
    ref,
  ) => {
    const formContext = useFormContext();
    const isControlled = checked !== undefined && onChange !== undefined;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!disabled && isControlled) {
        onChange?.(e);
      }
    };

    const inputProps = isControlled
      ? { checked, onChange: handleChange }
      : formContext
        ? formContext.register(name)
        : {};

    const rootClass = tv({
      base: "flex items-center gap-2",
    });

    const checkboxClass = tv({
      base: "appearance-none h-5 w-5 border border-gray-300 rounded bg-white checked:bg-primary-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200",
      variants: {
        disabled: {
          true: "cursor-not-allowed opacity-50",
          false: "cursor-pointer",
        },
        size: {
          sm: "w-4 h-4",
          md: "w-5 h-5",
          lg: "w-6 h-6",
        },
      },
      defaultVariants: {
        size: "md",
      },
    });

    const labelClass = tv({
      base: "body-2 text-white cursor-pointer",
      variants: {
        disabled: {
          true: "cursor-not-allowed opacity-50",
          false: "cursor-pointer",
        },
        size: {
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
        },
      },
      defaultVariants: {
        size: "md",
      },
    });

    return (
      <div className={rootClass({ className })}>
        <input
          ref={ref}
          id={name}
          type="checkbox"
          disabled={disabled}
          {...inputProps}
          className={checkboxClass({
            disabled,
            className: checkboxClassName,
            size,
          })}
          {...rest}
        />
        {label && (
          <label
            htmlFor={name}
            className={labelClass({
              disabled,
              className: labelClassName,
              size,
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
