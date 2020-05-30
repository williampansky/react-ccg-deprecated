import React, { useState, useEffect, useCallback } from 'react';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import { useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import useResponsive from '@/components/hooks/use-responsive';
import styles from './three-column-cards.module.scss';
import SET from '@/enums/set.enums';
import CardItem from './card-item';

const ThreeColumnCards = () => {
  const database = useSelector(s => s.database);
  const [randomCards, setRandomCards] = useState([]);
  const { isDesktop } = useResponsive();

  const randomCardsCB = useCallback((array, size) => {
    const filteredArray = array
      .filter(item => item.set === SET[1])
      .filter(item => !item.isEntourage);

    let shuffled = filteredArray.slice(0),
      i = filteredArray.length,
      min = i - size,
      temp,
      index;

    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return setRandomCards(shuffled.slice(min));
  }, []);

  useEffect(() => {
    randomCardsCB(database, 3);
  }, [database, randomCardsCB]);

  const content = [
    {
      imgAlt: randomCards[0] && randomCards[0].name,
      imgId: randomCards[0] && randomCards[0].id,
      imgSet: randomCards[0] && randomCards[0].set,
      title: `Collect`,
      text: `Build a collection of powerful cards!`
    },
    {
      imgAlt: randomCards[1] && randomCards[1].name,
      imgId: randomCards[1] && randomCards[1].id,
      imgSet: randomCards[1] && randomCards[1].set,
      title: `Construct`,
      text: `Build a variety of decks out of your collection.`
    },
    {
      imgAlt: randomCards[2] && randomCards[2].name,
      imgId: randomCards[2] && randomCards[2].id,
      imgSet: randomCards[2] && randomCards[2].set,
      title: `Conquer`,
      text: `Defeat your enemies on the web!`
    }
  ];

  return isDesktop ? (
    <div className={styles['component']}>
      <div className={styles['columns__wrapper']}>
        <ul className={styles['columns__list']}>
          {content.map((item, index) => {
            const { imgAlt, imgId, imgSet, text, title } = item;
            return (
              <VisibilitySensor key={title} partialVisibility>
                {({ isVisible }) => (
                  <li
                    className={[
                      styles['columns__item'],
                      isVisible ? 'uk-animation-slide-bottom-medium' : ''
                    ].join(' ')}
                    key={title}
                    style={{ animationDelay: `${index}00ms` }}
                  >
                    <CardItem
                      imgAlt={imgAlt}
                      imgId={imgId}
                      imgSet={imgSet}
                      text={text}
                      title={title}
                    />
                  </li>
                )}
              </VisibilitySensor>
            );
          })}
        </ul>
      </div>
    </div>
  ) : (
    <div className={styles.component}>
      <CarouselProvider
        naturalSlideWidth={310.781}
        naturalSlideHeight={412.953}
        totalSlides={3}
        visibleSlides={1}
        isIntrinsicHeight
        lockOnWindowScroll
      >
        <Slider>
          <Slide index={0}>
            <CardItem
              imgAlt={content[0].imgAlt}
              imgId={content[0].imgId}
              imgSet={content[0].imgSet}
              text={content[0].text}
              title={content[0].title}
            />
          </Slide>
          <Slide index={1}>
            <CardItem
              imgAlt={content[1].imgAlt}
              imgId={content[1].imgId}
              imgSet={content[1].imgSet}
              text={content[1].text}
              title={content[1].title}
            />
          </Slide>
          <Slide index={2}>
            <CardItem
              imgAlt={content[2].imgAlt}
              imgId={content[2].imgId}
              imgSet={content[2].imgSet}
              text={content[2].text}
              title={content[2].title}
            />
          </Slide>
        </Slider>
        <DotGroup />
      </CarouselProvider>
    </div>
  );
};

export default ThreeColumnCards;
