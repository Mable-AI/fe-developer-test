import React from "react";

interface InputErrorProps {
  disabled?: boolean;
  error?: string;
}

export const InputError: React.FC<InputErrorProps> = ({ disabled, error }) => {
  if (!disabled && !error) return null;

  return <span className="text-error-600 text-xs">{error}</span>;
};
