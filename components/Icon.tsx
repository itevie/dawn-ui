import { HTMLAttributes } from "react";
import { combineClasses, combineStyles } from "../util";
import GoogleMaterialIcon from "./GoogleMaterialIcon";

type IconProps = {
  src: string;
  size: string;
  fallback?: string;
} & HTMLAttributes<HTMLImageElement>;

export default function Icon({ src, size, fallback, ...rest }: IconProps) {
  const isMaterialIcon = src?.startsWith("gm://");
  if (isMaterialIcon) {
    const name = src.slice(5);
    return <GoogleMaterialIcon size={size} name={name} />;
  }

  const resolveUrl = (url: string) => {
    const isLocal = window.location.hostname === "localhost";
    const needsPrefix = !url.startsWith("http") && !url.startsWith("data:");
    const prefix = isLocal && needsPrefix ? "http://localhost:3000" : "";
    return `${prefix}${url}`;
  };
  // if (!fallback) fallback = fallbackImage;

  // TODO: fix later
  const resolvedSrc = resolveUrl(src ?? fallback ?? null);
  const resolvedFallback = resolveUrl(fallback ?? "fallbackImage");

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src !== resolvedFallback) {
      e.currentTarget.src = resolvedFallback;
    }
  };

  return (
    <img
      {...rest}
      src={resolvedSrc}
      alt=""
      className={combineClasses("dawn-icon", rest.className)}
      style={combineStyles(rest.style, { width: size, height: size })}
      onError={fallback ? handleError : undefined}
    />
  );
}
