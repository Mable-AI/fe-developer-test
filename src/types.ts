import { ColumnDef } from "@tanstack/react-table";
import { FieldValues, UseFormProps } from "react-hook-form";

export interface DataGridProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  enableGlobalFilter?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  enableItemNumber?: boolean;
}

export type RadioOptions = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface CustomChangeEvent {
  target: {
    name: string;
    value: string | number | boolean;
    type: string;
  };
}

export interface RadioItems {
  label: string;
  value: string;
  disabled?: boolean;
}

export type ValidInputType = "email" | "tel" | "number" | "password";

export type InputComponentType =
  | "radio"
  | "switch"
  | "dropdown"
  | "default"
  | "checkbox"
  | "textarea";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "radio"
  | "dropdown"
  | "switch"
  | "checkbox"
  | "textarea";

export interface RadioItemProps {
  options: RadioOptions[];
  defaultValue: string;
  className: string;
}

export interface FormProps<TFieldValues extends FieldValues>
  extends UseFormProps<TFieldValues> {
  onSubmit: (data: TFieldValues) => void;
  children: React.ReactNode;
}

export interface MenuItem {
  label: string;
  key: string;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  menuList: MenuItem[];
  children: React.ReactNode;
  onChange: (
    value: MenuItem,
    event?:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>,
  ) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  position?: "bottom" | "top";
  disabled?: boolean;
  maxHeight?: string;
}

export interface ChannelItem {
  label: string;
  key: string;
  disabled?: boolean;
  icon: React.ReactNode;
}
export interface ChannelProps {
  menuList: ChannelItem[];
  onChange: (value: ChannelItem) => void;
  className?: string;
  defaultValue?: ChannelItem;
}

export interface SidebarItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  subItems: (Omit<SidebarItem, "subItems" | "id"> & { route: string })[];
}

export type CompanyBadge = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  logout?: () => void;
  logo: React.ReactNode;
  menu: {
    title: string;
    route: string;
  }[];
  onClick: (value: string) => void;
};
