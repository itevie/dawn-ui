import { useMemo } from "react";
import Link from "./Link";
import { combineClasses } from "../util";

export default function Breadcrumb({
  url,
  noPage,
}: {
  noPage?: boolean;
  url: URL;
}) {
  const parts = useMemo(() => {
    const segments = url.pathname.split("/");
    segments.shift();

    let parts: [string, string][] = [[url.hostname, "/"]];
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
  }, [url]);

  return (
    <div
      className={combineClasses(
        "dawn-breadcrumb",
        noPage ? "dawn-breadcrumb-no-align" : ""
      )}
    >
      {parts.map((segment) => (
        <label key={segment[1]}>
          <Link href={segment[1]}>{segment[0]}</Link> <small> / </small>
        </label>
      ))}
    </div>
  );
}
