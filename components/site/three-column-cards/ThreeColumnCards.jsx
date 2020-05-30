import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Card from '@/components/collection/Card';
import SET from '@/enums/set.enums';
import styles from './three-column-cards.module.scss';
import ItemsCarousel from 'react-items-carousel';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import useResponsive from '@/components/hooks/use-responsive';

const ThreeColumnCards = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { isDesktop } = useResponsive();

  return isDesktop ? (
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
      <CarouselProvider
        naturalSlideWidth={317.84}
        naturalSlideHeight={233.03}
        totalSlides={3}
        visibleSlides={1}
        isIntrinsicHeight
        lockOnWindowScroll
      >
        <Slider>
          <Slide index={0}>
            <article>
              <h3 className="text__value">Collect</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, itaque quas molestias accusantium a nobis tenetur esse
                reprehenderit rerum libero soluta.
              </p>
            </article>
          </Slide>
          <Slide index={1}>
            <article>
              <h3 className="text__value">Build</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, itaque quas molestias accusantium a nobis tenetur esse
                reprehenderit rerum libero soluta.
              </p>
            </article>
          </Slide>
          <Slide index={2}>
            <article>
              <h3 className="text__value">Destroy</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, itaque quas molestias accusantium a nobis tenetur esse
                reprehenderit rerum libero soluta.
              </p>
            </article>
          </Slide>
        </Slider>
        <DotGroup />
      </CarouselProvider>
    </div>
  );
};

export default ThreeColumnCards;
