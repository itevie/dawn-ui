import { useEffect, useRef } from "react";
import { combineClasses } from "../util";
import Button, { ButtonType } from "./Button";
import { setCallback } from "./ShortcutManager";

export default function FAB({
  type,
  label,
  clicked,
  shortcut,
}: {
  clicked?: () => void;
  label?: string;
  type?: ButtonType;
  shortcut?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shortcut)
      setCallback(shortcut, () => {
        if (ref.current) ref.current.click();
      });
  }, [shortcut]);

  return (
    <Button
      ref={ref}
      onClick={() => clicked && clicked()}
      className={combineClasses("dawn-fab", type ? `dawn-${type}` : "")}
    >
      {label || "+"}
    </Button>
  );
}
