import { open } from 'file-store';
import { mutables } from 'state/mutables';

export default async function setupFileStore() {
  try {
    const fileStoreDB = await open();
    mutables.fileStoreDB = fileStoreDB;
  } catch (e) {
    console.error('could not open fileStoreDB', e);
  }
}
