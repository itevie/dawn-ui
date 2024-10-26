import { ReactNode } from "react";
import Column from "./Column";

export default function InputWithSide({children}: {children: [ReactNode, ReactNode]}) {
  return (
    <Column style={{gap: "10px"}}>
      {children[0]}
      {children[1]}
    </Column>
  )
}