import React from 'react';
import { Navbar } from 'react-bootstrap';
import { isNil } from 'lodash';
import { useHistory } from 'react-router';
import { leaveRoom } from '../lib/endpoints';

export default function Header({
  auth = {},
  clearAuth,
  sound = null,
  setSound,
}) {
  const history = useHistory();

  // leave current game
  async function leave() {
    try {
      await leaveRoom(auth.roomID, auth.playerID, auth.credentials);
      clearAuth();
      history.push('/');
    } catch (error) {
      console.log('leave error', error);
      clearAuth();
      history.push('/');
    }
  }

  return (
    <header>
      <Navbar
        style={{
          display: 'flex',
        }}
      >
        <Navbar.Brand style={{ position: 'absolute', top: 0, left: 0 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '400px',
            }}
          >
            {/* Removed the image tag */}
          </div>
        </Navbar.Brand>

        <div className="nav-buttons">
          {!isNil(sound) ? (
            <button onClick={() => setSound()}>
              {sound ? 'Turn off sound' : 'Turn on sound'}
            </button>
          ) : null}
          {clearAuth ? (
            <button onClick={() => leave()}>Leave game</button>
          ) : null}
        </div>
      </Navbar>
    </header>
  );
}
