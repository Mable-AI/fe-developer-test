import React, { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  className,
  checkboxClassName,
  labelClassName,
  checked,
  onChange,
  ...rest
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!rest.disabled) {
      setIsChecked(e.target.checked);
      if (onChange) {
        onChange(e);
      }
    }
  };

  const rootClass = tv({
    base: "flex items-center gap-2",
  });

  const checkboxClass = tv({
    base: "w-4 h-4 rounded border-white border-opacity-10 bg-white bg-opacity-10 text-white",
    variants: {
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
  });

  const labelClass = tv({
    base: "body-2 text-white cursor-pointer",
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
  });

  return (
    <div className={rootClass({ className })}>
      <input
        type="checkbox"
        id={name}
        className={checkboxClass({
          disabled: rest.disabled,
          className: checkboxClassName,
        })}
        disabled={rest.disabled}
        checked={isChecked}
        onChange={handleChange}
      />
      {label ? (
        <label
          htmlFor={name}
          className={labelClass({
            disabled: rest.disabled,
            className: labelClassName,
          })}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
