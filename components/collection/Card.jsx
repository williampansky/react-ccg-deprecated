import React from 'react';
import PropTypes from 'prop-types';
import { fontSizeBasedOnCharacterLength } from 'utils/text';
import createMarkup from 'utils/createMarkup';
import TYPE from 'enums/type.enums';
import RACE from 'enums/race.enums';
import replaceDynamicText from 'utils/replace-dynamic-text';
import replaceConstant from 'utils/replace-constants';

export default function Card({
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
  spellDamage,
  spellType,
  targetingArrowText,
  text,
  type,
  warcryNumber,
  dynamicSpellDamageText,
  onClick,
  dev
}) {
  const IS_MINION = type === TYPE[1] ? true : false;
  const IS_ITEM = type === TYPE[2] ? true : false;
  const IS_SPELL = type === TYPE[3] ? true : false;
  const IS_WEAPON = type === TYPE[4] ? true : false;

  function cardImage(cardId, cardSet, isGold, goldSrc) {
    const set = replaceConstant(cardSet.replace(/(%)/g, ''));
    return isGold
      ? `url(${goldSrc})`
      : `/images/sets/${set}/${cardId}-CARD.jpg`;
  }

  function cardText(string, spellDmg = warcryNumber) {
    const replacedDynamicDmg = replaceDynamicText(string, spellDmg);
    const replacedSymbols = replaceConstant(replacedDynamicDmg);
    return replacedSymbols;
  }

  const fontSize = {
    fontSize: `${fontSizeBasedOnCharacterLength(name)}em`
  };

  return (
    <div
      className={[
        'card',
        dev ? 'dev' : '',
        IS_MINION ? '--is-minion' : '',
        IS_SPELL ? '--is-spell' : '',
        IS_ITEM ? '--is-item' : '',
        IS_WEAPON ? '--is-weapon' : ''
      ].join(' ')}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex="0"
    >
      <div className={'card__cost'}>
        <div className={'text__value'}>{cost}</div>
      </div>

      <div className={'card__image__wrapper'}>
        {/* <div
          className={'card__image'}
          style={{
            backgroundImage: cardImage(id, set, isGolden, goldenImageSrc)
          }}
        /> */}
        <img
          alt={name}
          className={'card__image'}
          src={cardImage(id, set, isGolden, goldenImageSrc)}
        />
      </div>

      <div className={'card__name'}>
        <div className={'text__value'} style={fontSize}>
          {name}
        </div>
      </div>

      <div className={'card__text'}>
        <p
          className={'text__value'}
          dangerouslySetInnerHTML={createMarkup(
            cardText(text, dynamicSpellDamageText)
          )}
        />
      </div>

      {IS_MINION ? (
        race !== RACE[0] ? (
          <div className={'card__type'}>
            <div>{replaceConstant(race)}</div>
          </div>
        ) : (
          <div className={'card__type'}>
            <div>{replaceConstant(type)}</div>
          </div>
        )
      ) : (
        <div className={'card__type'}>
          <div>{replaceConstant(type)}</div>
        </div>
      )}

      {(IS_MINION || IS_WEAPON) && (
        <React.Fragment>
          <div className={'card__attack'} data-value={attack}>
            <div className={'text__value'}>{attack}</div>
            <img
              alt=""
              className={`card__attack__badge`}
              src={`/images/card-assets/ic_sword.png`}
            />
          </div>
          <div className={'card__health'} data-value={health}>
            <div className={'text__value'}>{health}</div>
            <img
              alt=""
              className={`card__health__badge`}
              src={`/images/card-assets/ic_shield.png`}
            />
          </div>
        </React.Fragment>
      )}

      <img
        alt=""
        className={`card__rarity__gem`}
        src={`/images/gems/Gem_Rarity_${replaceConstant(
          rarity
        ).toUpperCase()}.png`}
      />

      <div className={`card__type__image__wrapper`}>
        <img
          alt=""
          className={`card__type__image`}
          src={`/images/card-assets/Card_Type--${type.toUpperCase()}.png`}
        />
        <img
          alt=""
          className={`card__type__image__badge`}
          src={`/images/card-assets/Card_Type_Board.png`}
        />
      </div>

      {/* <div className={`card__mechanics__wrapper`}>
        {mechanics.map(m => {
          return (
            <div className="card__mechanic" key={m}>
              <img
                alt=""
                className={`card__mechanic__image`}
                src={`icons/Mechanic-${m.replace(/%/g, '')}.png`}
              />
            </div>
          );
        })}
      </div> */}

      {/* <img
        alt=""
        className={`card__base__image`}
        src={`/card-perf-test4.png`}
      /> */}

      {isGolden ? (
        <img
          alt=""
          className={`card__base__image`}
          src={`/images/cards/front/GOLDEN.png`}
        />
      ) : (
        // <img
        //   alt=""
        //   className={`card__base__image`}
        //   src={cardImage(id, set, isGolden, goldenImageSrc)}
        // />
        <img
          alt=""
          className={`card__base__image`}
          src={`/images/cards/front/${replaceConstant(
            rarity
          ).toUpperCase()}.png`}
        />
      )}
    </div>
  );
}

Card.propTypes = {
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
  spellDamage: PropTypes.number,
  spellType: PropTypes.string,
  targetingArrowText: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  warcryNumber: PropTypes.number,
  dynamicSpellDamageText: PropTypes.number,
  onClick: PropTypes.func,
  dev: PropTypes.bool
};

Card.defaultProps = {
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
  id: 'CORE_001',
  imageSrc: 'images/card-image-placeholder.jpg',
  mechanics: [],
  name: '',
  playRequirements: [],
  race: 'MINION',
  rarity: 'FREE',
  set: '%SET_002%',
  sounds: {
    attackSound: null,
    deathSound: null,
    dropSound: null
  },
  spellDamage: 0,
  targetingArrowText: null,
  text: '',
  type: TYPE[1],
  onClick: () => {},
  dev: false,

  // incoming transformative props
  isGolden: false
};
