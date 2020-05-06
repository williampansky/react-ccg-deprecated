import { createSlice } from '@reduxjs/toolkit';

let decksObj = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {}
};

let initialState = decksObj;

function sortArray(arr) {
  return arr.sort((a, b) => {
    if (a.cost > b.cost) return 1;
    if (a.cost < b.cost) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
}

function calculateDeckLength(array) {
  let amount = 0;
  array.forEach(obj => {
    amount = Math.abs(amount + obj._amount);
  });
  return amount;
}

const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    addCard(state, { payload }) {
      const { deckId, card } = payload;
      const { id } = card;

      if (calculateDeckLength(state[deckId].cards) === 30) return;
      if (state[deckId].cards.find(o => o.id === id && o.elite === true)) {
        return;
      } else if (state[deckId].cards.find(o => o.id === id)) {
        if (state[deckId].cards.find(o => o.id === id && o._amount === 2))
          return;

        const cardObj = state[deckId].cards.find(o => o.id === id);
        const newCardObj = { ...cardObj, _amount: 2 };
        const newArray = state[deckId].cards.filter(o => o.id !== id);
        state[deckId].cards = sortArray([...newArray, newCardObj]);
      } else {
        state[deckId].cards = sortArray([
          ...state[deckId].cards,
          { ...card, _amount: 1 }
        ]);
      }
    },
    editDeckName(state, { payload }) {
      const { deckId, name } = payload;
      state[deckId].name = name;
    },
    newDeck(state, { payload }) {
      const { deckId, name, cardClass } = payload;
      state[deckId] = {
        name,
        class: cardClass,
        cards: []
      };
    },
    removeCard(state, { payload }) {
      const { deckId, cardId } = payload;
      if (state[deckId].cards.find(o => o.id === cardId && o._amount === 1)) {
        const newArray = state[deckId].cards.filter(o => o.id !== cardId);
        state[deckId].cards = sortArray([...newArray]);
      } else {
        const cardObj = state[deckId].cards.find(o => o.id === cardId);
        const newCardObj = { ...cardObj, _amount: 1 };
        const newArray = state[deckId].cards.filter(o => o.id !== cardId);
        state[deckId].cards = sortArray([...newArray, newCardObj]);
      }
    },
    removeDeck(state, { payload }) {
      state[payload] = {};
    }
  }
});

export const {
  addCard,
  editDeckName,
  newDeck,
  removeCard,
  removeDeck
} = decksSlice.actions;

export default decksSlice.reducer;
