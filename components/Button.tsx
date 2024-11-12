import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export interface ButtonProps {
  type?: ButtonType;
  big?: boolean;
  href?: string;
}

export type ButtonType = "success" | "danger" | "inherit" | "normal";

export default function Button(
  { type, big, href, children, ...rest }:
    & ButtonProps
    & { children: ReactNode }
    & HTMLAttributes<HTMLButtonElement>
    & HTMLAttributes<HTMLLinkElement>,
) {
  const className = combineClasses("dawn-button", big ? "dawn-big-control" : "", type ? `dawn-${type}` : "", rest.className);

  return (
    href
      ? (
        <a {...rest as any} href={href} className={"dawn-link " + className}>
          {children}
        </a>
      )
      : <button {...rest as any} className={className}>{children}</button>
  );
}
