import GoogleMatieralIcon from "./GoogleMaterialIcon";
import Hoverable from "./Hoverable";
import Row from "./Row";

export default function SidebarButton({
  onClick,
  icon,
  selected,
  label,
}: {
  icon: string;
  selected?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <Hoverable onClick={onClick} className={selected ? "dawn-selected" : ""}>
      <Row util={["align-center"]} style={{ padding: "3px 3px", gap: "10px" }}>
        <GoogleMatieralIcon size="32px" name={icon} />
        <label>{label}</label>
      </Row>
    </Hoverable>
  );
}
