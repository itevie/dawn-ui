import { useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import Column from "./Column";

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
  scheme?: ButtonType;

  onClick: () => void;
}

export interface ContextSeperatorItem extends ContextMenuItemBase {
  type: "seperator";
}

export type ContextMenuItem = ContextButtonItem | ContextSeperatorItem;

export let showContextMenu: (cm: ContextMenu) => void = () => {};

export default function ContextMenuManager() {
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      e.preventDefault();
      setContextMenu(null);
    });

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
        <Column util={["no-gap"]}>
          {contextMenu.elements.map((e) =>
            e.type === "button" ? (
              <Button
                onClick={() => e.onClick()}
                type="inherit"
                className={`dawn-context-menu-button dawn-context-menu-button-${e.scheme}`}
              >
                <label className={e.scheme && `dawn-color-${e.scheme}`}>
                  {e.label}
                </label>
              </Button>
            ) : (
              <hr />
            )
          )}
        </Column>
      </div>
    )
  );
}
