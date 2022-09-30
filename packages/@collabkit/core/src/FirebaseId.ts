/** Encodes a Unicode string in a format suitable for use as a key in Firebase
 * Realtime Database.
 *
 * See: https://firebase.google.com/docs/database/web/structure-data#how_data_is_structured_its_a_json_tree
 * "If you create your own keys, they must be UTF-8 encoded, can be a maximum
 * of 768 bytes, and cannot contain ., $, #, [, ], /, or ASCII control
 * characters 0-31 or 127. You cannot use ASCII control characters in the
 * values themselves, either."
 * */
export function encode(id: string) {
  // . is disallowed, but not escaped by encodeURIComponent, so it must be
  // handled separately.
  return encodeURIComponent(id).replace(/\./g, '%2E');
}

/** Decodes an URL-encoded ID back to an arbitrary Unicode string. */
export function decode(encodedId: string) {
  // . does not need to be replaced back, since it's done by decodeURIComponent.
  return decodeURIComponent(encodedId);
}
