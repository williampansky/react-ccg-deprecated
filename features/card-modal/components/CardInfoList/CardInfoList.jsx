import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import createMarkup from '@/utils/createMarkup';
import replaceConstant from '@/utils/replace-constants';
import formatUrlString from '@/utils/format-url-string';
import EntourageCard from '@/components/collection/EntourageCard';
import RARITY from '@/enums/rarity.enums';
import exists from '@/utils/element.exists';
import RACE from '@/enums/race.enums';
import removeSymbols from '@/utils/remove-symbols';

export default function CardInfoList({ data, database }) {
  const {
    artist,
    collectible,
    description,
    elite,
    entourage,
    howToEarn,
    id,
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
  const ENTOURAGE_LENGTH =
    exists(entourage) && entourage.match(/([A-Z])\w+/).length;

  return (
    <div className={styles.component}>
      <ul>
        <li>
          <strong className="text__value">ID:</strong> <span>{id}</span>
        </li>
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
        <li>
          <strong className="text__value">Set:</strong>{' '}
          <span className={styles.uppercase}>{CARD_SET}</span>
        </li>
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

        {playRequirements && (
          <li>
            <strong className="text__value">Play Requirements:</strong>{' '}
            <span>{playRequirements}</span>
          </li>
        )}

        {targetingArrowText && (
          <li>
            <strong className="text__value">Targeting Text:</strong>{' '}
            <span>{replaceConstant(targetingArrowText)}</span>
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
          <a href={artist} target="_blank" rel="noopener noreferrer">
            {formatUrlString(artist)}
          </a>
        </div>
      )}

      {description && (
        <div className="description">
          <strong className="text__value">Description</strong>{' '}
          <div
            className="description__text"
            dangerouslySetInnerHTML={CARD_DESCRIPTION}
          />
        </div>
      )}

      {exists(entourage) ? (
        <React.Fragment>
          <p className={styles.entourage__info}>
            <strong className="text__value">Entourage:</strong>{' '}
            <span>{entourage}</span>
          </p>
          <div className={styles.entourage__card__wrapper}>
            {Array.from(Array(ENTOURAGE_LENGTH)).map((_, index) => {
              index = index + 1;
              const eId = `${id}${(index + 9).toString(36)}`;
              const card = database.find(o => o.id === eId);
              return exists(card) ? (
                <div className={styles.entourage__card} key={eId}>
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
