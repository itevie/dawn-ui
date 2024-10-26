import { HTMLAttributes, ReactNode } from "react";
import { combineStyles } from "../util";

export default function AlignCenter({children, ...rest}: {children: ReactNode} & HTMLAttributes<HTMLImageElement>) {
  return (
    <div style={combineStyles(rest.style, { alignItems: "center" })}>
      {children}
    </div>
  );
}