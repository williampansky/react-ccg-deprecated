import React from 'react';
import PropTypes from 'prop-types';
import replaceConstant from '@/utils/replace-constants';
import RARITY from '@/enums/rarity.enums';

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

  return (
    <div
      className="deck__item"
      data-amount={amount}
      data-elite={elite}
      data-cardid={id}
      style={{ borderColor: rarityColor(rarity) }}
    >
      <div className={'item__cost'}>
        <div className={'text__value'}>{cost}</div>
        <img alt="" src="/images/card-assets/ic_score.png" />
      </div>
      <div className={'item__info'}>
        <div className={'item__name'}>
          <div className={'text__value'}>{replaceConstant(name)}</div>
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
      <div
        className={'item__image'}
        style={{ backgroundImage: backgroundImage }}
      />
    </div>
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
