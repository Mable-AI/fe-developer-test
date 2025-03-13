import * as React from "react";
import { useFormContext, RegisterOptions, useWatch } from "react-hook-form";
import { tv } from "tailwind-variants";
import Switch from "@/components/Atoms/Controls/Switch";
import DropdownMenu from "@/components/Molecules/Dropdowns";
import Radio from "../RadioButton";
import { MenuItem } from "@/types";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Tooltip } from "../../Misc/Tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Checkbox from "../Checkbox";

export interface CustomChangeEvent {
  target: {
    name: string;
    value: string | boolean;
    type: string;
  };
}

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  tooltip?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "radio"
    | "switch"
    | "checkbox"
    | "dropdown";
  radioOptions?: Array<{ label: string; value: string; disabled?: boolean }>;
  required?: boolean;
  badge?: string;
  dropdownOptions?: Array<MenuItem>;
  customValidation?: RegisterOptions;
  prefix?: string;
  suffix?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void;
}

const inputClass = tv({
  base: "body-3 w-full rounded-xl p-4 bg-white bg-opacity-10 ring-0 outline-0 focus:ring-1 active:ring-1 focus:ring-white active:ring-white transition-all ease-in-out duration-300 text-white",
  variants: {
    error: {
      true: "border border-error-600",
      false: "",
    },
    withIcon: {
      true: "pr-12", // Add padding to the right to accommodate the icon
    },
    withPrefix: {
      true: "pl-12", // Add padding to the left to accommodate the prefix
    },
    withSuffix: {
      true: "pr-12", // Add padding to the right to accommodate the suffix
    },
  },
});

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      disabled,
      name,
      label,
      tooltip,
      type,
      radioOptions,
      required = true,
      badge,
      className,
      dropdownOptions,
      onChange,
      customValidation,
      ...props
    },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
      setValue,
      trigger,
      resetField,
      control,
    } = useFormContext();

    const fieldValue = useWatch({
      control,
      name,
      defaultValue: props.defaultValue,
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const getValidationRules = (): RegisterOptions => {
      let rules: RegisterOptions = {
        required:
          type !== "switch" && required
            ? `${label || name} is required`
            : false,
      };

      switch (type) {
        case "email":
          rules.pattern = {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          };
          break;
        case "tel":
          rules.pattern = {
            value: /^[0-9]{10}$/,
            message: "Invalid phone number (10 digits required)",
          };
          break;
        case "number":
          rules.valueAsNumber = true;
          rules.min = { value: 0, message: "Value must be positive" };
          break;
        case "password":
          rules.minLength = {
            value: 8,
            message: "Password must be at least 8 characters long",
          };
          rules.validate = (value) => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            const hasNonalphas = /\W/.test(value);
            if (
              !hasUpperCase ||
              !hasLowerCase ||
              !hasNumbers ||
              !hasNonalphas
            ) {
              return "Password must contain an uppercase letter, lowercase letter, number, and special character";
            }
            return true;
          };
          break;
      }

      if (customValidation) rules = { ...customValidation };

      return rules;
    };

    const { ref: inputRef, ...inputProps } = register(
      name,
      getValidationRules(),
    );

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
    ) => {
      if ("nativeEvent" in event) {
        inputProps.onChange(event);
      } else {
        // For custom components, manually call setValue
        setValue(name, event.target.value);
      }

      if (onChange) {
        onChange(event);
      }

      trigger(name);
    };

    const createCustomEvent = (value: string | boolean): CustomChangeEvent => ({
      target: {
        name,
        value,
        type,
      },
    });

    const renderInput = () => {
      let prefixNode = null;
      let suffixNode = null;

      switch (type) {
        case "radio":
          return (
            <Radio
              options={
                radioOptions?.map((option) => ({
                  ...option,
                  disabled: option.disabled || disabled,
                })) || []
              }
              defaultValue={String(props.defaultValue)}
              className="space-y-2"
              labelClassName="body-2 text-white ml-3"
              onClick={(selectedOption) =>
                handleChange(createCustomEvent(selectedOption.value))
              }
              size="sm"
            />
          );
        case "switch":
          return (
            <Switch
              disabled={disabled}
              name={name}
              label={label}
              className={className}
              {...props}
              ref={(e) => {
                if (e) {
                  inputRef(e);
                  if (typeof ref === "function") ref(e);
                  else if (ref) ref.current = e;
                }
              }}
              onChange={(e) => {
                const checked = e.target.checked;
                handleChange(createCustomEvent(checked));
              }}
            />
          );
        case "dropdown":
          return (
            <DropdownMenu
              disabled={disabled}
              size="lg"
              menuList={dropdownOptions || []}
              onChange={(value) => handleChange(createCustomEvent(value.label))}
              className={className}
            >
              {fieldValue
                ? fieldValue
                : (props.defaultValue ?? props.placeholder)}
            </DropdownMenu>
          );
        case "checkbox":
          return (
            <Checkbox
              name={name}
              label={label}
              className={className}
              {...props}
            />
          );
        default:
          if (props.prefix)
            prefixNode = (
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 body-3 text-white">
                {props.prefix}
              </span>
            );

          if (props.suffix)
            suffixNode = (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 body-3 text-white">
                {props.suffix}
              </span>
            );

          return (
            <div className="relative w-full">
              {prefixNode}
              <input
                defaultValue={props.defaultValue}
                className={inputClass({
                  error: !disabled && errors[name] !== undefined,
                  withIcon: type === "password",
                  withPrefix: !!props.prefix,
                  withSuffix: !!props.suffix,
                  className,
                })}
                disabled={disabled}
                id={name}
                type={type === "password" && showPassword ? "text" : type}
                {...inputProps}
                onChange={handleChange}
                {...props}
                ref={(e) => {
                  inputRef(e);
                  if (typeof ref === "function") ref(e);
                }}
              />
              {type === "password" ? (
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoIosEyeOff size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </button>
              ) : (
                suffixNode
              )}
            </div>
          );
      }
    };

    React.useEffect(() => {
      renderInput();
      if (!disabled) resetField(name, { defaultValue: props.defaultValue });
    }, [disabled]);

    const renderLabel = () => {
      if (type === "switch" || type === "radio") return null;
      return (
        <label htmlFor={name} className="body-2 text-white">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      );
    };

    const renderTooltip = (text: string) => {
      if (!tooltip) return null;
      return (
        <Tooltip content={text}>
          <div>
            <AiOutlineInfoCircle
              className="text-white flex-shrink-0"
              size={16}
            />
          </div>
        </Tooltip>
      );
    };
    return (
      <div
        className={`flex flex-col gap-2 w-full py-1 h-fit ${disabled ? "opacity-40" : "opacity-100"}`}
      >
        <div className="flex flex-row items-center space-x-3">
          {label && renderLabel()}
          {badge && (
            <div className="caption text-white py-1 px-2 rounded-xl bg-white bg-opacity-10">
              {badge}
            </div>
          )}
          {tooltip && renderTooltip(tooltip)}
        </div>
        {renderInput()}
        {!disabled && errors[name] && (
          <span className="text-error-600 text-xs">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
