import { CollabKitPlayground, useMatrix } from '@collabkit/react';

import logo from './logo.svg';
import './App.css';

function App() {
  const rooms = useMatrix() as any;

  if (!rooms) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Public rooms:</p>
        <ul>
          {rooms.chunk.slice(0, 10).map((room: any) => (
            <li key={room.room_id}>{room.name}</li>
          ))}
          <li>...and {rooms.total_room_count_estimate - 10} more.</li>
        </ul>
        <h1>components</h1>
        <CollabKitPlayground />
      </header>
    </div>
  );
}

export default App;
