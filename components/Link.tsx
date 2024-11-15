import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export default function Link({
  href: link,
  children,
  noHighlight,
  ...rest
}: {
  href: string;
  noHighlight?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      href={link}
      onClick={() => {
        window.location.href = link;
      }}
      className={combineClasses(
        "dawn-link",
        noHighlight ? "dawn-link-no-highlight" : ""
      )}
    >
      {children}
    </a>
  );
}
