import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const [xy, setXy] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (event.target instanceof HTMLInputElement) {
        return;
      }
      setContextMenu(null);
    });

    showContextMenu = (cm) => {
      cm.event.preventDefault();
      setContextMenu(cm);
      setTimeout(() => {
        let bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;

        let x = cm.event.pageX;
        let y = cm.event.pageY;

        if (x > window.innerWidth - bounds.width)
          x = window.innerWidth - bounds.width;

        if (y > window.innerHeight - bounds.height)
          y = window.innerHeight - bounds.height;

        setXy([x, y]);
      }, 10);
    };
  }, []);

  return (
    contextMenu && (
      <div
        ref={ref}
        className="dawn-context-menu"
        style={{
          left: `${xy[0]}px`,
          top: `${xy[1]}px`,
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
