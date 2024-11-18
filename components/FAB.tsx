import { combineClasses } from "../util";
import Button, { ButtonType } from "./Button";

export default function FAB({
  type,
  label,
  clicked,
}: {
  clicked?: () => void;
  label?: string;
  type?: ButtonType;
}) {
  return (
    <Button
      onClick={() => clicked && clicked()}
      className={combineClasses("dawn-fab", type ? `dawn-${type}` : "")}
    >
      {label || "+"}
    </Button>
  );
}
