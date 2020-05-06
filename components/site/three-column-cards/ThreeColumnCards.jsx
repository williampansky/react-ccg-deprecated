import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Card from '@/components/collection/Card';
import SET from '@/enums/set.enums';
import styles from './three-column-cards.module.scss';
import ItemsCarousel from 'react-items-carousel';
import { useMediaQuery } from 'react-responsive';

const ThreeColumnCards = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const isDesktopOrLaptop = useMediaQuery(
    { minDeviceWidth: 960 },
    { deviceWidth: 960 }
  );

  return isDesktopOrLaptop ? (
    <div className={styles.component}>
      <div className={styles.columns__wrapper}>
        <ul className={styles.columns__list}>
          <li className={styles.columns__item}>
            <article>
              <h3 className="text__value">Collect</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, itaque quas molestias accusantium a nobis tenetur esse
                reprehenderit rerum libero soluta.
              </p>
            </article>
          </li>
          <li className={styles.columns__item}>
            <article>
              <h3 className="text__value">Build</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, itaque quas molestias accusantium a nobis tenetur esse
                reprehenderit rerum libero soluta.
              </p>
            </article>
          </li>
          <li className={styles.columns__item}>
            <article>
              <h3 className="text__value">Destroy</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, itaque quas molestias accusantium a nobis tenetur esse
                reprehenderit rerum libero soluta.
              </p>
            </article>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className={styles.component}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={40}
      >
        <div>
          <article>
            <h3 className="text__value">Collect</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              itaque quas molestias accusantium a nobis tenetur esse
              reprehenderit rerum libero soluta.
            </p>
          </article>
        </div>
        <div>
          <article>
            <h3 className="text__value">Build</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              itaque quas molestias accusantium a nobis tenetur esse
              reprehenderit rerum libero soluta.
            </p>
          </article>
        </div>
        <div>
          <article>
            <h3 className="text__value">Destroy</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              itaque quas molestias accusantium a nobis tenetur esse
              reprehenderit rerum libero soluta.
            </p>
          </article>
        </div>
      </ItemsCarousel>
    </div>
  );
};

export default ThreeColumnCards;
