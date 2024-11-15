import { HTMLAttributes } from "react";
import { combineStyles } from "../util";

export default function Icon({
  src,
  size,
  fallback,
  ...rest
}: {
  size: string;
  src: string;
  fallback?: string;
} & HTMLAttributes<HTMLImageElement>) {
  if (!src?.startsWith("http"))
    src = `${
      window.location.hostname === "localhost" ? "http://localhost:3000" : ""
    }${src}`;

  return (
    <img
      {...rest}
      style={combineStyles(rest.style, { width: size, height: size })}
      alt=""
      className="dawn-icon"
      src={src}
      onError={
        fallback ? (e) => (e.currentTarget.src = fallback ?? "") : undefined
      }
    />
  );
}
