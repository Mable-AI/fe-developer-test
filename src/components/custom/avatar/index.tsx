import React, { useState } from "react";
import { tv } from "tailwind-variants";

export interface AvatarProps {
  src?: string;
  alt: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}

const avatar = tv({
  slots: {
    base: ["inline-block", "overflow-hidden", "relative"],
    image: ["w-full", "h-full", "object-cover"],
    fallback: [
      "flex",
      "items-center",
      "justify-center",
      "w-full",
      "h-full",
      "bg-primary-400",
      "text-white",
      "font-medium",
    ],
  },
  variants: {
    size: {
      sm: {
        base: "w-8 h-8",
        fallback: "text-xs",
      },
      md: {
        base: "w-12 h-12",
        fallback: "text-sm",
      },
      lg: {
        base: "w-16 h-16",
        fallback: "text-base",
      },
    },
    rounded: {
      true: {
        base: "rounded-full",
        fallback: "rounded-full",
      },
      false: {
        base: "rounded",
        fallback: "rounded",
      },
    },
  },
  defaultVariants: {
    size: "md",
    rounded: true,
  },
});

const getInitials = (name: string): string => {
  const wordsInName = name.split(" ");
  const initialsOfEachWord = wordsInName.map((word) => word[0]);
  const initialsStr = initialsOfEachWord.join("");
  const resultStr = initialsStr.toUpperCase().slice(0, 2); // limit to 2 characters

  return resultStr;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size,
  rounded,
  className,
  imageClassName,
  fallbackClassName,
}) => {
  const [imageError, setImageError] = useState(false);

  const styles = avatar({ size, rounded });

  const showFallback = !src || imageError;

  let nodeToRender;

  if (showFallback) {
    let fallbackText = "";

    if (name) {
      fallbackText = getInitials(name);
    } else if (alt) {
      fallbackText = alt.charAt(0).toUpperCase();
    } else {
      fallbackText = "A";
    }

    nodeToRender = (
      <div className={`${styles.fallback()} ${fallbackClassName}`}>
        {fallbackText}
      </div>
    );
  } else {
    nodeToRender = (
      <img
        src={src}
        alt={alt}
        className={`${styles.image()} ${imageClassName}`}
        onError={() => setImageError(true)}
      />
    );
  }

  return <div className={`${styles.base()} ${className}`}>{nodeToRender}</div>;
};

export default Avatar;
