import React from 'react';
import PropTypes from 'prop-types';
import { fontSizeBasedOnCharacterLength } from 'utils/text';
import createMarkup from 'utils/createMarkup';
import TYPE from 'enums/type.enums';
import RACE from 'enums/race.enums';
import replaceDynamicText from 'utils/replace-dynamic-text';
import replaceConstant from 'utils/replace-constants';
import RARITY from '@/enums/rarity.enums';
import formatCardText from '@/utils/format-card-text';

export default function Card({
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
  dynamicSpellDamageText,
  onClick,
  dev
}) {
  const IS_MINION = type === TYPE[1] ? true : false;
  const IS_ITEM = type === TYPE[2] ? true : false;
  const IS_SPELL = type === TYPE[3] ? true : false;
  const IS_WEAPON = type === TYPE[4] ? true : false;
  const SPELL_DMG = warcryNumber || dynamicSpellDamageText;

  function cardImage(cardId, cardSet, isGold, goldSrc) {
    const set = replaceConstant(cardSet.replace(/(%)/g, ''));
    return isGold
      ? `url(${goldSrc})`
      : `/images/sets/${set}/${cardId}-CARD.jpg`;
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
        {id && set ? (
          <img
            alt={name}
            className={'card__image'}
            src={cardImage(id, set, isGolden, goldenImageSrc)}
          />
        ) : null}
      </div>

      {name ? (
        <div className={'card__name'}>
          <div className={'text__value'} style={fontSize}>
            {name}
          </div>
        </div>
      ) : null}

      {text ? (
        <div className={'card__text'}>
          <p
            className={'text__value'}
            dangerouslySetInnerHTML={createMarkup(
              formatCardText(text, SPELL_DMG)
            )}
          />
        </div>
      ) : null}

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

      {rarity !== RARITY[0] && rarity !== RARITY[1] ? (
        <img
          alt=""
          className={`card__rarity__gem`}
          data-rarity={rarity.toUpperCase()}
          src={`/images/gems/Gem_Rarity_${replaceConstant(
            rarity
          ).toUpperCase()}.png`}
        />
      ) : null}

      {type ? (
        <div className={`card__type__image__wrapper`}>
          <img
            alt=""
            className={`card__type__image`}
            src={`/images/card-assets/TYPE_${replaceConstant(
              type
            ).toUpperCase()}.png`}
          />
          {IS_WEAPON || spellContext === 'ATTACK' ? (
            <img
              alt=""
              className={`card__type__image__badge`}
              src={`/images/card-assets/Card_Type_Board-Spiked.png`}
            />
          ) : (
            <img
              alt=""
              className={`card__type__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          )}
        </div>
      ) : null}

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

      {IS_MINION || IS_WEAPON ? (
        <img
          alt=""
          className={`card__base__image`}
          src={`/images/cards/front/${replaceConstant(
            rarity
          ).toUpperCase()}.png`}
        />
      ) : (
        <img
          alt=""
          className={`card__base__image`}
          src={`/images/cards/front/${replaceConstant(
            rarity
          ).toUpperCase()}-ALT.png`}
        />
      )}
    </div>
  );
}

Card.propTypes = {
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
  dev: PropTypes.bool
};

Card.defaultProps = {
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

  // incoming transformative props
  isGolden: false
};
