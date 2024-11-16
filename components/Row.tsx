import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";
import DivUtil from "./DivUtil";

export default function Row({
  util,
  children,
  ...rest
}: {
  util?: UtilClassNames[];
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses("dawn-row", util, rest.className)}>
      {children}
    </div>
  );
}
