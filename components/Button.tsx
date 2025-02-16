import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

export type ButtonType = "accent" | "inherit" | "danger" | "success" | "normal";

/**
 * A clickable Button.
 */
const Button = forwardRef<
  HTMLButtonElement,
  {
    disabled?: boolean;
    type?: ButtonType;
    big?: boolean;
    util?: UtilClassNames[];
    children?: ReactNode;
  } & HTMLAttributes<HTMLButtonElement>
>(({ type, children, big, disabled, util, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      {...rest}
      className={combineClasses(
        "dawn-button",
        rest.className,
        type && `dawn-${type}`,
        big ? `dawn-big` : "",
        util
      )}
    >
      {children}
    </button>
  );
});

export default Button;
