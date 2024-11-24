import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export type ButtonType = "accent" | "inherit" | "danger" | "success" | "normal";

const Button = forwardRef<
  HTMLButtonElement,
  {
    disabled?: boolean;
    type?: ButtonType;
    big?: boolean;
    children: ReactNode;
  } & HTMLAttributes<HTMLButtonElement>
>(({ type, children, big, disabled, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      {...rest}
      className={combineClasses(
        "dawn-button",
        rest.className,
        type && `dawn-${type}`,
        big ? `dawn-big` : ""
      )}
    >
      {children}
    </button>
  );
});

export default Button;
