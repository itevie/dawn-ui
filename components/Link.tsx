import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export default function Link({
  href: link,
  children,
  noHighlight,
  forceReload,
  ...rest
}: {
  href?: string;
  forceReload?: boolean;
  noHighlight?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      onClick={() => {
        if (link) window.location.href = link;
        if (forceReload)
          setTimeout(() => {
            window.location.reload();
          }, 10);
      }}
      {...rest}
      href={link}
      className={combineClasses(
        "dawn-link",
        noHighlight ? "dawn-link-no-highlight" : ""
      )}
    >
      {children}
    </a>
  );
}
