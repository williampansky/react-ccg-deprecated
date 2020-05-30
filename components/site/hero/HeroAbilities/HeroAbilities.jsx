import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import Img from 'react-image';
import replaceConstant from '@/utils/replace-constants';
import styles from './styles.module.scss';

export default function HeroAbilities({ abilities, symbol }) {
  const [selectedAbility, setSelectedAbility] = useState(null);
  const abilityId = selectedAbility && selectedAbility.id;
  const abilityType = selectedAbility && replaceConstant(selectedAbility.type);
  const abilityName = selectedAbility && selectedAbility.name;
  const abilityCost = selectedAbility && selectedAbility.cost;
  const abilityCooldown = selectedAbility && selectedAbility.cooldown;
  const abilityText = selectedAbility && selectedAbility.text;
  const abilityIsUlt = selectedAbility && selectedAbility.ultimate;

  const handleClick = useCallback((event, index, obj) => {
    event !== null && event.target.blur();
    return setSelectedAbility(obj);
  }, []);

  useEffect(() => {
    abilities.length !== 0 && handleClick(null, 1, abilities[0]);
  }, [abilities, handleClick]);

  return (
    <section
      className={styles.component}
      style={{
        backgroundImage:
          abilityId && `url(/images/heros/${symbol}/${abilityId}.jpg)`
      }}
    >
      <div className={styles.content__wrapper}>
        <div className={styles.content__inner}>
          <div className={styles.ability__selector}>
            <h2>Abilities</h2>
            <ul>
              {abilities.map((obj, idx) => {
                const { id, name } = obj;
                idx = idx + 1;
                return (
                  <li
                    className={id === abilityId ? styles.active : ''}
                    key={idx}
                  >
                    <button onClick={e => handleClick(e, idx, obj)}>
                      <Img
                        alt={name}
                        src={`/images/heros/${symbol}/${id}.jpg`}
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
              selectedAbility ? 'uk-animation-slide-left-medium' : ''
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
                        <span className="text__value">
                          {abilityIsUlt ? 'Ult' : abilityCooldown}
                        </span>
                      </span>
                      <ReactSVG src="/images/site/icon-uikit-refresh.svg" />
                    </span>
                  </span>
                </h3>
                <div className={styles.ability__description}>
                  <p>{abilityText}</p>
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
