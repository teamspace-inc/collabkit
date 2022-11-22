import admin from 'firebase-admin';
import ora from 'ora';
import prompts from 'prompts';
import kleur from 'kleur';
import { initializeApp } from '../../initializeApp';
import { withIds } from '../../withIds';
import { nanoid } from '../../nanoid';

type Signup = { email: string; status?: 'created' | 'contacted' | 'ignored' };

type Options = { fromSignups: boolean; dryRun: boolean };

export default async (options: Options, ...args: string[]) => {
  initializeApp();

  if (options.dryRun) {
    console.log(kleur.yellow('--dry-run specified, not creating apps for real'));
  }

  if (options.fromSignups) {
    await createFromSignups(options);
  } else {
    await createFromPrompt(options);
  }
};

const APP_DEFAULTS = {
  defaultNotificationPreference: 'allWorkspace',
  emailBatchDelayMs: 300_000,
  isEmailDisabled: true,
  logoUrl: '',
  mode: 'UNSECURED',
};
const APP_ID_LENGTH = 21;
const API_KEY_LENGTH = 32;

async function createApp(name: string, dryRun: boolean): Promise<string> {
  const id = nanoid(APP_ID_LENGTH);
  const db = admin.database();
  const apiKey = nanoid(API_KEY_LENGTH);
  const app = {
    ...APP_DEFAULTS,
    name,
    keys: {
      [apiKey]: true,
    },
  };
  const ref = db.ref('/apps').child(id);
  // If an app with this ID already exists, we must generate a new ID.
  if ((await ref.get()).exists()) {
    return createApp(name, dryRun);
  }
  if (!dryRun) {
    const creating = ora('Creating...');
    await ref.set(app);
    creating.succeed(`Created ${kleur.bold(name)} [${id}]`);
  } else {
    console.log(kleur.yellow(`[dry-run]: Skipping set of ${ref}`));
  }
  console.log(`appId="${id}"\napiKey="${apiKey}"`);
  return id;
}

async function createFromSignups(options: Options) {
  const fetching = ora('Fetching new signups...');
  const db = admin.database();
  const ref = db.ref('/website/signups');
  const snapshot = await ref.get();
  fetching.succeed();
  const allSignups = withIds<Signup>(snapshot.val());
  const newSignups = allSignups.filter((signup) => signup.status == null);

  if (newSignups.length === 0) {
    console.log('No new signups');
    process.exit(1);
  }
  console.log(`Found ${newSignups.length} new signups:\n`);
  for (const signup of newSignups) {
    console.log(signup.email);
  }
  console.log();
  const { shouldCreate } = await prompts({
    type: 'confirm',
    name: 'shouldCreate',
    message: `Create ${newSignups.length} new apps?`,
    initial: false,
  });
  if (!shouldCreate) {
    console.log('Not created');
    process.exit(1);
  }
  let i = 0;
  for (const signup of newSignups) {
    const { name } = await prompts(
      {
        type: 'text',
        name: 'name',
        message: `[${++i}/${newSignups.length}] Name for ${
          signup.email
        }'s app (leave empty to skip)`,
      },
      {
        onCancel: () => process.exit(1),
      }
    );
    if (!name) {
      console.log(kleur.yellow(`Skipping ${signup.email}`));
      continue;
    }
    await createApp(name, options.dryRun);
    if (!options.dryRun) {
      await db.ref('/website/signups').child(signup.id).child('status').set('created');
    }
  }
}

async function createFromPrompt(options: Options) {
  const { name } = await prompts(
    {
      type: 'text',
      name: 'name',
      message: `Name for app`,
    },
    {
      onCancel: () => process.exit(1),
    }
  );
  await createApp(name, options.dryRun);
}
