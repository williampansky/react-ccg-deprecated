import React from 'react';
import RenderCompleted from '../../components/isMounted';
import { Lobby } from 'boardgame.io/react';
import BoardTicTacToe from '../../components/board';
import GameTicTacToe from '../../components/game';
import { Helmet } from 'react-helmet';
import TheSiteHeader from '@/features/site-header/TheSiteHeader';
import TheSiteMobileMenu from '@/features/site-mobile-menu/TheSiteMobileMenu';

GameTicTacToe.minPlayers = 1;

const LobbyView = () => {
  const [hostname, Ss] = React.useState();
  const isMounted = RenderCompleted();

  React.useEffect(() => {
    Ss(window.location.hostname);
  }, [isMounted]);

  return (
    <React.Fragment>
      <Helmet
        title="Play | HSclone"
        meta={[{ property: 'og:title', content: 'Play' }]}
      />
      <TheSiteHeader />
      <main className="site__wrapper">
        <Lobby
          gameServer={`http://${hostname}:8000`}
          lobbyServer={`http://${hostname}:8000`}
          gameComponents={[{ game: GameTicTacToe, board: BoardTicTacToe }]}
        />
      </main>
      <TheSiteMobileMenu />
    </React.Fragment>
  );
};

export default LobbyView;
