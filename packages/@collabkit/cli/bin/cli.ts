import { Command } from 'commander';

const program = new Command('ck');

async function run<T extends (options: any, ...args: string[]) => Promise<void>>(
  load: () => Promise<{ default: T }>,
  options?: any
) {
  const commandModule = await load();
  await commandModule.default(options, ...program.args.slice(1));
  process.exit(0);
}

const app = program.command('apps [id]');
app.action(() => run(() => import('../src/commands/apps')));
app
  .command('create')
  .option('--from-signups', 'Creates apps for new signups', false)
  .option('--dry-run', 'Runs the command without actually creating the apps', false)
  .action((options) => {
    run(() => import('../src/commands/apps/create'), options);
  });

program.parse(process.argv);
