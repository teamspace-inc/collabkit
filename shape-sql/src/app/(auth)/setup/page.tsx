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
        <div>{botToken ?? <Button>Connect Slack</Button>}</div>
      </div>
    </div>
  );
}
