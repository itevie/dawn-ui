import { ReactNode } from "react";

interface DawnUIConfig {
  imageFallback: string;
  baseLocalhostUrl: string;
  strings: { [key: string]: ReactNode };
}

export const dawnUIConfig: DawnUIConfig = {
  imageFallback: "https://dawn.rest/images/dawn.png",
  baseLocalhostUrl: "http://localhost:3000",
  strings: {
    ok: "OK!",
    yes: "Yes",
    no: "No",
    cancel: "Cancel",
    informationTitle: "Information",
    confirmTitle: "Confirm",
    errorTitle: "Error!",
  },
};
