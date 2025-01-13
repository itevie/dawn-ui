import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

/**
 * Aligns elements in a column (up to down)
 * @param param0
 * @returns
 */
export default function Column({
  util,
  children,
  ...rest
}: {
  util?: UtilClassNames[];
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={combineClasses("dawn-column", util, rest.className)}
    >
      {children}
    </div>
  );
}
