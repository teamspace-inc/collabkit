import '../matrix/browser-matrix.min.js';

import { useState, useEffect } from 'react';

import { CollabKitPlayground } from './components/index';
export { CollabKitPlayground };

export function useMatrix() {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    // @ts-expect-error
    const client = matrixcs.createClient('https://matrix.org');
    client.publicRooms(function (err, data) {
      setRooms(data);
    });
  }, []);

  return rooms;
}
