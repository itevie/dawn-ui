export const units = {
  day: 8.64e7,
  hour: 3.6e6,
  minute: 60000,
  second: 1000,
  ms: 1,
} as const;

type Unit = keyof typeof units;

export const quantifiers = {
  day: ["d", "day", "days"],
  hour: ["h", "hr", "hrs", "hour", "hours"],
  minute: ["m", "min", "mins", "minute", "minutes"],
  second: ["s", "sec", "secs", "second", "seconds"],
  ms: ["ms"],
};

export class DawnTime {
  public units: Record<Unit, number> = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    ms: 0,
  };

  constructor(time: number) {
    for (const unit in units) {
      let amount = 0;
      let u = units[unit as Unit];
      while (time >= u) {
        amount += 1;
        time -= u;
      }
      this.units[unit as Unit] = amount;
    }
  }

  public toMs() {
    let result = 0;
    for (const i in this.units) {
      result += units[i as Unit] * this.units[i as Unit];
    }
    return result;
  }

  public toString(ignore?: Unit[]) {
    let result = "";
    for (const i in this.units)
      if (this.units[i as Unit] > 0 && !ignore?.includes(i as Unit))
        result += `${this.units[i as Unit]} ${i} `;
    return result.trim();
  }

  get biggestUnit(): Unit | null {
    for (const i in this.units) {
      if (this.units[i as Unit] !== 0) return i as Unit;
    }
    return null;
  }

  public static formatDateString(time: Date, format: string): string {
    format = format.replace("YYYY", time.getFullYear().toString());
    format = format.replace("MM", time.getMonth().toString().padStart(2, "0"));
    format = format.replace("DD", time.getDate().toString().padStart(2, "0"));
    format = format.replace("hh", time.getHours().toString().padStart(2, "0"));
    format = format.replace(
      "mm",
      time.getMinutes().toString().padStart(2, "0")
    );
    format = format.replace(
      "ss",
      time.getSeconds().toString().padStart(2, "0")
    );

    return format;
  }

  public static fromString(timeString: string): DawnTime | null {
    let time = new DawnTime(0);

    while (timeString.length > 0) {
      let amount = timeString.match(/^([0-9]+)/);
      if (amount === null) return null;
      timeString = timeString.substring(amount[0].length).trim();

      let quantifier: Unit | null = null;
      for (const qk in quantifiers) {
        if (quantifier) break;
        for (const q of quantifiers[qk as keyof typeof quantifiers].sort(
          (a, b) => b.length - a.length
        )) {
          if (timeString.match(new RegExp(`^(${q})`, "i"))) {
            quantifier = qk.toLowerCase() as Unit;
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
