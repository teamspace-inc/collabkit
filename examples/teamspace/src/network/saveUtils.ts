import { Save } from './types';

export function getLinkedDocSave(save: Save, linkedDocId: string): Save | undefined {
  const { l, ...linkedSave } = save;

  return l?.[linkedDocId]
    ? {
        ...linkedSave,
        did: linkedDocId,
        u: l?.[linkedDocId],
      }
    : undefined;
}
