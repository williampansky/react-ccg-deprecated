import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { newDeck } from 'features/decks/decks.slice';
import { selectClass } from 'features/filters/filters.slice';
import CARDCLASS from 'enums/cardClass.enums';
import exists from 'utils/element.exists';
import { toggleSiteSidebar } from '@/features/site-sidebar/site-sidebar.slice';
// import Filters from 'features/filters/Filters.container';

export default function ChooseClass({ deckId }) {
  // let history = useHistory();
  const dispatch = useDispatch();
  const { availableCardClasses } = useSelector(state => state.filters);
  const { selectedCardClass } = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(toggleSiteSidebar());
  }, [dispatch]);

  function handleClick(string, param = deckId) {
    dispatch(selectClass(string));
    dispatch(
      newDeck({
        deckId: param,
        name: `Deck Slot ${param}`,
        cardClass: string
      })
    );
    // history.push(`/decks/${param}`);
  }

  // eslint-disable-next-line no-unused-vars
  function imageSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `url(/images/classes/${str}/DEFAULT.jpg)`;
  }

  function badgeSrc(string) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    return `/images/classes/${str}/BADGE.png`;
  }

  return (
    <React.Fragment>
      <div className="choose__class">
        {availableCardClasses
          .filter(obj => obj.value !== CARDCLASS[0])
          .map((obj, idx) => {
            const { label, value } = obj;
            return (
              <div
                className="class__item magictime puffIn"
                key={idx}
                onClick={() => handleClick(value, deckId)}
              >
                {/* <div
                      className="avatar"
                      style={{ backgroundImage: imageSrc(value) }}
                    /> */}
                <div className="class__name">
                  <h2 className="text__value">{label}</h2>
                </div>
                <div className="class__badge--wrapper">
                  <img alt="" className="class__badge" src={badgeSrc(value)} />
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}

ChooseClass.propTypes = {
  selectedCardClass: PropTypes.string
};

ChooseClass.defaultProps = {
  selectedCardClass: CARDCLASS[5]
};
