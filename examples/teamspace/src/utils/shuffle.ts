/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * This is a based on lodash.shuffle,
 * which is a hefty 30 kB as a standalone package.
 *
 * NOTE: Unlike lodash.shuffle, this shuffles the array in place.
 */
export default function shuffle<T>(array: T[]): T[] {
  if (array.length === 0) {
    return array;
  }
  let index = -1;
  const lastIndex = array.length - 1;
  while (++index < array.length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
  return array;
}
