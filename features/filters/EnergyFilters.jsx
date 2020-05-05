import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import EnergySlot from 'components/collection/EnergySlot';

export default function PlayerEnergy({ active, onClick, onChange }) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1200px)' });

  return (
    <Component>
      {isBigScreen ? (
        <div className="flex">
          <EnergySlot
            active={active}
            number={`All`}
            onClick={e => onClick(e)}
            value={-1}
          />

          {Array.from(Array(11)).map((_, index) => {
            return (
              <EnergySlot
                active={active}
                key={index}
                number={index}
                onClick={e => onClick(e)}
                value={index}
              />
            );
          })}
        </div>
      ) : (
        <div className="select-wrapper">
          {/* <div className="label">Energy Cost</div> */}
          <Select
            className="select"
            isClearable
            isSearchable
            menuPlacement="top"
            onChange={selectedOption =>
              selectedOption === null
                ? onChange(-1)
                : onChange(selectedOption.value)
            }
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
              { label: 4, value: 4 },
              { label: 5, value: 5 },
              { label: 6, value: 6 },
              { label: 7, value: 7 },
              { label: 8, value: 8 },
              { label: 9, value: 9 },
              { label: `10+`, value: 10 }
            ]}
            placeholder="Energy Cost"
            width="100%"
          />
        </div>
      )}
    </Component>
  );
}

PlayerEnergy.propTypes = {
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

const Component = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  font-weight: bold;
  justify-content: center;
  margin: 0 10px;
  user-select: none;
  height: 100%;
  width: 100%;

  select {
    width: 100%;
  }

  .flex {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .energy-slot {
    cursor: pointer;
    align-items: center;
    color: #999;
    display: flex;
    flex-flow: column nowrap;
    font-size: 0.875em;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: all 400ms cubic-bezier(0.19, 1, 0.22, 1);
    background: none;
    padding: 0;
    margin: 0;
    border: 0;

    * {
      pointer-events: none;
    }

    & + .energy-slot {
      margin-left: 4px;

      @media (min-width: 1920px) {
        margin-left: 6px;
      }
    }

    &:active,
    &:focus {
      outline: none;
    }
  }

  .energy-slot:before {
    background-size: 400% 100%;
    background: rgba(22, 176, 230, 0.65);
    border-radius: 50%;
    bottom: 0;
    content: '';
    filter: brightness(0.35);
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    transition: all 400ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 100%;
    z-index: 2;
  }

  .energy-slot img {
    height: 30px;
    width: 30px;
    z-index: 1;

    @media (min-width: 1920px) {
      height: 40px;
      width: 40px;
    }
  }

  /* prettier-ignore */
  .energy-slot .text__value--wrapper {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 2;

    & > [data-value='1'] { left: -0.5px; }
  }

  /* prettier-ignore */
  .energy-slot {
    &:nth-child(1), &:nth-child(1):before  { transition-delay: 500ms; }
    &:nth-child(2), &:nth-child(2):before  { transition-delay: 450ms; }
    &:nth-child(3), &:nth-child(3):before  { transition-delay: 400ms; }
    &:nth-child(4), &:nth-child(4):before  { transition-delay: 350ms; }
    &:nth-child(5), &:nth-child(5):before  { transition-delay: 300ms; }
    &:nth-child(6), &:nth-child(6):before  { transition-delay: 250ms; }
    &:nth-child(7), &:nth-child(7):before  { transition-delay: 200ms; }
    &:nth-child(8), &:nth-child(8):before  { transition-delay: 150ms; }
    &:nth-child(9), &:nth-child(9):before  { transition-delay: 100ms; }
    &:nth-child(10), &:nth-child(10):before { transition-delay: 50ms; }
  }

  /* prettier-ignore */
  .energy-slot {
    &.energy-slot--filled:nth-child(1), &.energy-slot--filled:nth-child(1):before   { transition-delay: 0ms; }
    &.energy-slot--filled:nth-child(2), &.energy-slot--filled:nth-child(2):before   { transition-delay: 50ms; }
    &.energy-slot--filled:nth-child(3), &.energy-slot--filled:nth-child(3):before   { transition-delay: 100ms; }
    &.energy-slot--filled:nth-child(4), &.energy-slot--filled:nth-child(4):before   { transition-delay: 150ms; }
    &.energy-slot--filled:nth-child(5), &.energy-slot--filled:nth-child(5):before   { transition-delay: 200ms; }
    &.energy-slot--filled:nth-child(6), &.energy-slot--filled:nth-child(6):before   { transition-delay: 250ms; }
    &.energy-slot--filled:nth-child(7), &.energy-slot--filled:nth-child(7):before   { transition-delay: 300ms; }
    &.energy-slot--filled:nth-child(8), &.energy-slot--filled:nth-child(8):before   { transition-delay: 350ms; }
    &.energy-slot--filled:nth-child(9), &.energy-slot--filled:nth-child(9):before   { transition-delay: 400ms; }
    &.energy-slot--filled:nth-child(10), &.energy-slot--filled:nth-child(10):before { transition-delay: 450ms; }
  }

  .energy-slot .icon {
    height: initial;
    width: 10px;

    svg {
      width: 10px;
      height: initial;
    }

    svg [fill='#000000'] {
      fill: #615e5e;
    }
  }

  .energy-slot.--available {
    color: #999;
    transition: all 400ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .energy-slot.--filled {
    &:before {
      height: 100%;
      opacity: 1;
    }
  }

  .select-wrapper .label {
    color: white;
    text-transform: uppercase;
    font-family: 'Verdana', monospace;
    font-size: 10px;
    margin: 0 0 4px;
    text-align: left;
    font-weight: normal;
  }

  .select-wrapper,
  .select-wrapper .select {
    width: 100%;
    font-weight: normal;
  }

  /* prettier-ignore */
  .energy-slot.--will-cost {
    transition-delay: 0ms !important;
    &:before { animation: blinkBefore 1200ms ease-in-out infinite; }

    @keyframes blinkBefore {
      0%    { opacity: 1; }
      50%   { opacity: 0; }
      100%  { opacity: 1; }
    }
  }
`;
