import {HTMLAttributes, useState} from "react";
import {combineClasses} from "../util";
import {getDisabled, swapThemes, useAutomaticTheme} from "../index";
import GoogleMaterialIcon from "./GoogleMaterialIcon";

export default function ThemeButton({big, ...rest}:
{ big?: boolean; } & HTMLAttributes<HTMLButtonElement>) {
    useAutomaticTheme();
    const [theme,setTheme] = useState<boolean>(getDisabled)

    return (
        <button
            {...rest}
            className={combineClasses(
                "dawn-button",
                big ? `dawn-big` : ""
            )}
            onClick={() => {
                swapThemes();
                setTheme(getDisabled());
            }}
        >
            {theme ?
                <GoogleMaterialIcon name={"light_mode"} outline={true}/> :
                <GoogleMaterialIcon name={"dark_mode"} outline={true}/>}
        </button>
    );
}