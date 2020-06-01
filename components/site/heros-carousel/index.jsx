import React, { useState, useEffect, useCallback } from 'react';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  DotGroup,
  Slide,
  Slider
} from 'pure-react-carousel';
import { useSelector } from 'react-redux';
import useResponsive from '@/components/hooks/use-responsive';
import Card from '@/components/collection/Card';
import SET from '@/enums/set.enums';
import styles from './styles.module.scss';
import HeroSlideItem from './hero-slide-item';
import exists from '@/utils/element.exists';
import Img from 'react-image';
import ReactTooltip from 'react-tooltip';
import replaceConstant from '@/utils/replace-constants';

const HerosCarousel = () => {
  const heros = useSelector(s => s.heros);
  const abilities = useSelector(s => s.abilities);
  const [currentSlide, setCurrentSlide] = useState(2);
  const [randomHeros, setRandomHeros] = useState([]);
  const [currentHero, setCurrentHero] = useState(null);
  const [contentAnimation, setContentAnimation] = useState(false);
  const { isDesktop } = useResponsive();
  const symbol = currentHero && currentHero.symbol;
  const symbol2 =
    currentHero && currentHero.symbol
      ? currentHero.symbol.replace(/(%)/g, '')
      : '';

  const randomHerosCB = useCallback((array, size) => {
    let shuffled = array.slice(0),
      i = array.length,
      min = i - size,
      temp,
      index;

    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return setRandomHeros(shuffled.slice(min));
  }, []);

  useEffect(() => {
    randomHerosCB(heros, 5);
  }, [heros, randomHerosCB]);

  useEffect(() => {
    setCurrentHero(randomHeros[2]);
  }, [randomHeros, setCurrentHero]);

  const textContent = {
    headline: `Choose your hero`,
    subheadline: `Who will you take to victory?`
  };

  const buttonHandler = useCallback(
    event => {
      const { target } = event;
      const attr = target.getAttribute('aria-label');
      if (!target || !exists(attr)) return;
      target.blur();

      if (attr === 'previous') {
        setCurrentSlide(currentSlide - 1);
        setContentAnimation(false);
        return setTimeout(() => {
          setContentAnimation(true);
          return setCurrentHero(randomHeros[currentSlide - 1]);
        }, 100);
      }

      if (attr === 'next') {
        setCurrentSlide(currentSlide + 1);
        setContentAnimation(false);
        return setTimeout(() => {
          setContentAnimation(true);
          return setCurrentHero(randomHeros[currentSlide + 1]);
        }, 100);
      }
    },
    [currentSlide, randomHeros]
  );

  function dotHandler(event) {
    if (!event) return;
    const { target } = event;
    if (!target) return;
    const index = target.getAttribute('data-index');
    target.blur();
    setCurrentSlide(index);
    return setCurrentHero(randomHeros[index]);
  }

  return (
    <div className={[styles['component'], 'heros-carousel'].join(' ')}>
      <header className={styles['header']}>
        <h2 className={styles['headline']}>{textContent.headline}</h2>
        <p className={styles['subheadline']}>{textContent.subheadline}</p>
      </header>
      <div className={styles['carousel']}>
        <CarouselProvider
          currentSlide={currentSlide}
          dragEnabled={false}
          isIntrinsicHeight
          lockOnWindowScroll
          naturalSlideHeight={700}
          naturalSlideWidth={1200}
          totalSlides={5}
          touchEnabled={false}
          visibleSlides={1}
        >
          <div className="button__wrapper">
            <ButtonBack onClick={buttonHandler}>
              <div className="btn-outer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 200 200"
                >
                  <path d="M100 194a94 94 0 1 1 94-94 94.11 94.11 0 0 1-94 94zm0-186a92 92 0 1 0 92 92 92.1 92.1 0 0 0-92-92z" />
                  <path d="M100 176a76 76 0 1 1 76-76 76.08 76.08 0 0 1-76 76zm0-148a72 72 0 1 0 72 72 72.08 72.08 0 0 0-72-72z" />
                </svg>
              </div>
              <div className="btn-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path d="M13.5 1.1l-4 3.4L16 11H1.8v5.2H16l-7 7 3.8 3.7 13.4-13.4z" />
                </svg>
              </div>
            </ButtonBack>
            <ButtonNext onClick={buttonHandler}>
              <div className="btn-outer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 200 200"
                >
                  <path d="M100 194a94 94 0 1 1 94-94 94.11 94.11 0 0 1-94 94zm0-186a92 92 0 1 0 92 92 92.1 92.1 0 0 0-92-92z" />
                  <path d="M100 176a76 76 0 1 1 76-76 76.08 76.08 0 0 1-76 76zm0-148a72 72 0 1 0 72 72 72.08 72.08 0 0 0-72-72z" />
                </svg>
              </div>
              <div className="btn-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <path d="M13.5 1.1l-4 3.4L16 11H1.8v5.2H16l-7 7 3.8 3.7 13.4-13.4z" />
                </svg>
              </div>
            </ButtonNext>
          </div>
          <Slider trayProps={{ onChange: buttonHandler }}>
            {randomHeros.length &&
              randomHeros.map((hero, index) => (
                <Slide index={index} key={index}>
                  <HeroSlideItem data={hero} />
                </Slide>
              ))}
          </Slider>
          {/* <DotGroup renderDots={dotHandler}>
            <Dot data-index={0} slide={0} onClick={dotHandler} />
            <Dot data-index={1} slide={1} onClick={dotHandler} />
            <Dot data-index={2} slide={2} onClick={dotHandler} />
          </DotGroup> */}
        </CarouselProvider>
      </div>
      <div className={styles['content']}>
        <div>
          {exists(currentHero) ? (
            <React.Fragment>
              <div className={styles['content__title__wrapper']}>
                <h2 className={styles['content__title']}>
                  <span
                    className={
                      contentAnimation ? 'uk-animation-slide-bottom-small' : ''
                    }
                    style={{ animationDelay: '200ms' }}
                  >
                    {currentHero.name}
                  </span>
                </h2>
              </div>

              <span
                className={
                  contentAnimation ? 'uk-animation-slide-bottom-small' : ''
                }
                style={{ animationDelay: '400ms' }}
              >
                <hr className={styles['content__divider']} />
              </span>

              <p className={styles['content__text']}>
                <span
                  className={
                    contentAnimation ? 'uk-animation-slide-bottom-small' : ''
                  }
                  style={{ animationDelay: '600ms' }}
                >
                  {currentHero.shortDescription}
                </span>
              </p>
              <div className={styles['content__abilities__wrapper']}>
                {abilities
                  .filter(obj => obj.key === symbol)
                  .sort((a, b) => a.cost - b.cost)
                  .map((obj, idx) => {
                    const { id, name } = obj;
                    return (
                      <div
                        className="uk-animation-slide-bottom-small"
                        key={id}
                        style={{ animationDelay: `${idx * 3}00ms` }}
                      >
                        <Img
                          alt={name}
                          className={styles['content__ability__image']}
                          src={`/images/heros/${symbol2}/${id}.jpg`}
                        />
                      </div>
                    );
                  })}
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HerosCarousel;
