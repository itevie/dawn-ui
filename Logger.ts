export default class Logger {
  constructor(public name: string) {}

  private createPrefix(color: string = "#FFB6C1"): [string, string] {
    return [`%c[${this.name}] =>`, `font-weight: bold; color: ${color}`];
  }

  public log(...logs: any[]): void {
    console.log(...this.createPrefix(), ...logs);
  }

  public error(...logs: any[]): void {
    console.log(...this.createPrefix("#FF0000"), ...logs);
  }
}

export const defaultLogger = new Logger("log");
