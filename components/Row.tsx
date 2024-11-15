import { HTMLAttributes, ReactNode } from "react";
import { UtilClassNames } from "../util";
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
    <DivUtil {...rest} className="dawn-row" util={util}>
      {children}
    </DivUtil>
  );
}
