import { ReactNode } from "react";
import Row from "./Row";

export default function InputWithSide({children}: {children: [ReactNode, ReactNode]}) {
  return (
    <Row style={{gap: "10px"}}>
      {children[0]}
      {children[1]}
    </Row>
  )
}