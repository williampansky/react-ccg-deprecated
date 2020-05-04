import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RARITY from 'enums/rarity.enums';

export default function DeckItem({
  amount,
  backgroundImage,
  cost,
  elite,
  id,
  name,
  rarity,
  set
}) {
  return (
    <Item
      amount={amount}
      backgroundImage={backgroundImage}
      elite={elite}
      cardId={id}
      rarity={rarity}
    >
      <div className={'item__cost'}>
        <div className={'text__value'}>{cost}</div>
        <img alt="" src="assets/images/ic_score.png" />
      </div>
      <div className={'item__info'}>
        <div className={'item__name'}>
          <div className={'text__value'}>{name}</div>
        </div>
        {amount === 2 ? (
          <div className={'item__amount'}>
            <div className={'text__value'}>{amount}</div>
          </div>
        ) : null}
        {elite === true ? (
          <div className={'item__amount'}>
            <div className={'text__value'}>Elite</div>
          </div>
        ) : null}
      </div>
      <div className={'item__image'} />
    </Item>
  );
}

DeckItem.propTypes = {
  amount: PropTypes.number,
  backgroundImage: PropTypes.string,
  cost: PropTypes.number,
  elite: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  rarity: PropTypes.string,
  set: PropTypes.string
};

function rarityColor(string) {
  switch (string) {
    case RARITY[5]:
      return '#fa2618';
    case RARITY[4]:
      return '#dd4af2';
    case RARITY[3]:
      return '#33fa17';
    case RARITY[2]:
      return '#26d3f5';
    default:
      return '#7f827f';
  }
}

const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 35px;
  position: relative;
  user-select: none;
  font-family: 'Carter One', sans-serif;
  width: 100%;
  font-size: 14px;
  z-index: 1;
  opacity: ${p => (p.amount === 0 ? '0.35' : 1)};
  pointer-events: none;
  border-left: 4px solid;
  border-color: ${p => rarityColor(p.rarity)};

  .item__cost {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin: 0 10px 0;
    z-index: 1;
  }

  .item__cost .text__value {
    font-size: 0.875em;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .item__cost img {
    height: 30px;
  }

  .item__info {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px 0;
    width: 100%;
  }

  .item__name {
    font-size: 1em;
    position: relative;
    z-index: 1;
  }

  .item__amount {
    font-size: 1em;
    position: relative;
    z-index: 1;
  }

  .item__image {
    background-image: ${p => `${p.backgroundImage}`};
    background-position: top right;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 0;
  }
`;
