import { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

export default function Navbar(
  { children, title }: { title?: ReactNode; children: ReactNode },
) {
  return (
    <>
      <div className="dawn-navbar">
        {children}
      </div>
      <div className="dawn-navbar-below">
        {title ?? <div></div>}
        <Breadcrumb />
      </div>
    </>
  );
}
