import { HTMLAttributes, ReactElement, ReactNode } from "react";

export default function Fullscreen({
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="dawn-fullscreen" {...rest}>
      <div className="dawn-page-center">{children}</div>
    </div>
  );
}
