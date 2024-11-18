import { ReactNode } from "react";
import { combineClasses } from "../util";

export default function Sidebar({
  collapsed,
  children,
}: {
  collapsed?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={combineClasses(
        "dawn-sidebar",
        collapsed ? "dawn-sidebar-collapsed" : ""
      )}
    >
      {children}
    </div>
  );
}
