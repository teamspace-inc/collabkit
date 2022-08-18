export function deleteUndefinedProps(o: any) {
  if (typeof o === 'object') {
    Object.keys(o).forEach((key) => {
      if (o[key] === undefined) {
        delete o[key];
      }
    });
  }
  return o;
}
