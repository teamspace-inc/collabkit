export function isValidUrl(str: unknown) {
  if (typeof str !== 'string') {
    return false;
  }
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
}
