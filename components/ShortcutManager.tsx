import { useEffect, useState } from "react";
import { addAlert } from "./AlertManager";
import GoogleMatieralIcon from "./GoogleMaterialIcon";
import Row from "./Row";

type Modifier = "ctrl" | "shift" | "alt" | "meta";

export interface Shortcut {
  key: string;
  modifiers?: Modifier[];
  callback?: () => void;
}

export const shortcuts: { [key: string]: Shortcut } = {};

document.addEventListener("keydown", (e) => {
  if (
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement
  )
    return;

  for (const s in shortcuts)
    if (shortcuts[s].callback)
      if (_matchesShortcut(e, shortcuts[s])) {
        if (!(e.target instanceof HTMLInputElement)) {
          e.preventDefault();
          (shortcuts[s].callback as () => void)();
        }
      }
});

export function registerShortcut(name: string, shortcut: Shortcut): void {
  let override = JSON.parse(
    localStorage.getItem("dawn_ui-shortcut-override") ?? "{}"
  );
  if (override[name]) shortcuts[name] = { ...shortcut, ...override[name] };
  else shortcuts[name] = shortcut;
}

export function setShortcutCallback(name: string, callback: () => void) {
  if (!shortcuts[name]) throw new Error(`No shortcut registered: ${name}`);
  shortcuts[name].callback = callback;
}

export function updateShortcut(name: string, details: Partial<Shortcut>): void {
  if (!shortcuts[name]) throw new Error(`No shortcut registered: ${name}`);
  shortcuts[name] = { ...shortcuts[name], ...details };
}

export function matchesShortcut(e: KeyboardEvent, name: string): boolean {
  if (!shortcuts[name]) throw new Error(`No shortcut registered: ${name}`);
  return _matchesShortcut(e, shortcuts[name]);
}

export function _matchesShortcut(
  e: KeyboardEvent,
  shortcut: Shortcut
): boolean {
  if (e.key.toLowerCase() !== shortcut.key.toLowerCase()) return false;
  if (!shortcut.modifiers) return true;

  for (const modifier of shortcut.modifiers) {
    switch (modifier) {
      case "alt":
        if (!e.altKey) return false;
        break;
      case "ctrl":
        if (!e.ctrlKey) return false;
        break;
      case "meta":
        if (!e.metaKey) return false;
        break;
      case "shift":
        if (!e.shiftKey) return false;
        break;
    }
  }

  return true;
}

export function ShortcutList() {
  const [r, setR] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setR(Math.random());
    }, 1000);
  }, []);

  return (
    <table key={r} style={{ borderSpacing: "10px" }}>
      <tbody>
        {Object.entries(shortcuts).map(([k, v]) => (
          <tr>
            <td>{k}</td>
            <td>
              <Row style={{ gap: "5px" }}>
                {v.modifiers && v.modifiers.sort().map((x) => <code>{x}</code>)}{" "}
                <code>{v.key}</code>
              </Row>
            </td>
            <td>
              <GoogleMatieralIcon
                name="edit"
                onClick={() => {
                  let alt = v.modifiers?.includes("alt") ?? false;
                  let ctrl = v.modifiers?.includes("ctrl") ?? false;
                  let meta = v.modifiers?.includes("meta") ?? false;
                  let shift = v.modifiers?.includes("shift") ?? false;
                  let key = v.key;

                  addAlert({
                    title: `Edit shortcut ${k}`,
                    body: (
                      <table style={{ width: "100%" }}>
                        <tbody style={{ width: "100%" }}>
                          <tr>
                            <td>Key</td>
                            <td>
                              <input
                                defaultValue={key}
                                onChange={(e) => (key = e.currentTarget.value)}
                                className="dawn-big"
                                minLength={1}
                                maxLength={1}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Modifiers</td>
                            <td>
                              <Row>
                                <Row util={["align-center", "no-gap"]}>
                                  <input
                                    type="checkbox"
                                    defaultChecked={ctrl}
                                    onChange={(e) =>
                                      (ctrl = e.currentTarget.checked)
                                    }
                                  />
                                  <label>ctrl</label>
                                </Row>
                                <Row util={["align-center", "no-gap"]}>
                                  <input
                                    type="checkbox"
                                    defaultChecked={alt}
                                    onChange={(e) =>
                                      (alt = e.currentTarget.checked)
                                    }
                                  />
                                  <label>alt</label>
                                </Row>
                                <Row util={["align-center", "no-gap"]}>
                                  <input
                                    type="checkbox"
                                    defaultChecked={shift}
                                    onChange={(e) =>
                                      (shift = e.currentTarget.checked)
                                    }
                                  />
                                  <label>shift</label>
                                </Row>
                                <Row util={["align-center", "no-gap"]}>
                                  <input
                                    type="checkbox"
                                    defaultChecked={meta}
                                    onChange={(e) =>
                                      (meta = e.currentTarget.checked)
                                    }
                                  />
                                  <label>win</label>
                                </Row>
                              </Row>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ),
                    buttons: [
                      {
                        id: "cancel",
                        text: "Cancel",
                        click: (close) => {
                          close();
                        },
                      },
                      {
                        id: "save",
                        text: "Save",
                        click: (close) => {
                          if (!key) return;
                          let modifiers: Modifier[] = [];
                          if (alt) modifiers.push("alt");
                          if (ctrl) modifiers.push("ctrl");
                          if (meta) modifiers.push("meta");
                          if (shift) modifiers.push("shift");
                          if (
                            !localStorage.getItem("dawn_ui-shortcut-override")
                          )
                            localStorage.setItem(
                              "dawn_ui-shortcut-override",
                              "{}"
                            );
                          let cur = JSON.parse(
                            localStorage.getItem("dawn_ui-shortcut-override") ??
                              "{}"
                          );
                          cur[k] = { key, modifiers };
                          localStorage.setItem(
                            "dawn_ui-shortcut-override",
                            JSON.stringify(cur)
                          );
                          updateShortcut(k, { key, modifiers });
                          close();
                        },
                      },
                    ],
                  });
                }}
              />
              <GoogleMatieralIcon
                name="restart_alt"
                onClick={() => {
                  let cur = JSON.parse(
                    localStorage.getItem("dawn_ui-shortcut-override") ?? "{}"
                  );
                  if (cur[k]) delete cur[k];
                  localStorage.setItem(
                    "dawn_ui-shortcut-override",
                    JSON.stringify(cur)
                  );
                  window.location.reload();
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
