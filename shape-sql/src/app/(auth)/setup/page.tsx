'use client';
import { Button } from '@/app/Button';
import { useUser } from '@clerk/nextjs';

export default function Page({ params }: { params: { id: string } }) {
  const user = useUser();
  const botToken = user ? (user.user?.publicMetadata['botToken'] as string) : null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          height: 400,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <h1>Dashboard</h1>
        <div>
          {botToken ?? (
            <a href="https://slack.com/oauth/v2/authorize?client_id=5104325368790.5123570453313&scope=chat:write,chat:write.customize,app_mentions:read,channels:history,groups:history,im:history,mpim:history&user_scope=&state=">
              Connect Slack
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
