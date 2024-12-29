export interface SearchOptions<T> {
  data: T[];
  keyCheck: (keyof T)[];
  query: string;
  custom?: [RegExp, (value: T, match: string) => boolean][];
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

  const customChecks: string[] = [];
  console.log(options.custom);
  for (const regex of options.custom ?? []) {
    console.log(options.query, regex);
    while (options.query.match(regex[0])) {
      let match = options.query.match(regex[0])?.[1];
      options.query = options.query.replace(regex[0], "");
      customChecks.push(match as string);
    }
  }

  console.log(customChecks);

  const filtered = options.data.filter(
    (d) =>
      queries.some((x) => check(x[0] as keyof T, x[1], d)) ||
      options.keyCheck.some((x) => check(x, options.query.trim(), d)) ||
      options.custom?.some((x) => customChecks.some((y) => x[1](d, y)))
  );

  return filtered;
}
