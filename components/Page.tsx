import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className="dawn-page">
      <div className="dawn-page-content">{children}</div>
    </div>
  );
}
