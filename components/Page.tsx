import { ReactNode } from "react";

export default function Page({
  children,
  full,
}: {
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className="dawn-page">
      {full ? (
        <div className="dawn-content">{children}</div>
      ) : (
        <div className="dawn-page-content">{children}</div>
      )}
    </div>
  );
}
