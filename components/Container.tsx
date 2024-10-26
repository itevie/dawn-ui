import { ReactNode } from "react";

export default function Container(props: { children: ReactNode }) {
  return (
    <div className="dawn-container">
      {props.children}
    </div>
  );
}