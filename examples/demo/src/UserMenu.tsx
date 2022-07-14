import { mentionableUsers } from './data';
import { User } from './types';

export function UserMenu({
  user,
  onChangeUser,
}: {
  user: User;
  onChangeUser: (user: User) => void;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        height: 44,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Avatar user={user} />
      <select
        value={user.userId}
        onChange={(e) => {
          onChangeUser(mentionableUsers.find((user) => user.userId === e.currentTarget.value)!);
        }}
        style={{
          position: 'absolute',
          inset: 0,
          fontSize: 0,
          color: 'transparent',
          outline: 'none',
          height: 44,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {mentionableUsers.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.name}
          </option>
        ))}
      </select>
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
