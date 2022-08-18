import { WorkspaceProps } from '../../types';

export function isValidWorkspace(o: any): o is WorkspaceProps {
  return (
    (o !== null &&
      typeof o === 'object' &&
      'name' in o &&
      // setting to null deletes the name
      (typeof o.name === 'string' || o.name === null)) ||
    o === null
  );
}
