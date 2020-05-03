import React from 'react';
import RenderCompleted from '../../components/isMounted';
import { Lobby } from 'boardgame.io/react';
import { default as BoardTicTacToe } from '../../components/board';
import { default as GameTicTacToe } from '../../components/game';

GameTicTacToe.minPlayers = 1;

const importedGames = [
  { game: GameTicTacToe, board: BoardTicTacToe },
];

const LobbyView = ({ games }) => {
  const [hostname, Ss] = React.useState();
  const isMounted = RenderCompleted();

  React.useEffect(() => {
    Ss(window.location.hostname);
  }, [isMounted])

  return (
    <div style={{ padding: 50 }}>
      <h1>Lobby</h1>

      <Lobby
        gameServer={`http://${hostname}:8000`}
        lobbyServer={`http://${hostname}:8000`}
        gameComponents={games}
      />
    </div>
  )
};

LobbyView.defaultProps = {
  games: importedGames
}

export default LobbyView;