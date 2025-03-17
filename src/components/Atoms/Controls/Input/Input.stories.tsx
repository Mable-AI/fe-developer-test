import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Input from "./index";
import { Form } from "@/components";

const meta: Meta<typeof Input> = {
  title: "Atoms/Control/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "radio",
        "switch",
        "dropdown",
      ],
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWrapper: React.FC<React.ComponentProps<typeof Input>> = (args) => {
  return (
    <Form onSubmit={(data) => console.log(data)}>
      <Input {...args} />
    </Form>
  );
};

export const Default: Story = {
  args: {
    name: "demo-default-input",
    type: "text",
    label: "Default Input",
    defaultValue: "",
    required: true,
    dropdownOptions: [
      { label: "Option 1", key: "1" },
      { label: "Option 2", key: "2" },
      { label: "Option 3", key: "3" },
    ],
    radioOptions: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "The default input configuration showing all possible options.",
      },
    },
  },
};

export const Text: Story = {
  args: {
    name: "demo-text-input",
    type: "text",
    label: "Text Input",
    required: true,
    tooltip: "This is a tooltip",
    placeholder: "Enter text",
    defaultValue: "Hi there",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
A basic text input field.

\`\`\`jsx
<Input
  name="text-input"
  type="text"
  label="Text Input"
  placeholder="Enter text"
/>
\`\`\`
        `,
      },
    },
  },
};

export const Email: Story = {
  args: {
    name: "demo-email-input",
    type: "email",
    label: "Email Input",
    placeholder: "Enter email",
    tooltip: "This is a tooltip",
    badge: "Professional",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "An email input field with built-in email validation.",
      },
    },
  },
};

export const Password: Story = {
  args: {
    name: "demo-password-input",
    type: "password",
    label: "Password Input",
    placeholder: "Enter password",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A password input field with strong password validation.",
      },
    },
  },
};

export const Number: Story = {
  args: {
    name: "demo-number-input",
    type: "number",
    label: "Number Input",
    placeholder: "Enter number",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A number input field that only accepts numeric values.",
      },
    },
  },
};

export const Tel: Story = {
  args: {
    name: "demo-tel-input",
    type: "tel",
    label: "Telephone Input",
    placeholder: "Enter phone number",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A telephone input field with phone number validation.",
      },
    },
  },
};

export const Radio: Story = {
  args: {
    name: "demo-radio-input",
    type: "radio",
    label: "Radio Input",
    inputSize: "sm",
    radioOptions: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A radio button group input.",
      },
    },
  },
};

export const Switch: Story = {
  args: {
    name: "demo-switch-input",
    type: "switch",
    label: "Switch Input",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A switch input for boolean values.",
      },
    },
  },
};

export const Dropdown: Story = {
  args: {
    name: "demo-dropdown-input",
    type: "dropdown",
    label: "Dropdown Input",
    defaultValue: "Option 1",
    dropdownOptions: [
      { label: "Option 1", key: "1" },
      { label: "Option 2", key: "2" },
      { label: "Option 3", key: "3" },
    ],
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A dropdown select input.",
      },
    },
  },
};

export const WithBadge: Story = {
  args: {
    name: "demo-badge-input",
    type: "text",
    label: "Input with Badge",
    badge: "Optional",
    placeholder: "Enter text",
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "An input field with an additional badge, useful for showing extra information.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    name: "demo-disabled-input",
    type: "text",
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "A disabled input field.",
      },
    },
  },
};

export const WithCustomValidation: Story = {
  args: {
    name: "demo-custom-validation-input",
    type: "text",
    label: "Custom Validation Input",
    placeholder: "Enter more than 5 characters",
    customValidation: {
      validate: (value: string) =>
        value.length > 5 || "Must be more than 5 characters",
    },
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "An input field with custom validation rules.",
      },
    },
  },
};

export const WithCustomOnChange: Story = {
  args: {
    name: "demo-custom-onChange-input",
    type: "text",
    label: "Custom OnChange Input",
    placeholder: "Type something",
    onChange: (e: any) => {
      if ("target" in e) {
        console.log("Custom onChange:", e.target.value);
      } else {
        console.log("Custom onChange:", e.value);
      }
    },
  },
  render: (args) => <InputWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: "An input field with a custom onChange handler.",
      },
    },
  },
};

meta.parameters = {
  docs: {
    description: {
      component: `
The Input component is a versatile and customizable input field that supports various types of inputs including text, email, password, number, telephone, radio buttons, switches, and dropdowns. It integrates seamlessly with react-hook-form for form state management and validation.

## Features

- Supports multiple input types: text, email, password, number, tel, radio, switch, and dropdown
- Built-in validation for common input types
- Custom validation support
- Integrates with react-hook-form
- Customizable styling with Tailwind CSS
- Accessibility features
- Support for additional badges
- Custom onChange handler support

## Usage

To use the Input component, wrap it inside a \`FormProvider\` from react-hook-form:

\`\`\`jsx
import { useForm, FormProvider } from 'react-hook-form';
import Input from './Input';

const MyForm = () => {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="email" type="email" label="Email" required />
        <Input name="password" type="password" label="Password" required />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
\`\`\`

## Props

The following table shows which props are applicable to each input type:

### Prop Descriptions

| Prop Name | Type | Description |
|-----------|------|-------------|
| name | string | The name of the input field (required) |
| label | string | The label for the input field |
| required | boolean | Whether the field is required (default: true) |
| disabled | boolean | Whether the input is disabled |
| className | string | Additional CSS classes |
| placeholder | string | Placeholder text for the input |
| radioOptions | Array < RadioOptions > | Options for radio inputs |
| dropdownOptions |  Array < MenuItem > | Options for dropdown inputs |
| customOnChange | function | Custom onChange handler |
| customValidation | RegisterOptions | Custom validation rules |
| badge | string | Text to display in a badge next to the label |

Note: All standard HTML input attributes are also supported and will be passed to the underlying input element.
      `,
    },
  },
};
