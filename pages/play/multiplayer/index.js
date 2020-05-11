import React from 'react';
import { Helmet } from 'react-helmet';
import Game from './Game';

const LobbyView = () => {
  return (
    <React.Fragment>
      <Helmet
        title="Play | Multiplayer | HSclone"
        meta={[{ property: 'og:title', content: 'Play' }]}
      />
      <Game />
    </React.Fragment>
  );
};

export default LobbyView;
