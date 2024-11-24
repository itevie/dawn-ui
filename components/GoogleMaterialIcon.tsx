import { HTMLAttributes } from "react";
import { combineClasses, combineStyles, UtilClassNames } from "../util";

export default function GoogleMatieralIcon({
  name,
  outline,
  size,
  util,
  ...rest
}: {
  name: string;
  outline?: boolean;
  size?: string;
  util?: UtilClassNames[];
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={combineClasses(
        outline ? "material-symbols-outlined" : "material-icons",
        "no-select",
        rest.className,
        util
      )}
      style={combineStyles(rest.style, size ? { fontSize: size } : {})}
    >
      {name}
    </span>
  );
}
