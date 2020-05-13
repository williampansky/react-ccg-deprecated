/* eslint-disable array-callback-return */
import GAME_CONFIG from './config/game.config';
require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const Airtable = require('airtable-node');

const APIKEY = process.env.AIRTABLE_API_KEY;
const base = new Airtable({ apiKey: APIKEY }).base('appP9UrOufNDMKpfm');

function parseCardClass(string) {
  if (!string) return;
  return string.replace(/([0-9] )/g, '');
}

// CONSTANTS
base
  .table('CONSTANTS')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const { name, symbol, type, description } = fields;

      return {
        [symbol]: {
          name,
          symbol,
          type,
          description
        }
      };
    });

    const constants = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./enums/CONSTANTS.json', constants);
  });

// MECHANICS
base
  .table('MECHANICS')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const { name, symbol, description } = fields;

      return {
        [symbol]: {
          name,
          symbol,
          type: 'MECHANIC',
          description
        }
      };
    });

    const mechanics = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./enums/MECHANICS.json', mechanics);
  });

// HEROS
base
  .table('HEROS')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const {
        name,
        symbol,
        archetype,
        ability1,
        ability2,
        ability3,
        lore,
        artist,
        slug
      } = fields;

      return {
        [symbol]: {
          name,
          symbol,
          archetype,
          ability1,
          ability2,
          ability3,
          lore,
          artist,
          slug
        }
      };
    });

    const heros = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./enums/HEROS.json', heros);
  });

// CORE
base
  .table('GAME')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const { artist, cardClass, id, mechanics, name, text } = fields;

      if (!id) return;

      return {
        [id]: {
          ...fields,
          artist: artist ? artist : null,
          cardClass: parseCardClass(cardClass),
          mechanics: GAME_CONFIG.debugData.enableMechanics
            ? mechanics
              ? mechanics
              : []
            : '',
          name: name,
          text: GAME_CONFIG.debugData.enableText ? text : ''
        }
      };
    });

    const cards = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./data/cards/cards-GAME.json', cards);
  });

// CORE
base
  .table('CORE')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const {
        artist,
        cardClass,
        id,
        inspiration,
        mechanics,
        name,
        text
      } = fields;

      if (!id) return;

      return {
        [id]: {
          ...fields,
          artist: artist ? artist : null,
          cardClass: parseCardClass(cardClass),
          mechanics: GAME_CONFIG.debugData.enableMechanics
            ? mechanics
              ? mechanics
              : []
            : '',
          name: name ? name : inspiration,
          text: GAME_CONFIG.debugData.enableText ? text : ''
        }
      };
    });

    const cards = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./data/cards/cards-CORE.json', cards);
  });

// PRIME
base
  .table('PRIME')
  .list({
    maxRecords: 300
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const {
        artist,
        cardClass,
        id,
        inspiration,
        mechanics,
        name,
        text
      } = fields;

      if (!id) return;

      return {
        [id]: {
          ...fields,
          artist: artist ? artist : null,
          cardClass: parseCardClass(cardClass),
          mechanics: GAME_CONFIG.debugData.enableMechanics
            ? mechanics
              ? mechanics
              : []
            : '',
          name: name ? name : inspiration,
          text: GAME_CONFIG.debugData.enableText ? text : ''
        }
      };
    });

    const cards = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./data/cards/cards-PRIME.json', cards);
  });

// ENTOURAGE
base
  .table('ENTOURAGE')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const {
        artist,
        cardClass,
        id,
        inspiration,
        mechanics,
        name,
        text
      } = fields;

      if (!id) return;

      return {
        [id]: {
          ...fields,
          artist: artist ? artist : null,
          cardClass: parseCardClass(cardClass),
          mechanics: GAME_CONFIG.debugData.enableMechanics
            ? mechanics
              ? mechanics
              : []
            : '',
          name: name ? name : inspiration,
          text: GAME_CONFIG.debugData.enableText ? text : ''
        }
      };
    });

    const cards = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./data/cards/cards-ENTOURAGE.json', cards);
  });
