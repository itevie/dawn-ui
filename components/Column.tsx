import { HTMLAttributes, ReactNode } from "react";
import { UtilClassNames } from "../util";
import DivUtil from "./DivUtil";

export default function Column({
  util,
  children,
  ...rest
}: {
  util?: UtilClassNames[];
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <DivUtil {...rest} className="dawn-column" util={util}>
      {children}
    </DivUtil>
  );
}
