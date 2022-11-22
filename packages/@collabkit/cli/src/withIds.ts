type WithID<T> = T & { id: string };

export function withIds<T extends object>(snapshot: { [id: string]: T }): WithID<T>[] {
  return Object.entries(snapshot).map(([id, value]) => ({ id, ...value }));
}
