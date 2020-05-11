import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { HSclone } from 'lib/game';
import GameWrapper from 'components/game/game-wrapper/GameWrapper';
import GameLoading from 'components/game/loading/GameLoading';

const REDUX_DEVTOOLS =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const HScloneClient = Client({
  game: HSclone,
  board: GameWrapper,
  loading: GameLoading,
  debug: true,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  enhancer: REDUX_DEVTOOLS
});

class App extends React.Component {
  state = {
    playerID: null,
    playerName: null,
    deck: []
  };

  componentDidMount() {
    const {
      location: { href }
    } = window;

    href.includes('3002')
      ? this.setState({ playerID: '1' })
      : this.setState({ playerID: '0' });

    if (localStorage.getItem('playerName'))
      this.setState({ playerName: localStorage.getItem('playerName') });

    if (localStorage.getItem('deck'))
      this.setState({ deck: JSON.parse(localStorage.getItem('deck')) });
  }

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: '0' })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: '1' })}>
            Player 1
          </button>
        </div>
      );
    }

    return (
      <React.Fragment>
        <HScloneClient
          playerID={this.state.playerID}
          playerName={this.state.playerName}
        />
      </React.Fragment>
    );
  }
}

export default App;
