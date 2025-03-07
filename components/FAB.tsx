import { ReactNode, useEffect, useRef } from "react";
import { combineClasses } from "../util";
import Button, { ButtonType } from "./Button";
import { setShortcutCallback } from "./ShortcutManager";

export default function FAB({
  type,
  label,
  clicked,
  shortcut,
}: {
  clicked?: () => void;
  label?: ReactNode;
  type?: ButtonType;
  shortcut?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shortcut)
      setShortcutCallback(shortcut, () => {
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
