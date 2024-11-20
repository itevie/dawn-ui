import { ReactNode, useEffect, useState } from "react";
import { combineClasses } from "../util";
import Button from "./Button";
import GoogleMatieralIcon from "./GoogleMaterialIcon";

export default function Sidebar({
  collapsed,
  children,
}: {
  collapsed?: boolean;
  children: ReactNode;
}) {
  const [mobile, setMobile] = useState<boolean>(false);
  const [toggled, setToggled] = useState<boolean>(false);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 700px)").matches);
  }, []);

  window.onresize = () => {
    setMobile(window.matchMedia("(max-width: 700px)").matches);
  };

  return (
    <>
      <Button
        style={{ display: mobile ? "block" : "none" }}
        className="dawn-sidebar-toggle"
        onClick={() => setToggled(!toggled)}
      >
        <GoogleMatieralIcon name="menu" />
      </Button>
      <div
        onClick={() => setToggled(false)}
        style={{ display: mobile && !toggled ? "none" : "block" }}
        className={combineClasses(
          "dawn-sidebar",
          collapsed ? "dawn-sidebar-collapsed" : "",
          mobile && toggled ? "dawn-sidebar-mobile" : ""
        )}
      >
        {children}
      </div>
    </>
  );
}
