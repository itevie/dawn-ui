import { ReactNode } from "react";

export default function Page(
  { children }: { children: [ReactNode, ReactNode] },
) {
  return (
    <div className="dawn-page">
      {/* Navbar */}
      {children[0]}
      {/* Main content */}
      <div className="dawn-page-content">
        {children[1]}
      </div>
    </div>
  );
}
