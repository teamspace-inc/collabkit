export default function assert(condition: any, message: string = ''): asserts condition {
  if (!condition) {
    throw new Error(`assert failed ${message} ${condition}`);
  }
}
