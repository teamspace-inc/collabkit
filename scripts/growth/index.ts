import { parse } from 'csv/sync';
import { readFileSync } from 'fs';
import { resolveCname } from 'dns';

async function run() {
  const data = readFileSync('./saas-usa-series-a-golden-05012023.csv', 'utf8');

  const rows = parse(data);

  for (const row of rows) {
    try {
      const firstUrlString = row[3].split(',')[0];
      const url = new URL(firstUrlString.replace('www.', ''));
      const demoUrl = `demo.${url.hostname}`;
      resolveCname(demoUrl, (err, address) => {
        if (address) {
          console.log(demoUrl);
        }
      });
    } catch (e) {
      console.log('bad url', row[3]);
    }
  }
}

run();
