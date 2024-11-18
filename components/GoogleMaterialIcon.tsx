import { HTMLAttributes } from "react";
import { combineClasses, combineStyles } from "../util";

export default function GoogleMatieralIcon({
  name,
  outline,
  size,
  ...rest
}: {
  name: string;
  outline?: boolean;
  size?: string;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={combineClasses(
        outline ? "material-symbols-outlined" : "material-icons",
        "no-select",
        rest.className
      )}
      style={combineStyles(rest.style, size ? { fontSize: size } : {})}
    >
      {name}
    </span>
  );
}
