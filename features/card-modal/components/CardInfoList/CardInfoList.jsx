import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import createMarkup from '@/utils/createMarkup';
import replaceConstant from '@/utils/replace-constants';
import EntourageCard from '@/components/collection/EntourageCard';
import RARITY from '@/enums/rarity.enums';
import exists from '@/utils/element.exists';
import RACE from '@/enums/race.enums';
import removeSymbols from '@/utils/remove-symbols';
import replaceDynamicText from '@/utils/replace-dynamic-text';

export default function CardInfoList({ data, database }) {
  const {
    artist,
    collectible,
    description,
    elite,
    entourage,
    howToEarn,
    id,
    numberOvercharge,
    numberPrimary,
    numberSecondary,
    numberRNG,
    playRequirements,
    race,
    rarity,
    set,
    targetingArrowText,
    type
  } = data;

  const CARD_TYPE = replaceConstant(type).toUpperCase();
  const CARD_SUBTYPE = exists(race) && removeSymbols(race).toUpperCase();
  const CARD_RACE = exists(race) && replaceConstant(race).toUpperCase();
  const CARD_SET = replaceConstant(set).toUpperCase();
  const CARD_RARITY = replaceConstant(rarity).toUpperCase();
  const CARD_DESCRIPTION = createMarkup(replaceConstant(description));
  const CARD_NUMBERS =
    numberPrimary || numberSecondary || numberOvercharge || numberRNG;

  return (
    <div className={styles.component}>
      <ul>
        {id && (
          <li>
            <strong className="text__value">ID:</strong> <span>{id}</span>
          </li>
        )}

        {type && (
          <li>
            <strong className="text__value">Type:</strong>{' '}
            <span className={styles.icon__wrapper}>
              <img
                alt=""
                className={styles.card__type__image}
                src={`/images/card-assets/TYPE_${CARD_TYPE}.png`}
              />
              <span className={styles.uppercase}>{CARD_TYPE}</span>
            </span>
          </li>
        )}

        {exists(race) && race !== RACE[0] && (
          <li>
            <strong className="text__value">Race:</strong>{' '}
            <span className={styles.icon__wrapper}>
              <img
                alt=""
                className={styles.card__type__image}
                src={`/images/card-assets/SUBTYPE_${CARD_SUBTYPE}.png`}
              />
              <span className={styles.uppercase}>{CARD_RACE}</span>
            </span>
          </li>
        )}

        {set && (
          <li>
            <strong className="text__value">Set:</strong>{' '}
            <span className={styles.uppercase}>{CARD_SET}</span>
          </li>
        )}

        {rarity && (
          <li>
            <strong className="text__value">Rarity:</strong>{' '}
            {rarity !== RARITY[0] && rarity !== RARITY[1] ? (
              <span className={styles.icon__wrapper}>
                <img
                  alt=""
                  className={styles.card__rarity__gem}
                  src={`/images/gems/Gem_Rarity_${CARD_RARITY}.png`}
                />
                <span className={styles.uppercase}>{CARD_RARITY}</span>
              </span>
            ) : (
              <span className={styles.uppercase}>{CARD_RARITY}</span>
            )}
          </li>
        )}

        {numberPrimary && (
          <li>
            <strong className="text__value">Primary #:</strong>{' '}
            <span>{numberPrimary}</span>
          </li>
        )}

        {numberSecondary && (
          <li>
            <strong className="text__value">Secondary #:</strong>{' '}
            <span>{numberSecondary}</span>
          </li>
        )}

        {numberRNG && (
          <li>
            <strong className="text__value">RNG #:</strong>{' '}
            <span>{numberRNG}</span>
          </li>
        )}

        {numberOvercharge && (
          <li>
            <strong className="text__value">
              {replaceConstant('%OVERLOAD%')} #:
            </strong>{' '}
            <span>{numberOvercharge}</span>
          </li>
        )}

        {playRequirements && (
          <li>
            <strong className="text__value">Play Requirements:</strong>{' '}
            <span>{playRequirements}</span>
          </li>
        )}

        {targetingArrowText && (
          <li>
            <strong className="text__value">Targeting Text:</strong>{' '}
            <span>
              {replaceConstant(
                replaceDynamicText(targetingArrowText, numberPrimary)
              )}
            </span>
          </li>
        )}

        {howToEarn && (
          <li>
            <strong className="text__value">How to Earn:</strong>{' '}
            <span>{howToEarn}</span>
          </li>
        )}

        {collectible && (
          <li>
            <strong className="text__value">Collectible</strong>
          </li>
        )}

        {elite && (
          <li>
            <strong className="text__value">Elite</strong>
          </li>
        )}
      </ul>

      {artist && (
        <div className="artist">
          <strong className="text__value">Artist:</strong>{' '}
          <span dangerouslySetInnerHTML={createMarkup(artist)} />
        </div>
      )}

      {description && (
        <div className={styles.description}>
          <strong className="text__value">Description</strong>{' '}
          <div
            className="description__text"
            dangerouslySetInnerHTML={CARD_DESCRIPTION}
          />
        </div>
      )}

      {exists(entourage) && entourage.length ? (
        <React.Fragment>
          <p className={styles.entourage__info}>
            <strong className="text__value">Entourage:</strong>{' '}
            <span>{entourage.join(', ')}</span>
          </p>
          <div
            className={styles.entourage__card__wrapper}
            data-length={entourage.length}
          >
            {entourage.map(string => {
              const card = database.find(o => o.id === string);
              return exists(card) ? (
                <div className={styles.entourage__card} key={string}>
                  <EntourageCard data={card} />
                </div>
              ) : null;
            })}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

CardInfoList.propTypes = {
  data: PropTypes.object,
  database: PropTypes.array
};

CardInfoList.defaultProps = {
  database: []
};
