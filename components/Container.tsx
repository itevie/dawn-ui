import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export default function Container({
  children,
  hover,
  ...rest
}: {
  children: ReactNode;
  hover?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={combineClasses(
        "dawn-container",
        hover ? "dawn-container-hover" : "",
        rest.className
      )}
    >
      {children}
    </div>
  );
}
