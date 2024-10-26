import { ReactNode } from "react";

export default function PanelRow(
  { children, fullWidth }: { fullWidth?: boolean; children: ReactNode },
) {
  return (
    <div className={`dawn-panel-row ${fullWidth && "dawn-panel-row-full"}`}>
      {children}
    </div>
  );
}
