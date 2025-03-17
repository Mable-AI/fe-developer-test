import * as React from "react";
import { useFormContext, RegisterOptions, useWatch } from "react-hook-form";
import Switch from "@/components/Atoms/Controls/Switch";
import DropdownMenu from "@/components/Molecules/Dropdowns";
import Radio from "../RadioButton";
import { MenuItem, RadioOptions } from "@/types";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { InputLabel } from "./components/InputLabel";
import { InputError } from "./components/InputError";
import DefaultInput from "./components/DefaultInput";
export interface CustomChangeEvent {
  target: {
    name: string;
    value: any;
    type: string;
  };
}

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "radio"
  | "switch"
  | "checkbox"
  | "dropdown";

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  name: string;
  label?: string;
  tooltip?: string;
  type: InputType;
  radioOptions?: Array<RadioOptions>;
  required?: boolean;
  badge?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  dropdownOptions?: Array<MenuItem>;
  customValidation?: RegisterOptions;
  inputSize?: "sm" | "md" | "lg";

  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void;
}

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
      tooltipPlacement,
      inputSize = "lg",
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

    const createCustomEvent = (value: any): CustomChangeEvent => ({
      target: {
        name,
        value,
        type,
      },
    });

    const renderInput = () => {
      const commonPropsForDefaultInput = {
        ...inputProps,
        ...props,
        className,
        disabled,
        parentRef: ref,
        inputRef,
        defaultValue: props.defaultValue,
        isError: !disabled && errors[name] !== undefined,
        handleChange,
        size: inputSize,
      };

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
              size={inputSize}
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
              onChange={(checked) => handleChange(createCustomEvent(checked))}
            />
          );
        case "dropdown":
          return (
            <DropdownMenu
              disabled={disabled}
              size={inputSize}
              menuList={dropdownOptions || []}
              onChange={(value) => handleChange(createCustomEvent(value.label))}
              className={className}
            >
              {fieldValue
                ? fieldValue
                : (props.defaultValue ?? props.placeholder)}
            </DropdownMenu>
          );
        case "tel":
          return (
            <DefaultInput
              {...commonPropsForDefaultInput}
              type="number"
              disableNumberInputDefaults={true}
            />
          );
        case "password":
          return (
            <DefaultInput
              withIcon={true}
              type={showPassword ? "text" : "password"}
              {...commonPropsForDefaultInput}
            >
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </DefaultInput>
          );

        default:
          return <DefaultInput {...commonPropsForDefaultInput} type={type} />;
      }
    };

    React.useEffect(() => {
      if (!disabled) resetField(name, { defaultValue: props.defaultValue });
    }, [disabled]);

    return (
      <div
        className={`flex flex-col gap-2 w-full  py-1 h-full ${disabled ? "opacity-40" : "opacity-100"}`}
      >
        <InputLabel
          name={name}
          label={label}
          tooltip={tooltip}
          tooltipPlacement={tooltipPlacement}
          type={type}
        />
        {renderInput()}
        <InputError error={errors[name]?.message as string} />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
