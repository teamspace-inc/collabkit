import { ThemeEditor } from '../docs/ThemeEditor';
import { docs } from '../styles/Docs.css';
import { dark } from '../styles/Theme.css';

export function ThemeEditorPage() {
  return (
    <div className={`${docs} ${dark}`} style={{ display: 'flex', flex: 1 }}>
      <ThemeEditor />
    </div>
  );
}
