import { useEffect, useRef, useState } from "react";
import Button, { ButtonType } from "./Button";
import Column from "./Column";

export type ContextMenuEvent = React.MouseEvent<HTMLElement, MouseEvent>;

export interface ContextMenu {
  event: ContextMenuEvent;
  elements: ContextMenuItem[];
  ignoreClasses?: string[];
}

export interface ContextMenuItemBase {
  type: "button" | "seperator";
}

export interface ContextButtonItem extends ContextMenuItemBase {
  type: "button";
  label: string;

  disabled?: boolean;
  scheme?: ButtonType;

  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    replaceWith: (cm: ContextMenu) => void
  ) => void;
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
      // Check if it should be ignored
      if (
        cm.ignoreClasses &&
        cm.ignoreClasses.some((x) => (cm.event.target as Element).matches(x))
      )
        return;

      console.log(cm.ignoreClasses, cm.event.currentTarget);

      cm.event.preventDefault();
      setContextMenu(cm);

      // Update the position of the context menu
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
                onClick={(ev) =>
                  e.onClick(ev, (cm) => {
                    setTimeout(() => {
                      showContextMenu(cm);
                    }, 10);
                  })
                }
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
