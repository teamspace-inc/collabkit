import { useState } from 'react';
import { mentionableUsers } from './data';
import { User } from './types';

export function UserMenu({
  user,
  onChangeUser,
}: {
  user: User;
  onChangeUser: (user: User | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        height: 44,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <Avatar user={user} />
      </div>
      {isOpen && (
        <button
          type="button"
          style={{ position: 'absolute', top: 50, width: 100 }}
          onClick={() => onChangeUser(null)}
        >
          Sign out
        </button>
      )}
    </div>
  );
}

function Avatar({ user }: { user: User }) {
  if (!user?.avatar) {
    let initials = '';
    if (user.name) {
      const names = user.name.split(' ');
      if (names.length > 1) {
        initials = names[0][0] + names[names.length - 1][0];
      }
    }
    return (
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rebeccapurple',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {initials}
      </div>
    );
  }
  return <img src={user.avatar} style={{ width: 44, height: 44, borderRadius: '50%' }} />;
}
