import { HTMLAttributes } from "react";
import GoogleMatieralIcon from "./GoogleMaterialIcon";
import Hoverable from "./Hoverable";
import Row from "./Row";

export default function SidebarButton({
  onClick,
  icon,
  selected,
  label,
  ...rest
}: {
  icon: string;
  selected?: boolean;
  onClick?: () => void;
  label: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <Hoverable
      {...rest}
      onClick={onClick}
      className={selected ? "dawn-selected" : ""}
    >
      <Row util={["align-center"]} style={{ padding: "7px", gap: "10px" }}>
        <GoogleMatieralIcon size="24px" name={icon} />
        <label>{label}</label>
      </Row>
    </Hoverable>
  );
}
