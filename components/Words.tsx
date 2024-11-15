import { ReactNode } from "react";

export type TextType =
  | "heading"
  | "page-title"
  | "container-title"
  | "normal"
  | "navbar";

export default function Words({
  type,
  children,
}: {
  type?: TextType;
  children: ReactNode;
}) {
  return <label className={`dawn-text-${type ?? "normal"}`}>{children}</label>;
}
