import GoogleMatieralIcon from "./GoogleMaterialIcon";
import Hoverable from "./Hoverable";
import Row from "./Row";

export default function SidebarButton({
  onClick,
  icon,
  label,
}: {
  icon: string;
  onClick?: () => void;
  label: string;
}) {
  return (
    <Hoverable onClick={onClick}>
      <Row util={["align-center"]} style={{ padding: "3px 10px", gap: "7px" }}>
        <GoogleMatieralIcon size="32px" name={icon} />
        <label>{label}</label>
      </Row>
    </Hoverable>
  );
}
