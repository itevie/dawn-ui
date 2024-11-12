import { HTMLAttributes } from "react";

export default function Icon({
  src, 
  size, 
  fallback,
  ...rest
}: {size: string,src:string,fallback?:string} & HTMLAttributes<HTMLImageElement>) {
  if (!src?.startsWith("http"))
    src = `${window.location.hostname === "localhost" ? "http://localhost:3000" : ""}${src}`;

  const style: HTMLAttributes<HTMLImageElement>["style"] = {
    ...(rest.style ?? {}),
    width: size,
    height: size,
  };

  return (
    <img 
      {...rest} 
      style={style} 
      alt="" 
      className="dawn-icon" 
      src={src} 
      onError={fallback ? (e => e.currentTarget.src = fallback ?? "") : undefined}
      />
  )
}