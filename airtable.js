/* eslint-disable array-callback-return */
import GAME_CONFIG from './config/game.config';
require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const Airtable = require('airtable-node');

const APIKEY = process.env.AIRTABLE_API_KEY;
const base = new Airtable({ apiKey: APIKEY }).base('appP9UrOufNDMKpfm');

function createArtistLink(name, url) {
  if (!name || !url) return null;
  if (!name && url) return url;
  if (name && !url) return name;
  return `<a href="${url}" rel="noopener noreferrer" target="_blank">${name}</a>`;
}

function parseCardClass(string) {
  if (!string) return;
  return string.replace(/([0-9] )/g, '');
}

function parseCardEntourage(string) {
  if (!string || typeof string === 'undefined') return [];
  const noWhiteSpace = string.replace(/\s/g, '');
  const array = noWhiteSpace.split(',');
  return array;
}

function parseCardMechanics(array) {
  if (!GAME_CONFIG.debugData.enableMechanics) return '';
  return array ? array : [];
}

function parseCardName(string1, string2) {
  return string1 ? string1 : string2;
}

function parseCardText(string) {
  if (!GAME_CONFIG.debugData.enableText) return '';
  return string;
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
          description,

          // required for react-select pkg
          key: symbol,
          value: name
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
      const { name, symbol, description, shortDescription } = fields;

      return {
        [symbol]: {
          name,
          symbol,
          type: 'MECHANIC',
          description,
          shortDescription,

          // required for react-select pkg
          key: symbol,
          value: name
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
        ability1,
        ability2,
        ability3,
        active,
        archetype,
        artistName,
        artistUrl,
        lore,
        name,
        slug,
        shortDescription,
        symbol
      } = fields;

      return {
        [symbol]: {
          ability1,
          ability2,
          ability3,
          active,
          archetype,
          artist: createArtistLink(artistName, artistUrl),
          lore,
          name,
          slug,
          shortDescription,
          symbol,

          // required for react-select pkg
          key: symbol,
          value: name
        }
      };
    });

    const heros = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./enums/HEROS.json', heros);
  });

// ABILITIES
base
  .table('ABILITIES')
  .list({
    maxRecords: 200
  })
  .then(resp => {
    const map = resp.records.map(item => {
      const { fields } = item;
      const {
        active,
        artistName,
        artistUrl,
        cooldown,
        cost,
        description,
        entourage,
        flavor,
        health,
        hero,
        howToEarnGolden,
        id,
        mechanics,
        name,
        numberPrimary,
        numberRNG,
        numberSecondary,
        playContext,
        playType,
        targetingArrowText,
        text,
        type,
        ultimate
      } = fields;

      return {
        [id]: {
          active,
          artist: createArtistLink(artistName, artistUrl),
          cooldown,
          cost,
          description,
          entourage: parseCardEntourage(entourage),
          flavor,
          health,
          howToEarnGolden,
          id,
          mechanics: parseCardMechanics(mechanics),
          name: parseCardName(name, id),
          numberPrimary,
          numberRNG,
          numberSecondary,
          playContext,
          playType,
          targetingArrowText,
          text: parseCardText(text),
          type,
          ultimate,

          // required for react-select pkg
          key: hero,
          value: name
        }
      };
    });

    const abilities = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./enums/ABILITIES.json', abilities);
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
          text: GAME_CONFIG.debugData.enableText ? text : '',

          // required for react-select pkg
          key: id,
          value: name
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
        active,
        artistName,
        artistUrl,
        attack,
        cardClass,
        collectible,
        cost,
        description,
        elite,
        entourage,
        flavor,
        health,
        howToEarn,
        howToEarnGolden,
        id,
        mechanics,
        name,
        numberOvercharge,
        numberPrimary,
        numberRNG,
        numberSecondary,
        playContext,
        playType,
        race,
        rarity,
        set,
        targetingArrowText,
        text,
        type
      } = fields;

      if (!id) return;

      return {
        [id]: {
          active,
          artist: createArtistLink(artistName, artistUrl),
          attack,
          cardClass: parseCardClass(cardClass),
          collectible,
          cost,
          description,
          elite,
          entourage: parseCardEntourage(entourage),
          flavor,
          health,
          howToEarn,
          howToEarnGolden,
          mechanics: parseCardMechanics(mechanics),
          id,
          name: parseCardName(name, id),
          numberOvercharge,
          numberPrimary,
          numberRNG,
          numberSecondary,
          playContext,
          playType,
          race,
          rarity,
          set,
          targetingArrowText,
          text: parseCardText(text),
          type,

          // required for react-select pkg
          key: id,
          value: name
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
        active,
        artistName,
        artistUrl,
        attack,
        cardClass,
        collectible,
        cost,
        description,
        elite,
        entourage,
        flavor,
        health,
        howToEarn,
        howToEarnGolden,
        id,
        mechanics,
        name,
        numberOvercharge,
        numberPrimary,
        numberRNG,
        numberSecondary,
        playContext,
        playType,
        race,
        rarity,
        set,
        targetingArrowText,
        text,
        type
      } = fields;

      if (!id) return;

      return {
        [id]: {
          active,
          artist: createArtistLink(artistName, artistUrl),
          attack,
          cardClass: parseCardClass(cardClass),
          collectible,
          cost,
          description,
          elite,
          entourage: parseCardEntourage(entourage),
          flavor,
          health,
          howToEarn,
          howToEarnGolden,
          id,
          mechanics: parseCardMechanics(mechanics),
          name: parseCardName(name, id),
          numberOvercharge,
          numberPrimary,
          numberRNG,
          numberSecondary,
          playContext,
          playType,
          race,
          rarity,
          set,
          targetingArrowText,
          text: parseCardText(text),
          type,

          // required for react-select pkg
          key: id,
          value: name
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
        active,
        artistName,
        artistUrl,
        attack,
        cardClass,
        collectible,
        cost,
        description,
        elite,
        flavor,
        health,
        howToEarn,
        howToEarnGolden,
        id,
        isEntourage,
        mechanics,
        name,
        numberOvercharge,
        numberPrimary,
        numberRNG,
        numberSecondary,
        playContext,
        playType,
        race,
        rarity,
        set,
        targetingArrowText,
        text,
        type
      } = fields;

      if (!id) return;

      return {
        [id]: {
          active,
          artist: createArtistLink(artistName, artistUrl),
          attack,
          cardClass: parseCardClass(cardClass),
          collectible,
          cost,
          description,
          elite,
          flavor,
          health,
          howToEarn,
          howToEarnGolden,
          id,
          isEntourage,
          mechanics: parseCardMechanics(mechanics),
          name: parseCardName(name, id),
          numberOvercharge,
          numberPrimary,
          numberRNG,
          numberSecondary,
          playContext,
          playType,
          race,
          rarity,
          set,
          targetingArrowText,
          text: parseCardText(text),
          type,

          // required for react-select pkg
          key: id,
          value: name
        }
      };
    });

    const cards = JSON.stringify(Object.assign({}, ...map));
    fs.writeFileSync('./data/cards/cards-ENTOURAGE.json', cards);
  });
