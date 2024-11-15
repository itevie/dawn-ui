import { ReactNode } from "react";
import { UtilClassNames } from "../util";

export default function Content({
  util,
  children,
  page,
}: {
  util?: UtilClassNames[];
  page?: boolean;
  children: ReactNode;
}) {
  return <div className="dawn-content"></div>;
}
