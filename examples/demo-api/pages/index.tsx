import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import LoadingDots from '../components/LoadingDots';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [issueCommand, setIssueCommand] = useState('');
  const [agentResponse, setAgentResponse] = useState('');

  const submitCommand = async (e: any) => {
    e.preventDefault();

    setAgentResponse('');
    setLoading(true);

    const OWNER = 'teamspace-inc';
    const REPO = 'collabkit';
    const command = issueCommand;

    const json = JSON.stringify({
      OWNER,
      REPO,
      command,
    });

    const response = await fetch('/api/issueTracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      console.log('there is no data');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAgentResponse((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Github Issues LLM v0.1
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium">Enter a command </p>
          </div>

          <textarea
            value={issueCommand}
            onChange={(e) => setIssueCommand(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={'e.g. Create an issue reguarding AI domination'}
          />
          <div>
            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-40 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => submitCommand(e)}
              >
                Submit command &rarr;
              </button>
            )}
          </div>
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>

        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

        <div className="space-y-10 my-10">
          {agentResponse && (
            <>
              <div>
                <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"></h2>
                {agentResponse}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
