import { HTMLAttributes, useState } from "react";
import { combineClasses } from "../util";
import { currentTheme, setTheme, Theme, useAutomaticTheme } from "../index";
import GoogleMaterialIcon from "./GoogleMaterialIcon";

export default function ThemeButton({
  big,
  ...rest
}: { big?: boolean } & HTMLAttributes<HTMLButtonElement>) {
  useAutomaticTheme();
  const [theme, setButtonTheme] = useState<Theme>(currentTheme);

  return (
    <button
      {...rest}
      className={combineClasses("dawn-button", big ? `dawn-big` : "")}
      onClick={() => {
        setTheme(currentTheme === "dark" ? "light" : "dark");
        setButtonTheme(currentTheme);
      }}
    >
      {theme === "light" ? (
        <GoogleMaterialIcon name={"light_mode"} outline={true} />
      ) : (
        <GoogleMaterialIcon name={"dark_mode"} outline={true} />
      )}
    </button>
  );
}
