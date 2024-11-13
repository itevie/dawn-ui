import { HTMLAttributes, ReactNode } from "react";

export default function Link({
  children,
  href: link,
  ...rest
}: { href: string; children: ReactNode } & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={link}
      onClick={(e) => {
        if (link.startsWith("?")) {
          e.preventDefault();
          window.location.search = link;
        }
      }}
      className="dawn-link"
      {...rest}
    >
      {children}
    </a>
  );
}
