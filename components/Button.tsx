import { HTMLAttributes, ReactNode } from "react";

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
  const className = `dawn-button ${big && "dawn-big-control"} ${
    type ? `dawn-${type}` : ""
  }`;

  return (
    href
      ? (
        <a href={href} className={"dawn-link " + className} {...rest as any}>
          {children}
        </a>
      )
      : <button className={className} {...rest as any}>{children}</button>
  );
}
