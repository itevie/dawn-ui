import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

export default function Column({ 
  children,
  util,
  ...rest 
}: { util?: UtilClassNames[], children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={combineClasses("dawn-column", rest.className, util)}>
      {children}
    </div>
  );
}
