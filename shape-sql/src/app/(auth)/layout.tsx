'use client';
import { UserButton } from '@clerk/nextjs';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div style={{ position: 'fixed', top: 12, right: 12 }}>
        <UserButton />
      </div>
      {children}
    </div>
  );
}
