import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, UtilClassNames } from "../util";

export default function Panel(
  { width, title, children, hover, util,...rest }: {
    width?: string;
    hover?: boolean;
    title: string;
    util?: UtilClassNames[],
    children: ReactNode;
  } & HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...rest}
      className={combineClasses("dawn-panel", hover ? "dawn-panel-hover" : "", util)}
      style={{
        ...rest.style,
        ...(width &&
        {
          width: `${{ "full": "100%", "fit": "fit-content" }[width] || width
            }`,
        }),
      }}
    >
      <div className="dawn-panel-title">
        <label className="dawn-panel-title-text">{title}</label>
      </div>
      <div className="dawn-content">
        {children}
      </div>
    </div >
  );
}
