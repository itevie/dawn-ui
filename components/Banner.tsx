import { ReactNode } from "react";
import Row from "./Row";
// @ts-ignore
import dawn from "../images/dawn.png";

export default function Banner({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="dawn-banner">
      <Row util={["flex-grow"]}>
        <div style={{ flex: 1 }}>
          <label className="dawn-text-banner">{title}</label>
          <div style={{ padding: "15px" }}>{children}</div>
        </div>
        <img className="dawn-banner-image" src={dawn} alt=""></img>
      </Row>
    </div>
  );
}
