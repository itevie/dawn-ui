import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export type ButtonType = "accent" | "inherit" | "danger" | "success" | "normal";

export default function Button({
  type,
  children,
  big,
  ...rest
}: {
  type?: ButtonType;
  big?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={combineClasses(
        "dawn-button",
        type && `dawn-${type}`,
        big ? `dawn-big` : ""
      )}
    >
      {children}
    </button>
  );
}
