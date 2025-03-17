import * as React from "react";
import { InputType, CustomChangeEvent } from "../index";
import { tv } from "tailwind-variants";

const inputClass = tv({
  base: "body-3 w-full rounded-xl h bg-white bg-opacity-10 ring-0 outline-0 focus:ring-1 active:ring-1 focus:ring-white active:ring-white transition-all ease-in-out duration-300 text-white",
  variants: {
    error: {
      true: "border border-error-600",
      false: "",
    },
    size: {
      sm: "body-5 font-medium rounded-md p-2",
      md: "body-3 rounded-xl p-3",
      lg: "body-3 rounded-xl p-4",
    },
    withIcon: {
      true: "pr-12",
    },
    disableNumberInputDefaults: {
      true: "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]",
    },
  },
});

const DefaultInput = ({
  defaultValue,
  disabled,
  isError,
  type,
  withIcon,
  handleChange,
  inputRef,
  className,
  parentRef,
  children,
  disableNumberInputDefaults,
  inputSize = "lg",
  ...restProps
}: {
  defaultValue?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  isError?: boolean;
  type: InputType;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void;
  inputRef: (e: HTMLInputElement | null) => void;
  className?: string;
  withIcon?: boolean;
  parentRef: React.ForwardedRef<HTMLInputElement>;
  children?: React.ReactNode;
  restProps?: any;
  disableNumberInputDefaults?: boolean;
  inputSize?: "sm" | "md" | "lg";
}) => {
  return (
    <div className="relative w-full">
      <input
        {...restProps}
        defaultValue={defaultValue}
        className={inputClass({
          error: isError,
          withIcon: withIcon,
          disableNumberInputDefaults: disableNumberInputDefaults,
          className,
          size: inputSize,
        })}
        disabled={disabled}
        id={randomIdGenerator()}
        type={type}
        onChange={handleChange}
        ref={(e) => {
          if (inputRef) inputRef(e);
          if (typeof parentRef === "function") parentRef(e);
          else if (parentRef) parentRef.current = e;
        }}
      />
      {children}
    </div>
  );
};

const randomIdGenerator = () => {
  return Math.random().toString(36).substring(2, 15);
};

export default DefaultInput;
