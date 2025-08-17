import { HTMLAttributes } from "react";
import { combineClasses, combineStyles, resolveImageUrl } from "../util";
import GoogleMaterialIcon from "./GoogleMaterialIcon";
import { dawnUIConfig } from "../config";

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
  // TODO: fix later
  const resolvedSrc = resolveImageUrl(src ?? fallback ?? null);
  const resolvedFallback = resolveImageUrl(
    fallback ?? dawnUIConfig.imageFallback ?? "fallbackImage",
  );

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
