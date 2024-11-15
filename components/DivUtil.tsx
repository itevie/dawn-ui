import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

export default function DivUtil({
  children,
  util,
  ...rest
}: {
  util?: UtilClassNames[];
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses(util, rest.className)}>
      {children}
    </div>
  );
}
