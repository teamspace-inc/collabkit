'use client';
import c from './Nav.module.css';
import { Button } from './Button';
import { Logo } from './Logo';
import { cx } from './cx';
import { useRouter } from 'next/navigation';

export function Nav() {
  const router = useRouter();

  return (
    <nav className={cx(c.nav)}>
      <Logo size="M" />
      <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
    </nav>
  );
}
