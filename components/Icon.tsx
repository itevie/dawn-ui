import { HTMLAttributes, useEffect, useState } from "react";
import { combineClasses, combineStyles } from "../util";
import { addLoading, decLoading } from "../../App";

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
  if (_src === undefined) console.log("yep");
  const [src, setSrc] = useState<string>(
    _src &&
      (_src?.startsWith("http")
        ? _src
        : `${
            window.location.hostname === "localhost" &&
            !_src.startsWith("data:")
              ? "http://localhost:3000"
              : ""
          }${_src}`)
  );

  useEffect(() => {
    if (!src) return;
    if (!src.startsWith("data:")) {
      addLoading();
    }

    return () => {
      if (!src.startsWith("data:")) {
        decLoading();
      }
    };
  }, [src]);

  return (
    <img
      {...rest}
      style={combineStyles(rest.style, { width: size, height: size })}
      alt=""
      className={combineClasses("dawn-icon", rest.className)}
      src={src}
      onLoad={() => {
        if (!src.startsWith("data:")) decLoading();
      }}
      onError={
        fallback
          ? (e) => {
              const s = `${
                window.location.hostname === "localhost" &&
                !fallback.startsWith("data:")
                  ? "http://localhost:3000"
                  : ""
              }${fallback}`;

              if (e.currentTarget.src !== s) {
                setSrc(s);
              }
            }
          : undefined
      }
    />
  );
}
