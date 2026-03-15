export function defaultKey(...args: unknown[]): string {
  return JSON.stringify(args);
}
