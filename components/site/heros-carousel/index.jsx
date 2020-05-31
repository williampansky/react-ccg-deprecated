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

const HerosCarousel = () => {
  const heros = useSelector(s => s.heros);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [randomHeros, setRandomHeros] = useState([]);
  const [currentHero, setCurrentHero] = useState(null);
  const { isDesktop } = useResponsive();
  const symbol = currentHero && currentHero.symbol;

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
    randomHerosCB(heros, 3);
  }, [heros, randomHerosCB]);

  useEffect(() => {
    setCurrentHero(randomHeros[1]);
  }, [randomHeros, setCurrentHero]);

  const textContent = {
    headline: `Choose your hero`,
    subheadline: `Who will you take to victory?`
  };

  const buttonHandler = useCallback(
    event => {
      const { target } = event;
      const attr = target.getAttribute('aria-label');
      target.blur();

      if (attr === 'previous') {
        if (symbol === randomHeros[2].symbol) {
          setCurrentSlide(1);
          return setCurrentHero(randomHeros[1]);
        }

        if (symbol === randomHeros[1].symbol) {
          setCurrentSlide(0);
          return setCurrentHero(randomHeros[0]);
        }
      }

      if (attr === 'next') {
        if (symbol === randomHeros[0].symbol) {
          setCurrentSlide(1);
          return setCurrentHero(randomHeros[1]);
        }

        if (symbol === randomHeros[1].symbol) {
          setCurrentSlide(2);
          return setCurrentHero(randomHeros[2]);
        }
      }
    },
    [symbol, randomHeros]
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
          totalSlides={3}
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
                  <defs>
                    <linearGradient
                      id="linear-gradient"
                      x1="100"
                      y1="6"
                      x2="100"
                      y2="194"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#b47555"></stop>
                      <stop offset="1" stopColor="#68462d"></stop>
                    </linearGradient>
                    <linearGradient
                      id="linear-gradient-2"
                      x1="100"
                      y1="24"
                      x2="100"
                      y2="176"
                      xlinkHref="#linear-gradient"
                    ></linearGradient>
                  </defs>
                  <path
                    d="M100 194a94 94 0 1 1 94-94 94.11 94.11 0 0 1-94 94zm0-186a92 92 0 1 0 92 92 92.1 92.1 0 0 0-92-92z"
                    fill="url(#linear-gradient)"
                  ></path>
                  <path
                    d="M100 176a76 76 0 1 1 76-76 76.08 76.08 0 0 1-76 76zm0-148a72 72 0 1 0 72 72 72.08 72.08 0 0 0-72-72z"
                    fill="url(#linear-gradient-2)"
                  ></path>
                </svg>
              </div>
              <div className="btn-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <linearGradient
                    id="arrow-button-right-a"
                    gradientUnits="userSpaceOnUse"
                    x1="14"
                    y1="5.503"
                    x2="14"
                    y2="29.902"
                  >
                    <stop offset="0" stopColor="#b47555"></stop>
                    <stop offset="1" stopColor="#68462d"></stop>
                  </linearGradient>
                  <path
                    fill="url(#arrow-button-right-a)"
                    d="M13.5 1.1l-4 3.4L16 11H1.8v5.2H16l-7 7 3.8 3.7 13.4-13.4z"
                  ></path>
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
                  <defs>
                    <linearGradient
                      id="linear-gradient"
                      x1="100"
                      y1="6"
                      x2="100"
                      y2="194"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#b47555"></stop>
                      <stop offset="1" stopColor="#68462d"></stop>
                    </linearGradient>
                    <linearGradient
                      id="linear-gradient-2"
                      x1="100"
                      y1="24"
                      x2="100"
                      y2="176"
                      xlinkHref="#linear-gradient"
                    ></linearGradient>
                  </defs>
                  <path
                    d="M100 194a94 94 0 1 1 94-94 94.11 94.11 0 0 1-94 94zm0-186a92 92 0 1 0 92 92 92.1 92.1 0 0 0-92-92z"
                    fill="url(#linear-gradient)"
                  ></path>
                  <path
                    d="M100 176a76 76 0 1 1 76-76 76.08 76.08 0 0 1-76 76zm0-148a72 72 0 1 0 72 72 72.08 72.08 0 0 0-72-72z"
                    fill="url(#linear-gradient-2)"
                  ></path>
                </svg>
              </div>
              <div className="btn-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                  <linearGradient
                    id="arrow-button-right-a"
                    gradientUnits="userSpaceOnUse"
                    x1="14"
                    y1="5.503"
                    x2="14"
                    y2="29.902"
                  >
                    <stop offset="0" stopColor="#b47555"></stop>
                    <stop offset="1" stopColor="#68462d"></stop>
                  </linearGradient>
                  <path
                    fill="url(#arrow-button-right-a)"
                    d="M13.5 1.1l-4 3.4L16 11H1.8v5.2H16l-7 7 3.8 3.7 13.4-13.4z"
                  ></path>
                </svg>
              </div>
            </ButtonNext>
          </div>

          <Slider trayProps={{ onChange: buttonHandler }}>
            {randomHeros.length ? (
              <React.Fragment>
                <Slide index={0}>
                  <HeroSlideItem data={randomHeros[0]} />
                </Slide>
                <Slide index={1}>
                  <HeroSlideItem data={randomHeros[1]} />
                </Slide>
                <Slide index={2}>
                  <HeroSlideItem data={randomHeros[2]} />
                </Slide>
              </React.Fragment>
            ) : null}
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
                <h2 className={styles['content__title']}>{currentHero.name}</h2>
              </div>
              <hr className={styles['content__divider']} />
              <p className={styles['content__text']}>
                {currentHero.shortDescription}
              </p>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HerosCarousel;
