'use client';
import { Button } from '@/app/Button';
import { useOrganization, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {
  const user = useUser();
  const org = useOrganization();
  const botToken = org ? (org.organization?.publicMetadata['botToken'] as string) : null;
  const userId = user ? (user.user?.id as string) : null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ padding: 30, fontSize: 16 }}>Dashboard</h1>
      <div
        style={{
          maxWidth: 960,
          minWidth: '50vw',
          marginTop: 100,
          height: 240,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2D302F',
          borderRadius: '8px',
        }}
      >
        <div>
          {botToken ? <>
            SLACK_BOT_TOKEN={botToken}
            <br /> <br />
            SHAPE_API_KEY=7e221d1ec0008a63a3d805413e2011f1
            <br /> <br />
            SLACK_APP_TOKEN=xapp-1-A053N77ACLV-5143840692758-65a9e921ba6ee3539efd21ebe698ec61cbfdbdd31368afed1a81615ee2dfc5a1
          </> : (
            <Link
              href={
                'https://slack.com/oauth/v2/authorize?client_id=3913993031188.5124245352709&scope=app_mentions:read,channels:history,chat:write,chat:write.customize,groups:history,mpim:history,im:write,im:read,im:history,users.profile:read,mpim:write,mpim:read&user_scope=&redirect_uri=https://us-central1-collabkit-test.cloudfunctions.net/installShapeBot&state=' +
                userId
              }
              style={{
                alignItems: 'center',
                color: '#000',
                backgroundColor: '#fff',
                borderWidth: '1px solid #ddd',
                borderRadius: '4px',
                display: 'inline-flex',
                fontFamily: 'Lato, sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                height: '48px',
                justifyContent: 'center',
                textDecoration: 'none',
                width: '236px',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: '20px', width: '20px', marginRight: '12px' }}
                viewBox="0 0 122.8 122.8"
              >
                <path
                  d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
                  fill="#e01e5a"
                ></path>
                <path
                  d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
                  fill="#36c5f0"
                ></path>
                <path
                  d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
                  fill="#2eb67d"
                ></path>
                <path
                  d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
                  fill="#ecb22e"
                ></path>
              </svg>
              Connect to Slack
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
