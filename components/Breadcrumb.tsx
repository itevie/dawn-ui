import { useMemo, useState } from "react";
import Link from "./Link";

export default function Breadcrumb() {
  const parts = useMemo(() => {
    const segments = window.location.pathname.split("/");
    segments.shift();

    let parts: [string, string][] = [[window.location.hostname, "/"]];
    let current = "";

    for (const segment of segments) {
      if (segment.length === 0) continue;
      current += `/${segment}`;
      parts.push([segment, current]);
    }

    if (parts.length === 1) {
      return [];
    }

    return parts;
  }, []);

  return (
    <div className="dawn-breadcrumb">
      {parts.map((segment) => (
        <label key={segment[1]}>
          <Link href={segment[1]}>{segment[0]}</Link>{" "}
          <small style={{ color: "gray" }}>/{" "}</small>
        </label>
      ))}
    </div>
  );
}
