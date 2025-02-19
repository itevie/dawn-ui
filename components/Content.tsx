import { HTMLAttributes, ReactNode } from "react";
import DivUtil from "./DivUtil";
import { combineClasses } from "../util";

/**
 * Used for margin basically
 * @param param0
 * @returns
 */
export default function Content({
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <DivUtil
      {...rest}
      className={combineClasses("dawn-content", rest.className)}
    >
      {children}
    </DivUtil>
  );
}
