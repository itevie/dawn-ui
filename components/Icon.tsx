import { HTMLAttributes, useEffect, useState } from "react";
import { combineClasses, combineStyles } from "../util";
import GoogleMatieralIcon from "./GoogleMaterialIcon";

export default function Icon({
  src: _src,
  size,
  fallback,
  ...rest
}: {
  size: string;
  src: string;
  fallback?: string;
} & HTMLAttributes<HTMLImageElement>) {
  if (_src?.startsWith("gm://")) {
    return <GoogleMatieralIcon size={size} name={_src.replace("gm://", "")} />;
  }

  // if (!fallback) fallback = fallbackImage;

  const src =
    _src &&
    (_src?.startsWith("http")
      ? _src
      : `${
          window.location.hostname === "localhost" && !_src.startsWith("data:")
            ? "http://localhost:3000"
            : ""
        }${_src}`);

  return (
    <img
      {...rest}
      style={combineStyles(rest.style, { width: size, height: size })}
      alt=""
      className={combineClasses("dawn-icon", rest.className)}
      src={src}
      onError={
        fallback
          ? (e) => {
              const s = `${
                window.location.hostname === "localhost" &&
                !fallback!.startsWith("data:")
                  ? "http://localhost:3000"
                  : ""
              }${fallback}`;

              if (e.currentTarget.src !== s) {
                e.currentTarget.src = s;
              }
            }
          : undefined
      }
    />
  );
}
