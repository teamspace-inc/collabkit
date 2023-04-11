'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import { Divider } from './Divider';

import { format } from 'sql-formatter';
const FINAL_ANSWER = new RegExp(/Final Answer: (\s*.*)/gm);
const ACTION_INPUT = new RegExp(/Action Input: (\s*.*)/gm);

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { H3 } from './H3';
import { FeedbackButtons } from './FeedbackButtons';
SyntaxHighlighter.registerLanguage('sql', sql);

export function Thought(props: { children: React.ReactNode }) {
  const children = props.children;
  return <div className={[styles.thought].join(' ')}>{children}</div>;
}

function getLastActionInput(text: string) {
  // used to get the generated SQL
  let match;
  let lastMatch;

  while ((match = ACTION_INPUT.exec(text)) !== null) {
    lastMatch = match[1];
  }

  return lastMatch;
}

export function Thinking() {
  const sampleInput = `> Entering new AgentExecutor chain...
  Action: list_tables_sql_db
  Action Input:
  Observation: us_states
  Thought:I should check the schema of the us_states table to see if it has information about covid cases.
  Action: schema_sql_db
  Action Input: us_states
  Observation:
  CREATE TABLE \`us_states\` (
    \`date\` DATE OPTIONS(description=‘Date reported’),
    \`state_name\` STRING OPTIONS(description=‘State reported’),
    \`state_fips_code\` STRING OPTIONS(description=‘Standard geographic identifier for the state’),
    \`confirmed_cases\` INT64 OPTIONS(description=‘The total number of confirmed cases of COVID-19’),
    \`deaths\` INT64 OPTIONS(description=‘The total number of confirmed deaths of COVID-19’)
  )
  OPTIONS(description=‘State-level data for the number of cases and deaths from The New York Times. Sourced from https://github.com/nytimes/covid-19-data.’)
  /*
  3 rows from us_states table:
  date	state_name	state_fips_code	confirmed_cases	deaths
  2020-03-15	Guam	66	3	0
  2020-03-16	Guam	66	3	0
  2020-03-17	Guam	66	3	0
  */
  Thought:The us_states table has information about covid cases. I should write a query to find the states with the most covid cases.
  Action: query_checker_sql_db
  Action Input: SELECT state_name, MAX(confirmed_cases) as max_cases FROM us_states GROUP BY state_name ORDER BY max_cases DESC LIMIT 10
  Observation:
  SELECT state_name, MAX(confirmed_cases) as max_cases FROM us_states WHERE confirmed_cases IS NOT NULL GROUP BY state_name ORDER BY max_cases DESC LIMIT 10
  Thought:The query is correct. I should execute it to get the states with the most covid cases.
  Action: query_sql_db
  Action Input: SELECT state_name, MAX(confirmed_cases) as max_cases FROM us_states WHERE confirmed_cases IS NOT NULL GROUP BY state_name ORDER BY max_cases DESC LIMIT 10
  Observation: [(‘California’, 12169158), (‘Texas’, 8447168), (‘Florida’, 7542869), (‘New York’, 6805271), (‘Illinois’, 4107931), (‘Pennsylvania’, 3539135), (‘North Carolina’, 3481732), (‘Ohio’, 3415254), (‘Michigan’, 3068195), (‘New Jersey’, 3057442)]
  Thought:I now know the final answer.
  Final Answer: The states with the most covid cases are California (12,169,158), Texas (8,447,168), Florida (7,542,869), New York (6,805,271), Illinois (4,107,931), Pennsylvania (3,539,135), North Carolina (3,481,732), Ohio (3,415,254), Michigan (3,068,195), and New Jersey (3,057,442).
  > Finished chain.`;

  const [thoughts, setThoughts] = useState<string[]>([]);
  const [finalAnswer, setFinalAnswer] = useState<string | null>(null);
  const [finalSQL, setFinalSQL] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);

  const streamRef = useRef<ReadableStream<Uint8Array> | null>(null);

  const queueChunk = useCallback((controller: ReadableStreamDefaultController, i: number) => {
    setTimeout(() => {
      const encoder = new TextEncoder();
      const text = sampleInput.slice(0, i);
      const chunk = encoder.encode(text);
      controller.enqueue(chunk);
      if (i >= sampleInput.length) {
        controller.close();
      } else {
        queueChunk(controller, i + Math.ceil(Math.random() * 400));
      }
    }, Math.ceil(Math.random() * 1));
  }, []);

  const processText = useCallback((text: string) => {
    if (text.length === 0) return;
    const match = FINAL_ANSWER.exec(text);
    if (match?.[1]) {
      setFinalAnswer(match[1]);
      setFinalSQL(getLastActionInput(text)?.toString() ?? null);
    } else {
      // const splitText = text;
      // .replace('> Entering new AgentExecutor chain...', '')
      // .replace(/> Finished chain\.$/, '')
      // .replace(/[`‘’]/g, "'");
      // .split(new RegExp('\\s*(' + LABELS.join('|') + ')\\s*'));
      // const result = splitText.filter((str) => str.trim() !== '');
      setThoughts([text]);
    }
  }, []);

  const readStream = useCallback(
    (reader: ReadableStreamDefaultReader) => {
      reader
        .read()
        .then(({ value, done }) => {
          const decoder = new TextDecoder();
          const text = decoder.decode(value);
          processText(text);
          const id = requestAnimationFrame(() => readStream(reader));
          if (done) {
            // hack to stop it
            reader.releaseLock();
            cancelAnimationFrame(id);
            setDone(true);
            streamRef.current = null;
          }
        })
        .catch((e) => console.error(e));
    },
    [streamRef.current]
  );

  useEffect(() => {
    streamRef.current = new ReadableStream({
      start(controller) {
        queueChunk(controller, 0);
      },
    });
  }, []);

  useEffect(() => {
    if (streamRef.current) {
      const reader = streamRef.current.getReader();
      readStream(reader);
    }
  }, []);

  return (
    <div className={styles.list}>
      <h1
        style={{
          fontSize: 28,
          lineHeight: '30px',
          marginTop: 20,
          marginBottom: 0,
          fontWeight: 600,
        }}
      >
        Which states have the highest covid?
      </h1>
      {/* <div style={{ padding: 10, display: 'flex', gap: 10 }}>
        <div style={{ height: 24, width: 24 }}>
          {done ? (
            <Check size="20" color="#9FEFD7" weight="bold" />
          ) : (
            <SpinnerCircular
              enabled={!done}
              color="#9FEFD7"
              secondaryColor="#2D302F"
              size={20}
              thickness={200}
            />
          )}
        </div>
        {done ? 'Done' : 'Processing...'}
      </div> */}
      <Divider />
      <H3>Thinking</H3>
      <div className={styles.thinking}>
        {thoughts.map((thought, i) => (
          <Thought key={i}>{thought}</Thought>
        ))}
      </div>
      {finalAnswer ? (
        <>
          <Divider />
          <H3>Answer</H3>
          <div className={styles.answer}>{finalAnswer}</div>
          <FeedbackButtons />
        </>
      ) : null}
      {finalSQL && done ? (
        <>
          <Divider />
          <H3>Generated SQL</H3>
          <div className={styles.sql}>{finalSQL ? format(finalSQL) : ''}</div>
        </>
      ) : null}
    </div>
  );
}
