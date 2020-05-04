import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeDeck } from 'features/decks/decks.slice';

export default function DeleteDeckButton() {
  let { deckId } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  function handleClick(id = deckId) {
    dispatch(removeDeck(id));
    history.push(`/`);
  }

  return <Component onClick={() => handleClick()}>Delete Deck</Component>;
}

const Component = styled.button`
  background: #e12845;
  cursor: pointer;
  font-family: 'Carter One', sans-serif;
  border: 0;
  margin: 0 0 0 10px;
  padding: 0 10px;
  text-transform: uppercase;
  white-space: nowrap;
  color: white;
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    0 0 1px black;

  @media (min-width: 1920px) {
    font-size: 0.825em;
  }

  &:hover {
    background: #b6152e;
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;
