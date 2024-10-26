import { ReactNode } from "react";

interface TextProps {
  type?: "heading" | "navbar" | "page-title" | "title";
}

export default function Text(props: TextProps & { children: ReactNode }) {
  return (
    <p className={`dawn-text ${props.type ? `dawn-text-${props.type}` : ""}`}>
      {props.children}
    </p>
  );
}
