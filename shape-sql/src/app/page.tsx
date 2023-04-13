import c from './page.module.css';

import { cx } from './cx';
import { Nav } from './Nav';

export default function Page() {
  return (
    <>
      <Nav />
      <main className={cx(c.main, c['v-center'])}>
        <div className={cx(c.center, c.spacing)}>
          <h1 style={{ fontSize: 24, lineHeight: '40px' }}>By invitation only.</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)' }}>Contact info@shape.xyz to apply.</p>
        </div>
      </main>
    </>
  );
}
