import { HTMLAttributes, ReactNode } from "react";
import { showInfoAlert } from "./components/AlertManager";
import EventEmitter from "events";
import { dawnUIConfig } from "./config";

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
  | "ignore-responsive-mobile"
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

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function leftPad(what: string, w: string, length: number) {
  return w.repeat(length - what.length || 0) + what;
}

export function randomBoolean(): boolean {
  return Math.random() > 0.5;
}

export function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomRangeDecimal(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
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

export function resolveImageUrl(url: string): string {
  try {
    const isLocal = window.location.hostname === "localhost";
    const needsPrefix = !url.startsWith("http") && !url.startsWith("data:");
    const prefix = isLocal && needsPrefix ? dawnUIConfig.baseLocalhostUrl : "";
    return `${prefix}${url}`;
  } catch {
    return dawnUIConfig.imageFallback;
  }
}
