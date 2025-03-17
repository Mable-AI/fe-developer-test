import { tv } from "tailwind-variants";

interface BadgeProps {
  variant:
    | "primary"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "custom";
  label: string;
  rounded?: boolean;
  className?: string;
}

export default function Badge({
  variant,
  rounded = false,
  label,
  className,
}: BadgeProps) {
  const badgeVariants = tv({
    base: "w-fit text-white py-1 px-2 body-6 text-center",
    variants: {
      variant: {
        primary: "bg-primary-400",
        neutral: "bg-neutral-600",
        success: "bg-success-600",
        warning: "bg-warning-400",
        error: "bg-error-600",
        info: "bg-info-600",
        custom: "", // no default background
      },
      rounded: {
        true: "rounded-xl",
        false: "rounded-md",
      },
    },
  });

  return (
    <div className={badgeVariants({ variant, rounded, className })}>
      {label}
    </div>
  );
}
