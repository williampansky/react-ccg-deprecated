import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import exists from 'utils/element.exists';

export default function DeckCollection() {
  const decks = useSelector(state => state.decks);
  const decksArray = Object.keys(decks).map(i => decks[i]);

  function badgeSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `assets/images/classes/${str}/BADGE.png`;
  }

  return (
    <Component>
      <h2 className="text__value">Your Decks</h2>
      {decksArray.map((deck, index) => {
        index = index + 1;
        const { name } = deck;
        const deckClass = deck && deck.class;

        return name ? (
          <Link
            className="deck__slot"
            key={index}
            to={{ pathname: `/decks/${index}` }}
          >
            <div className="class__badge--wrapper">
              <img alt="" className="class__badge" src={badgeSrc(deckClass)} />
            </div>
            <div className="text">
              <span className="text__value index">{name}</span>
              <span className="text__value plus">{`Edit Deck`}</span>
            </div>
          </Link>
        ) : (
          <Link
            className="deck__slot"
            key={index}
            to={{ pathname: `/decks/${index}` }}
          >
            <div className="text">
              <span className="text__value index">{index}</span>
              <span className="text__value plus">{`New Deck`}</span>
            </div>
          </Link>
        );
      })}
    </Component>
  );
}

const Component = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 10px 20px 60px;
  user-select: none;

  & > h2 {
    text-align: center;
  }

  .deck__slot {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    min-height: 60px;
    margin: 0;
    padding: 0;
    font-size: 0.875em;
    text-decoration: none;

    &:active,
    &:focus {
      outline: 0;
      text-decoration: none;
    }

    & + .deck__slot {
      margin-top: 20px;
    }

    .plus {
      font-size: 1.15em;
      display: none;
      text-transform: uppercase;
    }

    .text {
      background: rgba(255, 255, 255, 0.015);
      border: 1px dashed rgba(255, 255, 255, 0.25);
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 60px;
      text-decoration: none;
    }

    .class__badge {
      height: 60px;
      &--wrapper {
        margin-right: 20px;
      }
    }

    /* prettier-ignore */
    &:hover {
      .text { border: 1px dashed rgba(255, 255, 255, 0.45); }
      .plus { display: block; }
      .index { display: none; }
    }
  }
`;
