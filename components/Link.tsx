import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export default function Link({
  href: link,
  children,
  noHighlight,
  forceReload,
  ...rest
}: {
  href: string;
  forceReload?: boolean;
  noHighlight?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      href={link}
      onClick={() => {
        window.location.href = link;
        if (forceReload)
          setTimeout(() => {
            window.location.reload();
          }, 10);
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
