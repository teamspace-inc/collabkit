import { deleteProperty, escapePath, getProperty, setProperty } from 'dot-prop';

export { deleteProperty, escapePath, getProperty, setProperty };

export type Path = (string | symbol)[];
export type Op =
  | [op: 'set', path: Path, value: unknown, prevValue: unknown]
  | [op: 'delete', path: Path, prevValue: unknown]
  | [op: 'resolve', path: Path, value: unknown]
  | [op: 'reject', path: Path, error: unknown];

export function isObject(value: unknown): value is object {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

/** Turns a path of string keys into a string with dot separated properties.
 *
 * @example stringifyPath(['domains', 'www.example.com']) => 'domains.www\\.example\\.com'
 */
export function stringifyPath(path: Path): string {
  return path
    .map((segment) => {
      if (typeof segment !== 'string') {
        throw new TypeError(`Expected a path with string segments. Path: ${path.toString()}`);
      }
      return escapePath(segment);
    })
    .join('.');
}

/** Joins stringified paths together.
 *
 * @example joinPaths(stringifyPath(['foo', 'bar']), stringifyPath(['baz']))
 */
export function joinPaths(...paths: string[]) {
  return paths.join('.');
}

function* deepKeysIterator(
  object: unknown,
  currentPath: string[] = []
): Generator<{ isLeaf: boolean; key: string }, void> {
  if (!isObject(object)) {
    if (currentPath.length > 0) {
      yield { isLeaf: true, key: stringifyPath(currentPath) };
    }

    return;
  }

  if (currentPath.length > 0) {
    yield { isLeaf: false, key: stringifyPath(currentPath) };
  }
  for (const [key, value] of Object.entries(object)) {
    yield* deepKeysIterator(value, [...currentPath, key]);
  }
}

// Based on the deepKeys function in dot-prop, but also includes the non-leaf keys.
// https://github.com/sindresorhus/dot-prop/blob/84c32335c873d24950d07be648ec4f80f0a8664e/index.js#L317-L333
export function deepKeys(object: unknown) {
  return [...deepKeysIterator(object)];
}
