import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import Img from 'react-image';
import formatHeroAbility from '@/utils/format-hero-ability';
import styles from './styles.module.scss';

export default function HeroAbilities({ abilities, symbol }) {
  const [selectedAbility, setSelectedAbility] = useState(null);
  const abilityIndex = selectedAbility && selectedAbility.index;
  const abilityType = selectedAbility && selectedAbility.type;
  const abilityName = selectedAbility && selectedAbility.name;
  const abilityCost = selectedAbility && selectedAbility.cost;
  const abilityCooldown = selectedAbility && selectedAbility.cooldown;
  const abilityDescription = selectedAbility && selectedAbility.description;

  const handleClick = useCallback((event, index, string) => {
    event !== null && event.target.blur();
    return setSelectedAbility({
      index,
      type: formatHeroAbility(string, 'type'),
      name: formatHeroAbility(string, 'name'),
      cost: formatHeroAbility(string, 'cost'),
      cooldown: formatHeroAbility(string, 'cooldown'),
      description: formatHeroAbility(string, 'description')
    });
  }, []);

  useEffect(() => {
    abilities.length !== 0 && handleClick(null, 1, abilities[0]);
  }, [abilities, handleClick]);

  return (
    <section
      className={styles.component}
      style={{
        backgroundImage:
          abilityIndex &&
          `url(/images/heros/${symbol}/ABILITY_0${abilityIndex}.jpg)`
      }}
    >
      <div className={styles.content__wrapper}>
        <div className={styles.content__inner}>
          <div className={styles.ability__selector}>
            <h2>Abilities</h2>
            <ul>
              {abilities.map((str, idx) => {
                idx = idx + 1;
                return (
                  <li
                    className={idx === abilityIndex ? styles.active : ''}
                    key={idx}
                  >
                    <button onClick={e => handleClick(e, idx, str)}>
                      <Img
                        alt={formatHeroAbility(str, 'name')}
                        src={`/images/heros/${symbol}/ABILITY_0${idx}.jpg`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={[
              styles.selected__ability,
              'uk-animation-slide-left-medium'
            ].join(' ')}
          >
            {selectedAbility ? (
              <React.Fragment>
                <div className={styles.ability__type}>{abilityType}</div>
                <h3 className={styles.ability__name}>
                  <span className="text__value">{abilityName}</span>
                  <span>
                    <span className={styles.ability__cost}>
                      <span className="text__value">{abilityCost}</span>
                      <Img
                        alt="Cost Gem"
                        src="/images/ui/UI_EnergySlot-Available.png"
                      />
                    </span>
                    <span className={styles.ability__cooldown}>
                      <span>
                        <span className="text__value">{abilityCooldown}</span>
                      </span>
                      <ReactSVG src="/images/site/icon-uikit-refresh.svg" />
                    </span>
                  </span>
                </h3>
                <div className={styles.ability__description}>
                  <p>{abilityDescription}</p>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

HeroAbilities.propTypes = {
  abilities: PropTypes.array,
  symbol: PropTypes.string
};

HeroAbilities.defaultProps = {
  abilities: []
};
