import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

/**
 * Used to align elements in a row (left to right)
 * @param param0
 * @returns
 */
export default function Row({
  util,
  children,
  ...rest
}: {
  util?: UtilClassNames[];
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses("dawn-row", util, rest.className)}>
      {children}
    </div>
  );
}
