import admin from 'firebase-admin';
import Table from 'cli-table3';
import { initializeApp } from '../../initializeApp';
import { withIds } from '../../withIds';

type App = { name: string };

export default async (_options: {}, ...args: string[]) => {
  const id = args[0];
  if (typeof id === 'string') {
    await get(id);
  } else {
    await list();
  }
};

async function list() {
  initializeApp();

  const db = admin.database();
  const ref = db.ref('/apps');

  const snapshot = await ref.get();
  const apps = withIds<App>(snapshot.val()).sort((a, b) => a.name.localeCompare(b.name));

  var table = new Table({ head: ['id', 'name'] });
  table.push(...apps.map((app) => [app.id, app.name]));
  console.log(table.toString());
  console.log(table.length, 'rows');
}

async function get(id: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error('invalid id');
  }
  initializeApp();

  const db = admin.database();
  const ref = db.ref('/apps').child(id);

  const snapshot = await ref.get();
  const app = snapshot.val();
  if (app == null) {
    throw new Error('not found');
  }
  console.log(JSON.stringify(app, null, 2));
}
