import { ReactNode, useEffect, useRef } from "react";
import { combineClasses } from "../util";
import Button, { ButtonType } from "./Button";
import { ShortcutManager } from "./ShortcutManager";

export default function FAB({
  type,
  label,
  clicked,
  shortcut,
  position,
}: {
  clicked?: () => void;
  label?: ReactNode;
  type?: ButtonType;
  shortcut?: string;
  position?: "left" | "right";
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shortcut)
      ShortcutManager.setShortcutCallback(shortcut, () => {
        if (ref.current) ref.current.click();
      });
  }, [shortcut]);

  return (
    <Button
      ref={ref}
      onClick={() => clicked && clicked()}
      className={combineClasses(
        "dawn-fab",
        type ? `dawn-${type}` : "",
        position ? `dawn-fab-position-${position}` : "",
      )}
    >
      {label || "+"}
    </Button>
  );
}
