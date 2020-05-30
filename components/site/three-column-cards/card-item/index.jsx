import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import styles from './styles.module.scss';
import replaceConstant from '@/utils/replace-constants';

export default function CardItem({ imgAlt, imgId, imgSet, text, title }) {
  function cardImage(cardId, cardSet) {
    if (!cardId || !cardSet) return;
    const set = replaceConstant(cardSet.replace(/(%)/g, ''));
    return `/images/sets/${set}/${cardId}-CARD.jpg`;
  }

  return (
    <article className={styles['component']}>
      <div className={styles['frame']}>
        <div>
          <div className={styles['inner__wrapper']}>
            <figure className={styles['image__wrapper']}>
              <Img
                alt={imgAlt}
                className={styles['image']}
                decode={false}
                src={cardImage(imgId, imgSet)}
                loader={<div className={styles['loader']} />}
                unloader={
                  <img
                    alt=""
                    className={styles['image']}
                    src="/images/sets/PLACEHOLDER.jpg"
                  />
                }
              />
            </figure>
            <div className={styles['content__wrapper']}>
              <h1 className={styles['title']}>
                <span className="text__value">{title}</span>
              </h1>
              <p className={styles['text']}>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

CardItem.propTypes = {
  imgAlt: PropTypes.string,
  imgId: PropTypes.string,
  imgSet: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
};

CardItem.defaultTypes = {
  imgAlt: '',
  imgId: '',
  imgSet: '',
  text: '',
  title: ''
};
