import { useEffect, useRef, useState } from "react";
import { Action, ShortcutManager, shortcuts } from "./ShortcutManager";
import "./commandPaletteManager.css";
import Button from "./Button";
import { addAlert, showInfoAlert } from "./AlertManager";
import Column from "./Column";
import { MaybePromise } from "../util";
import Row from "./Row";
import Icon from "./Icon";

export let showCommandPalette: () => void = () => {};
ShortcutManager.registerShortcut("Show Command Palette", {
  key: "k",
  modifiers: ["ctrl", "shift"],
  callback: () => showCommandPalette(),
});
ShortcutManager.registerShortcut("Do Nothing", {});
ShortcutManager.registerShortcut("Show Alert", {
  key: "m",
  callback: () => showInfoAlert("hi!"),
});
ShortcutManager.registerShortcut("Set App Hue", {
  callback: () =>
    addAlert({
      title: "Change Hue",
      body: (
        <input
          type="range"
          min="0"
          max="360"
          onChange={(e) => {
            document.body.style.setProperty("--sy-base-color", e.target.value);
          }}
        />
      ),
      buttons: [
        {
          text: "close",
          id: "close",
          click(close) {
            close();
          },
        },
      ],
    }),
});

export interface CommandPaletteProvider {
  name: string;
  exec: (query: string) => MaybePromise<Action[]>;
}

export class CommandPaletteProviderManager {
  private constructor() {}
  public static providers: CommandPaletteProvider[] = [];

  public static register(
    provider: CommandPaletteProvider,
    overwrite: boolean = false,
  ) {
    if (this.providers.some((x) => x.name === provider.name))
      if (overwrite)
        this.providers[
          this.providers.findIndex((x) => x.name === provider.name)
        ] = provider;
      else
        throw new Error(`Provider with name ${provider.name} already exists`);
    this.providers.push(provider);
  }
}

export function fuzzy(value: string): string {
  return value.toLowerCase().replace(/\s/g, "");
}

export default function CommandPaletteManager() {
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Action[]>([]);

  useEffect(() => {
    showCommandPalette = () => {
      setVisible(true);
    };

    if (!inputRef.current) return;
    console.log(inputRef.current);

    async function generate(value: string): Promise<Action[]> {
      let query = fuzzy(value);
      let results: Action[] = [];

      const runnerFactory = (f: (() => void) | undefined) => {
        return () => {
          setVisible(false);
          if (!f) return;
          f();
        };
      };

      results.push(
        ...Object.entries(shortcuts)
          .filter((x) => fuzzy(x[0]).match(query))
          .map((x) => ({
            name: x[0],
            callback: runnerFactory(x[1].callback),
          })),
      );

      for await (const provider of CommandPaletteProviderManager.providers) {
        results.push(...(await provider.exec(query)));
      }

      setResults(results);
      return results;
    }

    inputRef.current!.addEventListener("keyup", async (e) => {
      if (e.key === "Escape") {
        setVisible(false);
        return;
      }
      if (inputRef.current === null) return;

      const result = await generate(inputRef.current.value);
      if (e.key === "Enter") {
        if (result.length === 1) {
          setVisible(false);
          result[0].callback?.();
        }
      }
    });
    inputRef.current!.focus();
  }, [visible]);

  return !visible ? (
    <></>
  ) : (
    <div className="dawn-command-palette-container">
      <input
        ref={inputRef}
        className="dawn-command-palette-section dawn-command-palette-section-input"
      ></input>
      <Column className="dawn-command-palette-section">
        {results.map((x) => (
          <Button
            key={x.name + (x.icon || "") + x.callback?.toString()}
            type="inherit"
            className="dawn-command-palette-item"
            onClick={() => {
              setVisible(false);
              if (x.callback) x.callback();
            }}
          >
            <Row>
              {x.icon ? (
                <Icon
                  size="64px"
                  src={x.icon}
                  style={{ marginRight: "auto" }}
                />
              ) : (
                <></>
              )}
              <label style={{ textAlign: "center", flexGrow: 1 }}>
                {x.name}
              </label>
            </Row>
          </Button>
        ))}
      </Column>
    </div>
  );
}
