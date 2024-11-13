import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showErrorAlert, showLoadingAlert } from "./components/AlertManager";
import { HTMLAttributes } from "react";

export type UtilClassNames =
  | "no-shrink"
  | "flex-grow"
  | "align-center"
  | "justify-center"
  | "no-select";

export const client = axios.create({
  baseURL: window.location.host === "localhost" ? "http://localhost:3000" : "",
});

export function axiosWrapper<
  T extends "get" | "post" | "patch",
  D extends any = any
>(
  method: T,
  ...args: Parameters<(typeof axios)[T]>
): Promise<AxiosResponse<D>> {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const loader = showLoadingAlert();

    const data: AxiosRequestConfig = {
      ...(args[2] || {}),
      onUploadProgress: (ev) => loader.progress(ev.progress || 0),
    };
    args[2] = data;

    // @ts-ignore
    client[method](...args)
      .then((r) => {
        if (r.status !== 200) {
          showErrorAlert(makeErrorResponseMessage(r));
          reject();
        } else resolve(r);
      })
      .catch((r) => {
        showErrorAlert(makeErrorResponseMessage(r.response));
        reject();
      })
      .finally(() => {
        loader.stop();
      });
  });
}

export function combineStyles<T>(
  before: HTMLAttributes<T>["style"] | null,
  after: HTMLAttributes<T>["style"] | null
): HTMLAttributes<T>["style"] {
  return {
    ...(before ?? {}),
    ...(after ?? {}),
  };
}

export function combineClasses(
  ...things: (string | undefined | null | string[])[]
): string {
  let c = "";
  for (const part of things) {
    c += " " + (Array.isArray(part) ? part.join(" ") : part || "");
  }
  return c;
}

export function makeErrorResponseMessage(response: AxiosResponse): string {
  console.log(response);
  let serverMessage = response?.data?.message;

  if (!serverMessage) {
    serverMessage =
      {
        404: "The resource does not exist",
      }[response.status] || `Failed to fetch data`;
  }

  return `${serverMessage} (${response.status} - ${
    new URL(response.config.url as string)?.pathname
  })`;
}
