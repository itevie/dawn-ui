import { ReactNode } from "react";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div className="dawn-content">
      {children}
    </div>
  );
}
