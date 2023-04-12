import { store } from './store';

const FINAL_ANSWER = new RegExp(/Final Answer: (\s|.*)\.Finished chain/gm);
const ACTION_INPUT = new RegExp(/Action Input: (\s*.*)/gm);

// used to extract the generated SQL from:
//   Action Input: SELECT state_name, MAX(confirmed_cases) as max_cases FROM us_states WHERE confirmed_cases IS NOT NULL GROUP BY state_name ORDER BY max_cases DESC LIMIT 10
function getLastActionInput(text: string) {
  let match;
  let lastMatch;

  while ((match = ACTION_INPUT.exec(text)) !== null) {
    lastMatch = match[1];
  }

  return lastMatch;
}

export async function query(query: string) {
  // move this to the server so we can cache results
  const id = query;
  store.queries[id] = { query, processing: true };
  const url = new URL('https://runsqlagent-vpyt2vheeq-nw.a.run.app/');
  url.searchParams.set('query', query);
  fetch(url)
    .then((response) => {
      const { body } = response;
      if (!body) {
        console.error('no body');
        return;
      }

      const reader = body.getReader();

      function process(text: string) {
        if (text == undefined) {
          return;
        }
        store.queries[id].result = `${store.queries[id].result ?? ''}${text}`;
        const match = FINAL_ANSWER.exec(text);
        console.log({ text });
        if (match?.[1]) {
          store.queries[id].answer = match[1];
          store.queries[id].sql = getLastActionInput(text)?.toString();
        }
      }

      function read() {
        return reader
          .read()
          .then(({ done, value }) => {
            const decoder = new TextDecoder();
            const text = decoder.decode(value);
            process(text);
            if (done) {
              store.queries[id].processing = false;
              return;
            }
            requestAnimationFrame(() => read());
          })
          .catch(console.error);
      }

      read();
    })
    .catch(console.error)
    .catch(console.error);
  return id;
}
