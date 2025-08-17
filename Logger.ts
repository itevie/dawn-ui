export default class Logger {
  public static baseConfig: { baseColor: string | null } = {
    baseColor: "#FFB6C1",
  };
  public baseColor: string | null = null;

  constructor(public name: string) {}

  private createPrefix(c?: string | null): [string, string] {
    let color = c || this.baseColor || Logger.baseConfig.baseColor;
    return [`%c[${this.name}] =>`, `font-weight: bold; color: ${color}`];
  }

  public log(...logs: any[]): void {
    console.log(...this.createPrefix(), ...logs);
  }

  public error(...logs: any[]): void {
    console.log(...this.createPrefix("#FF0000"), ...logs);
  }

  public warn(...logs: any[]): void {
    console.log(...this.createPrefix("#FFFF00"), ...logs);
  }
}

export const defaultLogger = new Logger("log");
