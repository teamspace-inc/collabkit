'use client';
import { Button } from '@/app/Button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

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
            <Link href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fus-central1-collabkit-test.cloudfunctions.net%2FinstallShapeBot&amp;client_id=5104325368790.5123570453313" style={{ alignItems: "center", color: "#000", backgroundColor: "#fff", borderWidth: "1px solid #ddd", borderRadius: "4px", display: "inline-flex", fontFamily: "Lato, sans-serif", fontSize: "16px", fontWeight: "600", height: "48px", justifyContent: "center", textDecoration: "none", width: "236px" }}><svg xmlns="http://www.w3.org/2000/svg" style={{ height: "20px", width: "20px", marginRight: "12px" }} viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path></svg>Connect to Slack</Link>
          )}
        </div>
      </div>
    </div>
  );
}
