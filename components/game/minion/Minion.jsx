import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import CARDCLASS from '@/enums/cardClass.enums';
import RACE from '@/enums/race.enums';
import RARITY from '@/enums/rarity.enums';
import SET from '@/enums/set.enums';
import TYPE from '@/enums/type.enums';
import replaceConstant from '@/utils/replace-constants';
import exists from '@/utils/element.exists';
// import useHover from 'react-use-hover';

export default function Minion({
  currentAttack,
  currentHealth,
  totalHealth,
  active,
  artist,
  attack,
  cardClass,
  collectible,
  cost,
  elite,
  entourage,
  flavor,
  goldenImageSrc,
  health,
  hideStats,
  howToEarn,
  howToEarnGolden,
  id,
  isGolden,
  mechanics,
  name,
  playRequirements,
  race,
  rarity,
  set,
  sounds,
  spellContext,
  spellDamage,
  spellType,
  targetingArrowText,
  text,
  type,
  warcryNumber
}) {
  function cardImage(cardId, cardSet, isGold, goldSrc) {
    const set = replaceConstant(cardSet.replace(/(%)/g, ''));
    return isGold
      ? `url(${goldSrc})`
      : `/images/sets/${set}/${cardId}-MINION.jpg`;
  }

  return (
    <div
      className={[
        'minion',
        `minion__race--${replaceConstant(race).toLowerCase()}`,
        currentHealth < totalHealth ? '--is-damaged' : '',
        currentHealth === 0 ? '--is-dead' : ''
      ].join(' ')}
    >
      {/* <div className={'info-trigger'} {...hoverProps} /> */}
      <div className={'image-wrapper'}>
        {id && set ? (
          <Img
            alt={name}
            className={'card__image'}
            decode={false}
            src={cardImage(id, set, isGolden, goldenImageSrc)}
            loader={<div className="loader" />}
            unloader={<img alt="" src="/images/sets/PLACEHOLDER.jpg" />}
          />
        ) : null}
      </div>
      <div className={'attack-wrapper'} data-value={currentAttack}>
        <div className={'text__value'}>{currentAttack}</div>
        {elite ? (
          <img
            alt=""
            className={`minion__attack__badge__elite`}
            src={`/images/card-assets/ic_sword-alt.png`}
          />
        ) : (
          <img
            alt=""
            className={`minion__attack__badge`}
            src={`/images/card-assets/ic_sword.png`}
          />
        )}
      </div>
      <div className={'health-wrapper'} data-value={currentHealth}>
        <div className={'text__value'}>{currentHealth}</div>
        {elite ? (
          <img
            alt=""
            className={`minion__health__badge__elite`}
            src={`/images/card-assets/ic_shield-alt.png`}
          />
        ) : (
          <img
            alt=""
            className={`minion__health__badge`}
            src={`/images/card-assets/ic_shield.png`}
          />
        )}
      </div>
    </div>
  );
}

Minion.propTypes = {
  active: PropTypes.bool,
  artist: PropTypes.string,
  attack: PropTypes.number,
  cardClass: PropTypes.string,
  collectible: PropTypes.bool,
  cost: PropTypes.number,
  elite: PropTypes.bool,
  entourage: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  goldenImageSrc: PropTypes.string,
  flavor: PropTypes.string,
  health: PropTypes.number,
  hideStats: PropTypes.bool,
  howToEarn: PropTypes.string,
  howToEarnGolden: PropTypes.string,
  id: PropTypes.string,
  imageSrc: PropTypes.string,
  isGolden: PropTypes.bool,
  mechanics: PropTypes.array,
  name: PropTypes.string,
  playRequirements: PropTypes.array,
  race: PropTypes.string,
  rarity: PropTypes.string,
  set: PropTypes.string,
  sounds: PropTypes.shape({
    attackSound: PropTypes.string,
    deathSound: PropTypes.string,
    dropSound: PropTypes.string
  }),
  spellContext: PropTypes.string,
  spellDamage: PropTypes.number,
  spellType: PropTypes.string,
  targetingArrowText: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  warcryNumber: PropTypes.number,
  dynamicSpellDamageText: PropTypes.number,
  onClick: PropTypes.func,
  dev: PropTypes.bool,
  currentAttack: PropTypes.number,
  currentHealth: PropTypes.number,
  totalHealth: PropTypes.number
};

Minion.defaultProps = {
  active: false,
  // card object props
  artist: '',
  attack: 0,
  cardClass: '',
  collectible: true,
  cost: 0,
  elite: false,
  entourage: [],
  flavor: null,
  goldenImageSrc: null,
  health: 1,
  hideStats: false,
  howToEarn: null,
  howToEarnGolden: null,
  id: '',
  imageSrc: '',
  mechanics: [],
  name: '',
  playRequirements: [],
  race: '',
  rarity: RARITY[0],
  set: '',
  sounds: {
    attackSound: null,
    deathSound: null,
    dropSound: null
  },
  spellDamage: 0,
  targetingArrowText: null,
  text: '',
  type: '',
  onClick: () => {},
  dev: false,
  currentAttack: 0,
  currentHealth: 1,
  totalHealth: 1,

  // incoming transformative props
  isGolden: false
};
