import { ThemeEditor } from '../docs/ThemeEditor';
import { Logo } from '../docs/Logo';
import { docs } from '../styles/Docs.css';
import { dark } from '../styles/Theme.css';
import { bg } from '../styles/Website.css';

export function ThemeEditorPage() {
  return (
    <div
      className={`${docs} ${dark} ${bg}`}
      style={{
        display: 'grid',
        gridTemplateRows: '100px calc(100vh - 100px)',
        position: 'fixed',
        height: '100%',
        inset: 0,
      }}
    >
      <div style={{ padding: '40px 28px' }}>
        <Logo />
      </div>
      <ThemeEditor />
    </div>
  );
}
