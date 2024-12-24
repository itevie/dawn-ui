interface SearchOptions<T> {
  data: T[];
  keyCheck: (keyof T)[];
  query: string;
}

export function getSearchResults<T extends object>(
  options: SearchOptions<T>
): T[] {
  if (options.query.trim().length === 0) return options.data;

  let queries: [string, string][] = [];

  while (options.query.match(/[a-z]+=[^\s]+/)) {
    let match = options.query.match(/([a-z]+)=([^\s]+)/) as string[];
    options.query = options.query.replace(/[a-z]+=[^\s]+/, "");
    queries.push([match[1], match[2]]);
  }

  const check = (k: keyof T, v: string, d: T) => {
    if (v.length === 0) return;
    switch (typeof d[k]) {
      case "string": {
        try {
          const regex = new RegExp(v, "gi");
          return (d[k] as string).match(regex);
        } catch {
          return (d[k] as string).includes(v.toLowerCase());
        }
      }
      case "number": {
        return (d[k] as number) === parseInt(v);
      }
      case "boolean": {
        return (d[k] as boolean) === (v.toLowerCase() === "true");
      }
    }

    return false;
  };

  const filtered = options.data.filter(
    (d) =>
      queries.some((x) => check(x[0] as keyof T, x[1], d)) ||
      options.keyCheck.some((x) => check(x, options.query.trim(), d))
  );

  return filtered;
}
