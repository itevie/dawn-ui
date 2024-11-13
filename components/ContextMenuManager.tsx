import { useEffect, useState } from "react";
import Column from "./Column";
import Button from "./Button";

export interface ContextMenu {
  event: React.MouseEvent<any, MouseEvent>;
  elements: ContextMenuItem[];
}

export interface ContextMenuItemBase {
  type: "button" | "seperator";
}

export interface ContextButtonItem extends ContextMenuItemBase {
  type: "button";
  label: string;

  disabled?: boolean;
  scheme?: "danger" | "success";

  onClick: () => void;
}

export interface ContextSeperatorItem extends ContextMenuItemBase {
  type: "seperator";
}

export type ContextMenuItem = ContextButtonItem | ContextSeperatorItem;

export let showContextMenu: (cm: ContextMenu) => void = (cm) => {};

export default function ContextMenuManager() {
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  useEffect(() => {
    showContextMenu = (cm) => {
      cm.event.preventDefault();
      setContextMenu(cm);
    };
  }, []);

  return (
    contextMenu && (
      <div
        className="dawn-context-menu"
        style={{
          left: `${contextMenu?.event.pageX}px`,
          top: `${contextMenu?.event.pageY}px`,
        }}
      >
        <Column>
          {contextMenu &&
            contextMenu.elements.map((element) => (
              <Button
                onClick={() => {
                  setContextMenu(null);
                  if (element.type === "button") element.onClick();
                }}
                className="dawn-context-menu-button"
                type="inherit"
              >
                {(element as ContextButtonItem).label}
              </Button>
            ))}
        </Column>
      </div>
    )
  );
}
