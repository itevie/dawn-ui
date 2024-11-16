import { HTMLAttributes } from "react";
import { combineClasses } from "../util";

export default function GoogleMatieralIcon({
  name,
  outline,
  ...rest
}: { name: string; outline?: boolean } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={combineClasses(
        outline ? "material-symbols-outlined" : "material-icons",
        "no-select",
        rest.className
      )}
    >
      {name}
    </span>
  );
}