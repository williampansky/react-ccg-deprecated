import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import createMarkup from '@/utils/createMarkup';
import exists from '@/utils/element.exists';
import formatCardText from '@/utils/format-card-text';
import removeSymbols from '@/utils/remove-symbols';
import replaceConstant from '@/utils/replace-constants';
import { fontSizeBasedOnCharacterLength } from '@/utils/text';
import RACE from '@/enums/race.enums';
import RARITY from '@/enums/rarity.enums';
import TYPE from '@/enums/type.enums';

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
  playContext,
  spellDamage,
  playType,
  targetingArrowText,
  text,
  type,
  numberOvercharge,
  numberPrimary,
  numberSecondary,
  numberRNG,
  dynamicSpellDamageText,
  onClick,
  dev
}) {
  const NAME = replaceConstant(name);
  const IS_MINION = type === TYPE[1] ? true : false;
  const IS_ITEM = type === TYPE[2] ? true : false;
  const IS_SPELL = type === TYPE[3] ? true : false;
  const IS_WEAPON = type === TYPE[4] ? true : false;

  function cardImage(cardId, cardSet, isGold) {
    const set = replaceConstant(cardSet.replace(/(%)/g, ''));
    return isGold
      ? `/images/sets/${set}/${cardId}-CARD-GOLDEN.jpg`
      : `/images/sets/${set}/${cardId}-CARD.jpg`;
  }

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
        <Img
          alt={name}
          className={'card__image'}
          decode={false}
          src={cardImage(id, set, isGolden)}
          loader={<div className="loader" />}
          unloader={
            <img
              alt=""
              className={'card__image'}
              src="/images/sets/PLACEHOLDER.jpg"
            />
          }
        />
      </div>

      {name ? (
        <div className={'card__name'}>
          <div
            className={'text__value'}
            style={{ fontSize: `${fontSizeBasedOnCharacterLength(NAME)}em` }}
          >
            {NAME}
          </div>
        </div>
      ) : null}

      {text ? (
        <div className={'card__text'}>
          <p
            className={'text__value'}
            dangerouslySetInnerHTML={createMarkup(
              formatCardText(
                text,
                numberPrimary,
                numberSecondary,
                dynamicSpellDamageText
              )
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
          <div
            className={[
              'card__attack',
              elite ? 'card__attack__elite' : ''
            ].join(' ')}
            data-value={attack}
          >
            <div className={'text__value'} data-value={attack}>
              {attack}
            </div>
            {elite ? (
              <img
                alt=""
                className={`card__attack__badge__elite`}
                src={`/images/card-assets/ic_sword-alt.png`}
              />
            ) : (
              <img
                alt=""
                className={`card__attack__badge`}
                src={`/images/card-assets/ic_sword.png`}
              />
            )}
          </div>
          <div
            className={[
              'card__health',
              elite ? 'card__health__elite' : ''
            ].join(' ')}
            data-value={health}
          >
            <div className={'text__value'} data-value={health}>
              {health}
            </div>
            {elite ? (
              <img
                alt=""
                className={`card__health__badge__elite`}
                src={`/images/card-assets/ic_shield-alt.png`}
              />
            ) : (
              <img
                alt=""
                className={`card__health__badge`}
                src={`/images/card-assets/ic_shield.png`}
              />
            )}
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
          <div className={`card__type__image__icon__wrapper`}>
            <img
              alt=""
              className={`card__type__image`}
              src={`/images/card-assets/TYPE_${replaceConstant(
                type
              ).toUpperCase()}.png`}
            />
          </div>
          {IS_WEAPON || playContext === '%DAMAGE%' ? (
            <img
              alt=""
              className={`card__type__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
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

      {exists(race) && race !== RACE[0] && IS_MINION ? (
        <div className={`card__subtype__image__wrapper`}>
          <div className={`card__subtype__image__icon__wrapper`}>
            <img
              alt=""
              className={`card__subtype__image`}
              src={`/images/card-assets/SUBTYPE_${removeSymbols(
                race
              ).toUpperCase()}.png`}
            />
          </div>
          {IS_WEAPON || playContext === '%DAMAGE%' ? (
            <img
              alt=""
              className={`card__subtype__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          ) : (
            <img
              alt=""
              className={`card__subtype__image__badge`}
              src={`/images/card-assets/Card_Type_Board.png`}
            />
          )}
        </div>
      ) : null}

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
  playContext: PropTypes.string,
  spellDamage: PropTypes.number,
  playType: PropTypes.string,
  targetingArrowText: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  numberOvercharge: PropTypes.number,
  numberPrimary: PropTypes.number,
  numberSecondary: PropTypes.number,
  numberRNG: PropTypes.number,
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
  numberOvercharge: 0,
  numberPrimary: 0,
  numberSecondary: 0,
  numberRNG: 0,
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
