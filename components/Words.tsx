import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export type TextType =
  | "heading"
  | "page-title"
  | "container-title"
  | "normal"
  | "navbar";

export default function Words({
  type,
  children,
  ...rest
}: {
  type?: TextType;
  children: ReactNode;
} & HTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...rest}
      className={combineClasses(
        `dawn-text dawn-text-${type ?? "normal"}`,
        rest.className
      )}
    >
      {children}
    </label>
  );
}
