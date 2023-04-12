export function cx(...args: string[]) {
  return args.filter(Boolean).join(' ');
}
