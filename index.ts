import "./styles/base.css";
import "./styles/containers.css";
import "./styles/animations.css";
import "./styles/text.css";
import "./styles/flex.css";
import "./styles/inputs.css";
import "./styles/util.css";
import "./styles/navbar.css";
import "./styles/alerts.css";
import "./styles/context-menus.css";
import "./styles/banner.css";
import "./styles/icons.css";
import "./styles/quick.css";

import "./styles/responsive.css";
import "./styles/table.css";
import "./styles/flyout.css";
import "./styles/tables.css";
import "./themes/light.css";
import "./themes/dark-transparent.css";
import "./themes/light-transparent.css";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

export const themes = [
  "dark",
  "light",
  "dark-transparent",
  "light-transparent",
] as const;
export type Theme = (typeof themes)[number];
export let currentTheme: Theme = "dark";

export const setTheme = (theme: Theme, noStore: boolean = false) => {
  for (const theme of themes)
    document.body.classList.remove(`dawn-theme-${theme}`);
  document.body.classList.add(`dawn-theme-${theme}`);
  currentTheme = theme;
  if (!noStore) localStorage.setItem("dawn_ui-theme", theme);
};

export const themeSetBackground = (url: string) => {
  document.body.style.backgroundImage = `url(${url})`;
};

export const setThemeMany = (themesTo: Theme[]) => {
  for (const theme of themes)
    document.body.classList.remove(`dawn-theme-${theme}`);
  for (const theme of themesTo)
    document.body.classList.add(`dawn-theme-${theme}`);
};

export const loadTheme = () => {
  if (localStorage.getItem("dawn_ui-theme"))
    setTheme(localStorage.getItem("dawn_ui-theme") as Theme);
};

export const useAutomaticTheme = () => {
  const isDefaultDark: boolean = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark: boolean) => {
      setTheme(isSystemDark ? "dark" : "light");
    }
  );

  useEffect(() => {
    if (localStorage.getItem("dawn_ui-theme"))
      setTheme(localStorage.getItem("dawn_ui-theme") as Theme);
    else setTheme(isDefaultDark ? "dark" : "light");
  }, [isDefaultDark]);
};
