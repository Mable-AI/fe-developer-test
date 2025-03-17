import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "../../../Misc/Tooltip";
import Badge from "../../../Misc/Badge";

interface InputLabelProps {
  name: string;
  label?: string;
  badge?: string;
  tooltip?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  type?: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  name,
  label,
  badge,
  tooltip,
  tooltipPlacement,
  type,
}) => {
  if (!label && !badge && !tooltip) return null;

  return (
    <div className="flex flex-row items-center space-x-3">
      {label && type !== "switch" && type !== "radio" && (
        <label htmlFor={name} className="body-2 text-white">
          {label}
        </label>
      )}
      {badge && (
        <Badge variant="neutral" rounded={true} label={badge} caption={true} />
      )}
      {tooltip && (
        <Tooltip content={tooltip} placement={tooltipPlacement}>
          <div>
            <AiOutlineInfoCircle
              className="text-white flex-shrink-0"
              size={16}
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
};
