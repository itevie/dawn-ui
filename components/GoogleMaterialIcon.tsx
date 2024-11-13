import { HTMLAttributes } from "react";
import { combineClasses } from "../util";

export default function GoogleMatieralIcon({
  name,
  ...rest
}: { name: string } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={combineClasses("material-icons no-select", rest.className)}
    >
      {name}
    </span>
  );
}
