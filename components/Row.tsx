import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

export default function Row({ 
  children,
  util,
  ...rest 
}: { util?: UtilClassNames[], children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses("dawn-row", rest.className, util)}>
      {children}
    </div>
  );
}
