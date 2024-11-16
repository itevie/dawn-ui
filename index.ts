import "./styles/base.css";
import "./styles/containers.css";
import "./styles/text.css";
import "./styles/flex.css";
import "./styles/inputs.css";
import "./styles/util.css";
import "./styles/navbar.css";
import "./styles/alerts.css";
import "./styles/context-menus.css";
import "./styles/banner.css";
import "./styles/responsive.css";
import "./themes/light.css"
import {useMediaQuery} from "react-responsive";
import {useEffect} from "react";

const lightThemeSheet = document.styleSheets[document.styleSheets.length - 1]

export const swapThemes = () => {
    lightThemeSheet.disabled = !lightThemeSheet.disabled;
}

export const setDisabled = (val: boolean) => {
    lightThemeSheet.disabled = val;
}

export const getDisabled = () => {
    return lightThemeSheet.disabled;
}

export const useAutomaticTheme = () => {
    const isDefaultDark: boolean = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark: boolean) => {
            console.log("called from mediaquery" + isSystemDark)
            setDisabled(isSystemDark);
        }
    );

    useEffect(() => {
        console.log("called from useffect" + isDefaultDark)
        setDisabled(isDefaultDark);
    }, [isDefaultDark]);
}
