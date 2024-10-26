import { ReactNode } from "react";

export default function ButtonLink(
  { children, link }: { link: string; children: ReactNode },
) {
  return (
    <a href={link} className="dawn-button dawn-inherit dawn-link">
      {children}
    </a>
  );
}
