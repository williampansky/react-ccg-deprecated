import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import Card from '@/components/collection/Card';
import SET from '@/enums/set.enums';
import styles from './styles.module.scss';

const Hero = () => {
  const database = useSelector(s => s.database);
  const [randomCards, setRandomCards] = useState([]);
  const [activeItemIndex, setActiveItemIndex] = useState(2);

  const randomCardsCB = useCallback((array, size) => {
    const filteredArray = array
      .filter(item => item.set === SET[1] || item.set === SET[2])
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
    randomCardsCB(database, 5);
  }, [database, randomCardsCB]);

  function handleClick(event, int) {
    event.target.blur();
    setActiveItemIndex(int);
  }

  return (
    <div className={styles.component}>
      <img
        alt="HSclone"
        className={['magictime vanishIn', styles.logo].join(' ')}
        src="images/site/logo.png"
      />

      <dl className={[styles.tech__stack, 'uk-animation-fade'].join(' ')}>
        <dt>Built with</dt>
        <dd>
          <div>
            <ReactSVG src="images/site/logo-next.svg" />
          </div>
        </dd>
        <dd>
          <div>
            <ReactSVG src="images/site/logo-boardgame.svg" />
          </div>
        </dd>
        <dd>
          <div>
            <ReactSVG src="images/site/logo-node.svg" />
          </div>
        </dd>
      </dl>

      {randomCards && randomCards.length !== 0 ? (
        <div className={styles.cards__wrapper}>
          {randomCards.map((obj, idx) => {
            return (
              <div
                className={[
                  styles.slider__item,
                  activeItemIndex === idx ? styles.active : ''
                ].join(' ')}
                key={idx}
                onClick={e => handleClick(e, idx)}
                onKeyPress={e => handleClick(e, idx)}
                role="button"
                tabIndex={idx}
              >
                <div
                  className={[
                    'uk-animation-slide-bottom-small',
                    styles.slider__intro__animation
                  ].join(' ')}
                >
                  <div className={styles.slider__active__animation}>
                    <Card
                      artist={obj.artist}
                      attack={obj.attack}
                      cardClass={obj.cardClass}
                      collectible={obj.collectible}
                      cost={obj.cost}
                      elite={obj.elite}
                      entourage={obj.entourage}
                      flavor={obj.flavor}
                      goldenImageSrc={obj.goldenImageSrc}
                      health={obj.health}
                      hideStats={obj.hideStats}
                      howToEarn={obj.howToEarn}
                      howToEarnGolden={obj.howToEarnGolden}
                      id={obj.id}
                      isGolden={obj.isGolden}
                      mechanics={obj.mechanics}
                      name={obj.name}
                      playRequirements={obj.playRequirements}
                      race={obj.race}
                      rarity={obj.rarity}
                      set={obj.set}
                      sounds={obj.sounds}
                      spellDamage={obj.spellDamage}
                      spellType={obj.spellType}
                      targetingArrowText={obj.targetingArrowText}
                      text={obj.text}
                      type={obj.type}
                      warcryNumber={obj.warcryNumber}
                      dynamicSpellDamageText={obj.warcryNumber}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className={['container', styles.container__max].join(' ')}></div>
    </div>
  );
};

export default Hero;
