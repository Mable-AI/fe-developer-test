import React, { useState, useCallback, useRef } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenuProps, MenuItem } from "@/types";
import { tv } from "tailwind-variants";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menuList,
  children,
  onChange,
  className,
  size: buttonSize = "md",
  position = "bottom",
  disabled = false,
}) => {
  console.log("menuList", menuList);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listItemsRef = useRef<(HTMLElement | null)[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    placement: position === "bottom" ? "bottom-start" : "top-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: "40vh",
          });
        },
        padding: 8,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const listNavigation = useListNavigation(context, {
    listRef: listItemsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, listNavigation],
  );

  const handleItemClick = useCallback(
    (
      item: MenuItem,
      event?:
        | React.MouseEvent<HTMLElement, MouseEvent>
        | React.KeyboardEvent<HTMLElement>,
    ) => {
      onChange(item, event);
      setIsOpen(false);
    },
    [onChange],
  );

  const dropDownButtonClassName = tv({
    base: "bg-white w-full bg-opacity-10 transition-all ease-in-out duration-300 text-white flex items-center justify-between focus:outline-0",
    variants: {
      size: {
        sm: "body-5 font-medium rounded-md p-2 gap-4",
        md: "body-3 rounded-xl p-3 gap-6",
        lg: "body-3 rounded-xl p-4 gap-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  });

  const dropdownContentClassName = tv({
    base: "rounded-md shadow-lg bg-white bg-opacity-10 backdrop-blur-3xl z-[2000] overflow-y-auto",
  });

  const menuItemClassName = tv({
    base: "w-full text-left px-4 py-2 text-sm transition-all ease-in-out duration-200 focus:outline-0",
    variants: {
      state: {
        default: "hover:bg-white/10 text-white",
        disabled: "text-white text-opacity-50 cursor-not-allowed",
        active: "bg-white/20 text-white",
      },
    },
    defaultVariants: {
      state: "default",
    },
  });

  return (
    <div className={className}>
      <button
        disabled={disabled}
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={dropDownButtonClassName({ size: buttonSize })}
      >
        {children}
        <ChevronDownIcon
          className={`transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <motion.div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className={dropdownContentClassName()}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.03, ease: "easeInOut" }}
              >
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <AnimatePresence>
                    {menuList?.map((item: MenuItem, index: number) => (
                      <motion.button
                        initial={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02, ease: "easeInOut" }}
                        layout
                        type="button"
                        key={item.key}
                        ref={(node) => {
                          listItemsRef.current[index] = node;
                        }}
                        {...getItemProps({
                          onClick: (e) => handleItemClick(item, e),
                          onKeyDown: (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleItemClick(item, event);
                            }
                          },
                        })}
                        className={menuItemClassName({
                          state: item.disabled
                            ? "disabled"
                            : activeIndex === index
                              ? "active"
                              : "default",
                        })}
                        disabled={item.disabled}
                        role="menuitem"
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
};

export default DropdownMenu;
