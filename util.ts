import { HTMLAttributes, ReactNode } from "react";
import {
  showErrorAlert,
  showInfoAlert,
  showLoadingAlert,
} from "./components/AlertManager";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import EventEmitter from "events";

export type HTTPMethod = "post" | "get" | "patch" | "put" | "delete";
export type MaybePromise<T> = T | Promise<T>;

export interface OptionalChildren {
  children?: ReactNode;
}

export type UtilClassNames =
  | "no-shrink"
  | "flex-grow"
  | "align-center"
  | "justify-center"
  | "no-select"
  | "no-gap"
  | "small-gap"
  | "no-min"
  | "clickable"
  | "lift-up"
  | "hover-grow"
  | "selected"
  | "hover"
  | "focus"
  | "giraffe"
  | "round"
  | "fit-content"
  | "overflow-y-scroll"
  | "flex-wrap"
  | "no-wrap"
  | "ignore-responsive-center"
  | "no-gradient";

export function combineStyles<T>(
  before: HTMLAttributes<T>["style"] | null,
  after: HTMLAttributes<T>["style"] | null,
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
    c = c.trim() + " " + (Array.isArray(part) ? part.join(" ") : part || "");
  }
  return c.trim();
}

export const client = axios.create({
  baseURL: window.location.host === "localhost" ? "http://localhost:3000" : "",
});

export class AxiosWrapper {
  public config: AxiosRequestConfig = {};
  public showLoader: boolean = false;
  public noReject: boolean = false;
  public noErrorMessage: boolean = false;

  public get<D extends any = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"get", D>("get", url, undefined, config);
  }

  public delete<D extends any = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"delete", D>("delete", url, undefined, config);
  }

  public post<D extends any = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"post", D>("post", url, data, config);
  }

  public patch<D extends any = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"patch", D>("patch", url, data, config);
  }

  public put<D extends any = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<D>> {
    return this.wrapper<"put", D>("put", url, data, config);
  }

  public wrapper<T extends HTTPMethod, D extends any = any>(
    method: T,
    url: string,
    data?: T extends "get" ? never : any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<D>> {
    return new Promise<AxiosResponse<D>>((resolve, reject) => {
      let loader: ReturnType<typeof showLoadingAlert> | null = null;
      if (this.showLoader) loader = showLoadingAlert();

      const sendingConfig: AxiosRequestConfig = {
        ...this.config,
        ...config,
        onUploadProgress: (ev) => loader?.progress(ev.progress || 0),
      };

      axios({
        method,
        url,
        data: data,
        ...sendingConfig,
      })
        .then((r) => {
          if (!r.status.toString().startsWith("2")) {
            console.error(`HTTP Errpr: Fetch ${method} ${url}`, r);
            if (!this.noErrorMessage)
              showErrorAlert(makeErrorResponseMessage(r));
            if (!this.noReject) reject(r);
          } else resolve(r);
        })
        .catch((r) => {
          console.error(`HTTP Errpr: Fetch ${method} ${url}`, r);
          if (!this.noErrorMessage)
            showErrorAlert(makeErrorResponseMessage(r.response));
          if (!this.noReject) reject(r);
        })
        .finally(() => {
          loader?.stop();
        });
    });
  }
}

export function axiosWrapper<
  T extends "get" | "post" | "patch",
  D extends any = any,
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
        if (!r.status.toString().startsWith("2")) {
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

export function makeErrorResponseMessage(response: AxiosResponse): string {
  let serverMessage = response?.data?.message;

  if (!serverMessage) {
    serverMessage =
      {
        404: "The resource does not exist",
      }[response?.status] || `Failed to fetch data`;
  }

  return `${serverMessage} (${response?.status} - ${response?.config?.url})`;
}

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function leftPad(what: string, w: string, length: number) {
  return w.repeat(length - what.length || 0) + what;
}

export function randomBoolean(): boolean {
  return Math.random() > 0.5;
}

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomRangeDecimal(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function exprLog(...what: any): true {
  console.log(...what);
  return true;
}

export function makeListener<T extends EventEmitter>(
  obj: T,
  on: Parameters<T["on"]>[0],
  caller: (...args: any) => any,
): (...args: any) => any {
  obj.on(on, caller);
  return caller;
}

export function measureText(text: string, font = "16px Arial") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = font;
  const metrics = context.measureText(text);
  return {
    width: metrics.width,
    actualBoundingBoxAscent: metrics.actualBoundingBoxAscent,
    actualBoundingBoxDescent: metrics.actualBoundingBoxDescent,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  };
}

export function guessFileNameFromUrl(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    const segments = url.pathname.split("/");
    const last = segments.pop() || "";
    return last || "downloaded_file";
  } catch {
    return "downloaded_file";
  }
}

export function todo() {
  showInfoAlert("This is a future feature!");
}
