// import path from 'path';
// const express = require('express');
import { Server } from 'boardgame.io/server';
import TicTacToe from './components/game.js';
// const Server = require('boardgame.io/server').Server;
// const TicTacToe = require('./components/game.js').TicTacToe;

const PORT = process.env.PORT || 8000;
const server = Server({ games: [TicTacToe] });

server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});