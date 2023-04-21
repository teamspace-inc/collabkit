'use client';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import styles from '@/app/Nav.module.css';
import { Logo } from '@/app/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className={styles.nav}>
        <Logo size="M" />
        <OrganizationSwitcher />
        <UserButton />
      </nav>
      {children}
    </>
  );
}
