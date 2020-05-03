import React from 'react';
import RenderCompleted from '../../components/isMounted';
import { Lobby } from 'boardgame.io/react';
import BoardTicTacToe from '../../components/board';
import GameTicTacToe from '../../components/game';

GameTicTacToe.minPlayers = 1;

const LobbyView = () => {
  const [hostname, Ss] = React.useState();
  const isMounted = RenderCompleted();

  React.useEffect(() => {
    Ss(window.location.hostname);
  }, [isMounted])

  return (
    <div style={{ padding: 50 }}>
      <h1>Lobby</h1>

      <Lobby
        gameServer={`https://test-server-ten.now.sh/:8000`}
        lobbyServer={`https://test-server-ten.now.sh/:8000`}
        gameComponents={[
          { game: GameTicTacToe, board: BoardTicTacToe }
        ]}
      />
    </div>
  )
};

export default LobbyView;