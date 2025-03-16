import { useFormContext, RegisterOptions, useWatch } from "react-hook-form";
import { tv } from "tailwind-variants";
import Switch from "@/components/Atoms/Controls/Switch";
import DropdownMenu from "@/components/Molecules/Dropdowns";
import Radio from "../RadioButton";
import {
  CustomChangeEvent,
  InputComponentType,
  InputType,
  MenuItem,
  RadioItems,
  ValidInputType,
} from "@/types";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Tooltip } from "../../Misc/Tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { forwardRef, useCallback, useEffect, useState } from "react";
import CheckBox from "../CheckBox";
import TextArea from "../Textarea";

const validInputTypes: InputType[] = [
  "radio",
  "switch",
  "checkbox",
  "dropdown",
  "password",
  "textarea",
];

const getTypeValidations = (): Record<
  ValidInputType,
  Partial<RegisterOptions>
> => ({
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  tel: {
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Invalid phone number (10 digits required)",
    },
  },
  number: {
    valueAsNumber: true,
    min: { value: 0, message: "Value must be positive" },
  },
  password: {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    validate: (value: string) => {
      const patterns = [/[A-Z]/, /[a-z]/, /\d/, /\W/];
      return (
        patterns.every((pattern) => pattern.test(value)) ||
        "Password must contain an uppercase letter, lowercase letter, number, and special character"
      );
    },
  },
});

interface CustomInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size"
  > {
  name: string;
  label?: string;
  tooltip?: string;
  type: InputType;
  radioOptions?: RadioItems[];
  required?: boolean;
  badge?: string;
  dropdownOptions?: MenuItem[];
  customValidation?: RegisterOptions;
  size?: "sm" | "md" | "lg";
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | CustomChangeEvent,
  ) => void;
  rows?: number;
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
  },
});

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
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
      size,
      rows,
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

    const [showPassword, setShowPassword] = useState(false);

    const getValidationRules = (): RegisterOptions => {
      if (customValidation) {
        return customValidation;
      }

      const rules: RegisterOptions = {
        required:
          type !== "switch" && type !== "checkbox" && required
            ? `${label || name} is required`
            : false,
      };

      const typeValidations = getTypeValidations();

      if (type && Object.keys(typeValidations).includes(type as string)) {
        Object.assign(rules, typeValidations[type as ValidInputType]);
      }

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

    const createCustomEvent = (
      value: string | number | boolean,
    ): CustomChangeEvent => ({
      target: { name, value, type },
    });

    const renderInput = useCallback(() => {
      const inputComponent = {
        radio: (
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
          />
        ),
        switch: (
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
                else if (ref) (ref as React.MutableRefObject<any>).current = e;
              }
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(createCustomEvent(event.target.checked))
            }
          />
        ),
        checkbox: (
          <CheckBox
            disabled={disabled}
            name={name}
            label={label}
            className={className}
            size={size}
            {...props}
            ref={(e) => {
              if (e) {
                inputRef(e);
                if (typeof ref === "function") ref(e);
                else if (ref) (ref as React.MutableRefObject<any>).current = e;
              }
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(createCustomEvent(event.target.checked))
            }
          />
        ),
        textarea: (
          <TextArea
            defaultValue={props.defaultValue}
            rows={rows}
            label={label}
            onChange={handleChange}
            disabled={disabled}
            className={className}
            errors={errors[name] !== undefined}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ),
        dropdown: (
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
        ),
        default: (
          <div className="relative w-full">
            <input
              defaultValue={props.defaultValue}
              className={inputClass({
                error: !disabled && errors[name] !== undefined,
                withIcon: type === "password",
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
            {type === "password" && (
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            )}
          </div>
        ),
      };

      const componentKey = validInputTypes.includes(type as InputType)
        ? (type as InputComponentType)
        : "default";
      return inputComponent[componentKey] || inputComponent.default;
    }, [type]);

    useEffect(() => {
      renderInput();
      if (!disabled) resetField(name, { defaultValue: props.defaultValue });
    }, [disabled, name, props.defaultValue, resetField, renderInput]);

    const renderLabel = () => {
      if (
        type === "switch" ||
        type === "radio" ||
        type === "checkbox" ||
        type === "textarea"
      )
        return null;
      return (
        <label htmlFor={name} className="body-2 text-white">
          {label}
        </label>
      );
    };

    const renderTooltip = (text: string) => {
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

    const showError = !disabled && errors[name];

    return (
      <div
        className={`flex flex-col gap-2 w-full py-1 h-fit ${
          disabled ? "opacity-40" : "opacity-100"
        }`}
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
        {showError && (
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
