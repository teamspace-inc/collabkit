import admin from 'firebase-admin';
import os from 'os';
import path from 'path';
import { shuffle } from 'lodash';

const colors = [
  'amber',
  'blue',
  'brown',
  'crimson',
  'cyan',
  'grass',
  'green',
  'indigo',
  'lime',
  'mint',
  'orange',
  'pink',
  'plum',
  'purple',
  'red',
  'sky',
  'teal',
  'tomato',
  'violet',
  'yellow',
];

function getRandomColor(): string {
  return shuffle(colors)[0];
}

async function run() {
  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(os.homedir(), 'collabkit-dev-service-account.json')
    ),
    databaseURL: 'https://collabkit-dev-default-rtdb.europe-west1.firebasedatabase.app',
  });

  let missingCount = 0;
  let incorrectCount = 0;
  const apps = await (await admin.database().ref('apps').get()).val();
  for (const appId in apps) {
    const { name: appName } = apps[appId];
    const profilesRef = admin.database().ref(`/profiles/${appId}/`);
    const profiles = (await profilesRef.get()).val();
    if (!profiles) continue;
    for (const [id, profile] of Object.entries(profiles)) {
      if (!(profile as any).color) {
        missingCount++;
        console.log(`(${appName}) Missing color for id="${id}"`, profile);

        const newColor = getRandomColor();
        console.log(`...updating color to "${newColor}"`);
        const ref = profilesRef.child(id).child('color');
        console.log(ref.toString(), '->', newColor);
        await ref.set(newColor);
      } else if (!colors.includes((profile as any).color)) {
        incorrectCount++;
        console.log(`(${appName}) Incorrect color id="${id}"`, profile);

        const newColor = getRandomColor();
        console.log(`...updating color to "${newColor}"`);
        const ref = profilesRef.child(id).child('color');
        console.log(ref.toString(), '->', newColor);
        await ref.set(newColor);
      }
    }
  }

  console.log(`\ntotal missing: ${missingCount}\ntotal incorrect: ${incorrectCount}`);

  process.exit(0);
}

run();
