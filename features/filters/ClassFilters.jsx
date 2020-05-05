import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';

const Buttons = ({
  active,
  availableCardClasses,
  selectedCardClass,
  onClick
}) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/decks/:deckId`}>
          <div className="flex">
            <button
              className={active === CARDCLASS[0] ? 'active' : ''}
              onClick={e => onClick(e)}
              value={CARDCLASS[0]}
            >
              <span>{replaceConstant(CARDCLASS[0])}</span>
            </button>
            <button
              className={active === selectedCardClass ? 'active' : ''}
              onClick={e => onClick(e)}
              value={selectedCardClass}
            >
              <span>{replaceConstant(selectedCardClass)}</span>
            </button>
          </div>
        </Route>
        <Route path={`/`}>
          <div className="flex">
            {availableCardClasses
              .map(obj => {
                const { label, value } = obj;
                return (
                  <button
                    className={active === value ? 'active' : ''}
                    key={label}
                    onClick={e => onClick(e)}
                    value={value}
                  >
                    <span>{label}</span>
                  </button>
                );
              })
              .sort((a, b) => a._order - b._order)}
          </div>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

const Selects = ({
  active,
  availableCardClasses,
  selectedCardClass,
  onClick
}) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/decks/:deckId`}>
          <select onChange={e => onClick(e)}>
            <option value={CARDCLASS[0]}>
              {replaceConstant(CARDCLASS[0])}
            </option>
            <option value={selectedCardClass}>
              {replaceConstant(selectedCardClass)}
            </option>
          </select>
        </Route>
        <Route path={`/`}>
          <select onChange={e => onClick(e)}>
            {availableCardClasses
              .map(obj => {
                const { name, value } = obj;
                return (
                  <option key={name} value={value}>
                    {name}
                  </option>
                );
              })
              .sort((a, b) => a._order - b._order)}
          </select>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default function ClassFilters({ active, data, onClick, onChange }) {
  let { deckId } = useParams();
  const isBigScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const decks = useSelector(state => state.decks);
  const deck = decks[deckId];

  return data ? (
    <Component deckId={deckId}>
      {isBigScreen ? (
        <Buttons
          active={active}
          availableCardClasses={data}
          selectedCardClass={deck && deck.class}
          onClick={onClick}
        />
      ) : (
        // <Selects
        //   active={active}
        //   availableCardClasses={data}
        //   selectedCardClass={deck && deck.class}
        //   onClick={onClick}
        // />
        <div className="select-wrapper">
          <Select
            className="select"
            defaultValue={data.find(obj => obj._order === 0)}
            menuPlacement="top"
            onChange={selectedOption => onChange(selectedOption.value)}
            options={data}
            width="100%"
          />
        </div>
      )}
    </Component>
  ) : null;
}

ClassFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

ClassFilters.defaultTypes = {
  data: [],
  onClick: () => {}
};

const Component = styled.div`
  /* width: ${p => (p.deckId ? 'auto' : '100%')}; */
  /* height: 100%; */
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0;
  position: absolute;
  /* background: #444; */
  /* height: 40px; */
  top: -46px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /* padding: 10px; */

  @media (min-width: 1200px) {
    top: -22px;
  }

  @media (min-width: 1440px) {
    top: -26px;
  }

  @media (min-width: 1920px) {
    top: -32px;
  }

  .flex {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  button {
    background: #111;
    cursor: pointer;
    font-family: 'Carter One', sans-serif;
    border: 0;
    margin: 0;
    padding: 0 10px;
    text-transform: uppercase;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    line-height: 2;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    transition: 200ms var(--animation-transition-cubic);
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

    @media (min-width: 1440px) {
      font-size: 0.825em;
    }

    @media (min-width: 1920px) {
      font-size: 1em;
    }
  }

  button span {
    position: relative;
    bottom: -0.5px;
    pointer-events: none;
    opacity: 0.45;
  }

  button + button {
    margin-left: 8px;
  }

  button.active {
    background: #444;
    /* background: #1cbae5; */
  }

  button:hover span {
    opacity: 0.875;
  }

  button.active span {
    opacity: 1;
  }


  button,
  button.active {
    &:active,
    &:focus {
      outline: 0;
    }
  }

  select {
    width: 100%;
  }

  .select-wrapper {
    width: 300px;
  }
`;
