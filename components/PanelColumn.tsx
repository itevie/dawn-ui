import { ReactNode } from "react";

export default function PanelColumn(
  { children, fullWidth }: { fullWidth?: boolean; children: ReactNode },
) {
  return (
    <div className={`dawn-panel-column ${fullWidth && "dawn-panel-column-full"}`}>
      {children}
    </div>
  );
}
