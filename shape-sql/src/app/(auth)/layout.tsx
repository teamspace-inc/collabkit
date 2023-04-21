'use client';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Logo } from '@/app/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          display: 'grid',
          padding: '0 20px',
          alignItems: 'center',
          margin: '0 auto',
          gridTemplateColumns: '6fr 240px 30px',
        }}
      >
        <Logo size="M" />
        <OrganizationSwitcher />
        <UserButton />
      </nav>
      {children}
    </>
  );
}
