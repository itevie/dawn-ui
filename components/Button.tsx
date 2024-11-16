import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export type ButtonType = "accent" | "inherit" | "danger" | "success" | "normal";

export default function Button({
  type,
  children,
  big,
  disabled,
  ...rest
}: {
  disabled?: boolean;
  type?: ButtonType;
  big?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
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
}
