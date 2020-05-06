import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import exists from 'utils/element.exists';

export default function DeckCollection() {
  const decks = useSelector(state => state.decks);
  const decksArray = Object.keys(decks).map(i => decks[i]);

  function badgeSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `/images/classes/${str}/BADGE.png`;
  }

  return (
    <div className="deck__collection">
      <h2 className="text__value">Your Decks</h2>
      {decksArray.map((deck, index) => {
        index = index + 1;
        const { name } = deck;
        const deckClass = deck && deck.class;

        return name ? (
          <Link key={index} href="decks/[id]" as={`/decks/${index}`}>
            <a className="deck__slot" role="button">
              <div className="class__badge--wrapper">
                <img
                  alt=""
                  className="class__badge"
                  src={badgeSrc(deckClass)}
                />
              </div>
              <div className="text">
                <span className="text__value index">{name}</span>
                <span className="text__value plus">{`Edit Deck`}</span>
              </div>
            </a>
          </Link>
        ) : (
          <Link key={index} href="decks/[id]" as={`decks/${index}`}>
            <a className="deck__slot" role="button">
              <div className="text">
                <span className="text__value index">{index}</span>
                <span className="text__value plus">{`New Deck`}</span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
