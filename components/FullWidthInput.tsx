import { forwardRef, HTMLAttributes, ReactNode } from "react";
import Column from "./Column";
import { combineStyles } from "../util";
import Row from "./Row";
import Words from "./Words";

export default function FullWidthInput(props: {
  name: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Row className="dawn-container-secondary">
      <Column util={["flex-grow"]}>
        <Words>{props.name}</Words>
        <>{props.description && <small>{props.description}</small>}</>
      </Column>
      {props.children}
    </Row>
  );
}
