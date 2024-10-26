import { ReactNode } from "react";
import Text from "./Text";
import Rule from "./Rule";

export default function Banner(props: { title: string; children: ReactNode }) {
  return (
    <div className="dawn-banner">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1" }}>
          <Text type="page-title">{props.title}</Text>
          {props.children}
        </div>
        <img className="dawn-banner-image" src="/images/dawn.png"></img>
      </div>
    </div>
  );
}
