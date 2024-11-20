export const units = {
  day: 8.64e7,
  hour: 3.6e6,
  minute: 60000,
  second: 1000,
  ms: 1,
} as const;

export const quantifiers = {
  day: ["d", "day", "days"],
  hour: ["h", "hr", "hrs", "hour", "hours"],
  minute: ["m", "min", "mins", "minute", "minutes"],
  second: ["s", "sec", "secs", "second", "seconds"],
  ms: ["ms"],
};

export class DawnTime {
  public units: Record<keyof typeof units, number> = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    ms: 0,
  };

  constructor(time: number) {
    for (const unit in units) {
      let amount = 0;
      let u = units[unit as keyof typeof units];
      while (time >= u) {
        amount += 1;
        time -= u;
      }
      this.units[unit as keyof typeof units] = amount;
    }
  }

  public toMs() {
    let result = 0;
    for (const i in this.units) {
      result +=
        units[i as keyof typeof units] * this.units[i as keyof typeof units];
    }
    return result;
  }

  get biggestUnit(): keyof typeof units | null {
    for (const i in this.units) {
      if (this.units[i as keyof typeof units] !== 0)
        return i as keyof typeof units;
    }
    return null;
  }

  public static fromString(timeString: string): DawnTime | null {
    let time = new DawnTime(0);

    while (timeString.length > 0) {
      let amount = timeString.match(/^([0-9]+)/);
      if (amount === null) return null;
      timeString = timeString.substring(amount[0].length).trim();

      let quantifier: keyof typeof units | null = null;
      for (const qk in quantifiers) {
        if (quantifier) break;
        for (const q of quantifiers[qk as keyof typeof quantifiers].sort(
          (a, b) => b.length - a.length
        )) {
          if (timeString.match(new RegExp(`^(${q})`, "i"))) {
            quantifier = qk.toLowerCase() as keyof typeof units;
            timeString = timeString.substring(q.length).trim();
            break;
          }
        }
      }

      if (!quantifier) return null;
      time.units[quantifier] = parseInt(amount[0]);
      if (timeString.startsWith(","))
        timeString = timeString.substring(1).trim();
    }

    return time;
  }
}
