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
      base: "w-4 h-4 rounded border-white border-opacity-10 bg-white bg-opacity-10 text-white",
      variants: {
        disabled: {
          true: "cursor-not-allowed opacity-50",
          false: "cursor-pointer",
        },
        size: {
          sm: "w-3 h-3",
          md: "w-4 h-4",
          lg: "w-5 h-5",
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
