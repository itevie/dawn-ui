import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { combineClasses, OptionalChildren, UtilClassNames } from "../util";
import "./button.css";

export type ButtonType = "accent" | "inherit" | "danger" | "success" | "normal";

export interface ButtonProps {
  /** Whether or not this button should be clickable */
  disabled?: boolean;

  /** The visual style preset of this button */
  type?: ButtonType;

  /** Whether or not this button should be bigger and fill all width */
  big?: boolean;

  util?: UtilClassNames[];
}

/**
 * A clickable Button.
 */
const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & OptionalChildren & HTMLAttributes<HTMLButtonElement>
>(({ type, children, big, disabled, util, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      {...rest}
      className={combineClasses(
        "dawn-button",
        rest.className,
        type && `dawn-${type}-bg`,
        big ? `dawn-big` : "",
        util,
      )}
    >
      {children}
    </button>
  );
});

export default Button;
