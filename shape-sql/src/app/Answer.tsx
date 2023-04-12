'use client';
import React, { useEffect } from 'react';
import styles from './page.module.css';
import { Divider } from './Divider';

import { format } from 'sql-formatter';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import { H3 } from './H3';
import { FeedbackButtons } from './FeedbackButtons';
import { useSnapshot } from 'valtio';
SyntaxHighlighter.registerLanguage('sql', sql);

import { store } from './store';
import { query } from './actions';

export function Answer(props: { queryId: string }) {
  const answer = useSnapshot(store.queries)[props.queryId];
  useEffect(() => {
    query(props.queryId);
  }, [props.queryId]);
  return answer ? <AnswerRenderer queryId={props.queryId} /> : null;
}

function AnswerRenderer(props: { queryId: string }) {
  const { query, result, answer, processing, sql } = useSnapshot(store.queries)[props.queryId];
  return (
    <div className={styles.list}>
      <h1
        style={{
          fontSize: 28,
          lineHeight: '30px',
          marginTop: 20,
          marginBottom: 0,
          fontWeight: 600,
          wordWrap: 'break-word',
        }}
      >
        {decodeURIComponent(query)}
      </h1>
      <Divider />
      <H3>Processing</H3>
      <div className={styles.thinking}>
        <div className={styles.thought}>{result}</div>
      </div>
      {answer ? (
        <>
          <Divider />
          <H3>Answer</H3>
          <div className={styles.answer}>{answer}</div>
          <FeedbackButtons />
        </>
      ) : null}
      {sql && !processing ? (
        <>
          <Divider />
          <H3>Generated SQL</H3>
          <div className={styles.sql}>{sql ? format(sql) : ''}</div>
        </>
      ) : null}
    </div>
  );
}
