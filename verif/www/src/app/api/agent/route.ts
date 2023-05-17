import { TOOLS, agent } from '@/lib';

export async function GET(request: Request) {
  const result = await agent(TOOLS, 'What the day tomorrow?', '', 0, (token) => {
    process.stdout.write(token);
  });
  return new Response('');
}
