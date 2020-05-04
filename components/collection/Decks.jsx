import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { newDeck } from 'features/decks/decks.slice';
import { selectClass } from 'features/filters/filters.slice';
import CARDCLASS from 'enums/cardClass.enums';
import exists from 'utils/element.exists';
import DeckSlot from 'features/decks/DeckSlot';

export default function Decks() {
  let { deckId } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const decks = useSelector(state => state.decks);
  const decksArray = Object.keys(decks).map(i => decks[i]);

  function handleClick(string, param = deckId) {
    dispatch(selectClass(string));
    dispatch(
      newDeck({
        deckId: param,
        name: `Deck Slot ${param}`,
        cardClass: string
      })
    );
    history.push(`/decks/${param}`);
  }

  // eslint-disable-next-line no-unused-vars
  function imageSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `url(assets/images/classes/${str}/DEFAULT.jpg)`;
  }

  function badgeSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `assets/images/classes/${str}/BADGE.png`;
  }

  return (
    <React.Fragment>
      <Wrapper>
        <GridWrapper>
          <ClassGrid>
            {decksArray.map((deck, index) => {
              index = index + 1;
              const { name } = deck;
              const deckClass = deck && deck.class;
              return (
                <Link
                  className="deck__slot uk-animation-slide-bottom-small"
                  key={index}
                  style={{ animationDelay: `${index}00ms` }}
                  to={{ pathname: `/decks/${index}` }}
                >
                  <DeckSlot
                    deckClass={deckClass}
                    deckName={name}
                    slotIndex={index}
                  />
                </Link>
              );
            })}
          </ClassGrid>
        </GridWrapper>
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
`;

const GridWrapper = styled.div`
  background: #292928;
  position: fixed;
  top: 80px;
  left: 0;
  padding: 20px;
  bottom: 0;
  overflow-y: auto;
  width: ${p => (p.sidebarActive ? 'calc(100vw - 300px)' : 'calc(100vw)')};
  transition: width 150ms var(--animation-transition-cubic);
`;

const ClassGrid = styled.div`
  display: grid;
  margin: 0 auto;
  padding: 20px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));

  .deck__slot {
    cursor: pointer;
    width: 100%;
    margin: 0 auto;
    text-decoration: none !important;
  }

  .deck__slot .class__name {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    transition: opacity, transform 150ms ease-in-out;
    will-change: opacity, transform;
    margin: 0 auto;
    border-radius: 50%;
    transform: scale(0.5);
    z-index: 1;

    h2 {
      margin: 0;
      position: relative;
      z-index: 1;
    }

    &:after {
      background: rgba(0, 0, 0, 0.45);
      /* content: ''; */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0;
      transition: opacity 150ms ease-in-out;
      will-change: opacity;
      border-radius: 50%;
    }
  }

  .deck__slot .avatar {
    height: 200px;
    width: 200px;
    max-width: 100%;
    image-rendering: pixelated;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin: 0 auto;
  }

  .deck__slot .class__badge--wrapper {
    width: 100%;
    z-index: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    transform: scale(1);
    transition: opacity, transform 150ms ease-in-out;
    will-change: opacity, transform;

    .class__badge {
      width: 100%;
      image-rendering: pixelated;
    }
  }

  .deck__slot:hover {
    .class__name {
      opacity: 1;
      transform: scale(1);
    }

    .class__badge--wrapper {
      opacity: 0.625;
      transform: scale(0.925);
    }
  }
`;
