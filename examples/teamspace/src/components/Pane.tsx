import { Z } from 'state/constants';

type PaneProps = { children: React.ReactNode; onClose: () => void };

export function Pane({ children, onClose }: PaneProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: Z.PANE,
        width: 440,
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {children}
    </div>
  );
}
