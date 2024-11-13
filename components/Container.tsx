import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export default function Container({
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses("dawn-container", rest.className)}>
      {children}
    </div>
  );
}
