import { customAlphabet } from 'nanoid';

// Same as noolookalikes but with removed vowels and following letters: 3, 4, x, X, V.
// This list should protect you from accidentally getting obscene words in generated strings.
// (The alphabet is included in the nanoid-dictionary package, but inlined here for efficiency.)
const nolookalikesSafe = '6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz';

// 24 * Math.log(36) / Math.LN2 = ~124
// 24 character IDs with 36 character alphabet => 124 bits of entropy (UUID has 122)
const size = 24;

export const nanoid = customAlphabet(nolookalikesSafe, size);
