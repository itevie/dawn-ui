import { HTMLAttributes, ReactNode } from "react";
import DivUtil from "./DivUtil";

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
    <DivUtil {...rest} className="dawn-content">
      {children}
    </DivUtil>
  );
}
