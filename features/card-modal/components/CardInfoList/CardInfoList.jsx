import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import createMarkup from '@/utils/createMarkup';
import replaceConstant from '@/utils/replace-constants';
import formatUrlString from '@/utils/format-url-string';
import EntourageCard from '@/components/collection/EntourageCard';

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
    rarity,
    set,
    targetingArrowText,
    type
  } = data;

  const TYPE = replaceConstant(type).toUpperCase();
  const SET = replaceConstant(set).toUpperCase();
  const RARITY = replaceConstant(rarity).toUpperCase();
  const DESCRIPTION = createMarkup(replaceConstant(description));

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
              src={`/images/card-assets/TYPE_${TYPE}.png`}
            />
            <span className={styles.uppercase}>{TYPE}</span>
          </span>
        </li>
        <li>
          <strong className="text__value">Set:</strong>{' '}
          <span className={styles.uppercase}>{SET}</span>
        </li>
        <li>
          <strong className="text__value">Rarity:</strong>{' '}
          <span className={styles.icon__wrapper}>
            <img
              alt=""
              className={styles.card__rarity__gem}
              src={`/images/gems/Gem_Rarity_${RARITY}.png`}
            />
            <span className={styles.uppercase}>{RARITY}</span>
          </span>
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
            dangerouslySetInnerHTML={DESCRIPTION}
          />
        </div>
      )}
      {entourage !== null ? (
        database.find(o => o.id === entourage) ? (
          <div className={styles.entourage__card}>
            <p className={styles.entourage__info}>
              <strong className="text__value">Entourage:</strong>{' '}
              <span>{entourage}</span>
            </p>
            <EntourageCard data={database.find(o => o.id === entourage)} />
          </div>
        ) : null
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
