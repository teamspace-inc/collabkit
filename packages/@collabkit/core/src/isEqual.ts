export function isEqual(obj1: any, obj2: any, checkDataOrder: boolean = false): boolean {
  const checkDataOrderParanoic = false;
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  let _obj1 = obj1;
  let _obj2 = obj2;
  if (!checkDataOrder) {
    if (obj1 instanceof Array) {
      _obj1 = obj1.sort();
    }
    if (obj2 instanceof Array) {
      _obj2 = obj2.sort();
    }
  }
  if (typeof _obj1 !== 'object' || typeof _obj2 !== 'object') {
    return _obj1 === _obj2;
  }

  const obj1Props = Object.getOwnPropertyNames(_obj1);
  const obj2Props = Object.getOwnPropertyNames(_obj2);
  if (obj1Props.length !== obj2Props.length) {
    return false;
  }

  if (checkDataOrderParanoic && checkDataOrder) {
    // whill result in {a:1, b:2} !== {b:2, a:1}
    // its not normal, but if you want this behavior, set checkDataOrderParanoic = true
    const propOrder = obj1Props.toString() === obj2Props.toString();
    if (!propOrder) {
      return false;
    }
  }

  for (const prop of obj1Props) {
    const val1 = obj1[prop];
    const val2 = obj2[prop];

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      if (isEqual(val1, val2, checkDataOrder)) {
        continue;
      } else {
        return false;
      }
    }
    if (val1 !== val2) {
      return false;
    }
  }
  return true;
}
