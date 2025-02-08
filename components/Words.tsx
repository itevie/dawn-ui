import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

/**
 * navbar = The text used for the navbar
 * page-title = The title of the page, should only be one
 * container-title = The title of a container, should only be one per container
 * heading = A section of a container
 * normal = Normal text, this is the default
 */
export type TextType =
  | "navbar"
  | "page-title"
  | "container-title"
  | "heading"
  | "normal";

export default function Words({
  type,
  children,
  ...rest
}: {
  type?: TextType;
  children?: ReactNode;
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
