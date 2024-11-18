import { HTMLAttributes, ReactNode } from "react";
import { combineClasses } from "../util";

export default function Hoverable({
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses("dawn-hoverable", rest.className)}>
      {children}
    </div>
  );
}
