import React from 'react';
import PropTypes from 'prop-types';
import RARITY from '@/enums/rarity.enums';
import replaceConstant from '@/utils/replace-constants';
import styles from './styles.module.scss';

// child components
import MechanicIcon from './elements/mechanic-icon';
import Attack from './elements/attack';
import Health from './elements/health';
import Image from './elements/image';

const Minion = ({
  currentAttack,
  currentHealth,
  totalHealth,
  slot,
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
  warcryNumber,
  hasCurse,
  hasPoison,
  hasOnslaught
}) => {
  /**
   * Returns minion race in lower case format
   * @param {string} race
   */
  function getMinionRaceClass(race) {
    return `minion__race--${replaceConstant(race).toLowerCase()}`;
  }

  return (
    <div
      className={[
        styles.component,
        styles[getMinionRaceClass(race)],
        currentHealth < totalHealth ? styles['--is-damaged'] : '',
        currentHealth === 0 ? styles['--is-dead'] : ''
      ].join(' ')}
    >
      <Image isGolden={isGolden} id={id} name={name} set={set} />
      <Attack currentAttack={currentAttack} elite={elite} />
      <Health
        currentHealth={currentHealth}
        elite={elite}
        isDamaged={currentHealth < totalHealth}
      />
      <MechanicIcon
        hasCurse={hasCurse}
        hasPoison={hasPoison}
        hasOnslaught={hasOnslaught}
      />
    </div>
  );
};

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
  slot: PropTypes.number,
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
  slot: 0,
  currentAttack: 0,
  currentHealth: 1,
  totalHealth: 1,

  // incoming transformative props
  isGolden: false
};

export default Minion;