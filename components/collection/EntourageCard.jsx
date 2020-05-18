import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import { fontSizeBasedOnCharacterLength } from 'utils/text';
import createMarkup from 'utils/createMarkup';
import TYPE from 'enums/type.enums';
import RACE from 'enums/race.enums';
import replaceDynamicText from 'utils/replace-dynamic-text';
import replaceConstant from 'utils/replace-constants';
import RARITY from '@/enums/rarity.enums';
import exists from '@/utils/element.exists';
import removeSymbols from '@/utils/remove-symbols';

export default function EntourageCard({ data }) {
  const {
    attack,
    cost,
    goldenImageSrc,
    health,
    id,
    isGolden,
    name,
    race,
    rarity,
    set,
    text,
    type,
    warcryNumber,
    spellContext
  } = data;
  const dynamicSpellDamageText = 0;
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
        IS_MINION ? '--is-minion' : '',
        IS_SPELL ? '--is-spell' : '',
        IS_ITEM ? '--is-item' : '',
        IS_WEAPON ? '--is-weapon' : ''
      ].join(' ')}
    >
      <div className={'card__cost'}>
        <div className={'text__value'}>{cost}</div>
      </div>

      <div className={'card__image__wrapper'}>
        {id && set ? (
          <Img
            alt={name}
            className={'card__image'}
            decode={false}
            src={cardImage(id, set, isGolden, goldenImageSrc)}
            unloader={<img alt="" src="/images/sets/PLACEHOLDER.jpg" />}
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
              cardText(text, dynamicSpellDamageText)
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
              src={`images/card-assets/ic_sword.png`}
            />
          </div>
          <div className={'card__health'} data-value={health}>
            <div className={'text__value'}>{health}</div>
            <img
              alt=""
              className={`card__health__badge`}
              src={`images/card-assets/ic_shield.png`}
            />
          </div>
        </React.Fragment>
      )}

      {rarity !== RARITY[0] && rarity !== RARITY[1] ? (
        <img
          alt=""
          className={`card__rarity__gem`}
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
          {IS_WEAPON || spellContext === 'ATTACK' ? (
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

EntourageCard.propTypes = {
  data: PropTypes.object
};
