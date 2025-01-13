import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, combineStyles, UtilClassNames } from "../util";
import Words from "./Words";

/**
 * Contains elements
 * @param param0
 * @returns
 */
export default function Container({
  util,
  hover,
  children,
  title,
  small,
  ...rest
}: {
  title?: string;
  util?: UtilClassNames[];
  hover?: boolean;
  small?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={combineClasses(
        "dawn-container",
        hover ? "dawn-container-hover" : "",
        util,
        rest.className
      )}
      style={combineStyles(rest.style, small ? { width: "300px" } : null)}
    >
      {title && <Words type="container-title">{title}</Words>}
      {children}
    </div>
  );
}
