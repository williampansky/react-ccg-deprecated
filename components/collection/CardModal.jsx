import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import useHover from 'react-use-hover';
import Card from 'components/collection/Card';
import createMarkup from 'utils/createMarkup';
import EntourageCard from 'components/collection/EntourageCard';
import exists from 'utils/element.exists';
import getConstantDescription from 'utils/get-constant-description';
import replaceConstant from 'utils/replace-constants';

export default function CardModal({
  cardText,
  handleTooltipClick,
  modalObject
}) {
  const [isHovering, hoverProps] = useHover(false);
  const database = useSelector(state => state.database);

  /**
   * Removes hhtp(?s)://www. from URL string.
   * @param {*} string e.g. https://www.artstation.com/dianafranco
   * @see https://stackoverflow.com/a/41942787/8296677
   */
  function condenseUrlString(string) {
    if (!exists(string)) return;
    return string.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
  }

  return (
    <div
      className={modalObject !== null ? 'card__modal open' : 'card__modal'}
      onClick={() => handleTooltipClick(null)}
      onKeyPress={() => handleTooltipClick(null)}
      role="button"
      tabIndex={0}
    >
      <button className="modal__close__button">
        <ReactSVG src="/images/site/logo-uikit-close.svg" />
      </button>
      {modalObject !== null ? (
        <React.Fragment>
          <div className="modal__dialog">
            <div className="flex">
              <div className="card-wrapper uk-animation-slide-bottom-small">
                <Card
                  artist={modalObject.artist}
                  attack={modalObject.attack}
                  cardClass={modalObject.cardClass}
                  collectible={modalObject.collectible}
                  cost={modalObject.cost}
                  elite={modalObject.elite}
                  entourage={modalObject.entourage}
                  flavor={modalObject.flavor}
                  goldenImageSrc={modalObject.goldenImageSrc}
                  health={modalObject.health}
                  hideStats={modalObject.hideStats}
                  howToEarn={modalObject.howToEarn}
                  howToEarnGolden={modalObject.howToEarnGolden}
                  id={modalObject.id}
                  isGolden={modalObject.isGolden}
                  mechanics={modalObject.mechanics}
                  name={modalObject.name}
                  playRequirements={modalObject.playRequirements}
                  race={modalObject.race}
                  rarity={modalObject.rarity}
                  set={modalObject.set}
                  sounds={modalObject.sounds}
                  spellDamage={modalObject.spellDamage}
                  spellType={modalObject.spellType}
                  targetingArrowText={modalObject.targetingArrowText}
                  text={modalObject.text}
                  type={modalObject.type}
                  warcryNumber={modalObject.warcryNumber}
                />
                {!modalObject.elite ? (
                  <div className="transformed-card uk-animation-slide-bottom-small">
                    <Card
                      artist={modalObject.artist}
                      attack={modalObject.attack}
                      cardClass={modalObject.cardClass}
                      collectible={modalObject.collectible}
                      cost={modalObject.cost}
                      elite={modalObject.elite}
                      entourage={modalObject.entourage}
                      flavor={modalObject.flavor}
                      goldenImageSrc={modalObject.goldenImageSrc}
                      health={modalObject.health}
                      hideStats={modalObject.hideStats}
                      howToEarn={modalObject.howToEarn}
                      howToEarnGolden={modalObject.howToEarnGolden}
                      id={modalObject.id}
                      isGolden={modalObject.isGolden}
                      mechanics={modalObject.mechanics}
                      name={modalObject.name}
                      playRequirements={modalObject.playRequirements}
                      race={modalObject.race}
                      rarity={modalObject.rarity}
                      set={modalObject.set}
                      sounds={modalObject.sounds}
                      spellDamage={modalObject.spellDamage}
                      spellType={modalObject.spellType}
                      targetingArrowText={modalObject.targetingArrowText}
                      text={modalObject.text}
                      type={modalObject.type}
                      warcryNumber={modalObject.warcryNumber}
                    />
                  </div>
                ) : null}
              </div>
              <div className="info magictime vanishIn">
                <div className="text__value">
                  <h2 className="name">{modalObject.name}</h2>
                </div>
                <div className="text__value">
                  <p
                    className="flavor"
                    dangerouslySetInnerHTML={createMarkup(
                      cardText(
                        modalObject.flavor,
                        modalObject.dynamicSpellDamageText
                      )
                    )}
                  />
                </div>
                {modalObject.mechanics !== [] ? (
                  <div className="mechanics__wrapper">
                    {modalObject.mechanics.map((m, i) => {
                      return (
                        <div className="mechanic" key={i}>
                          <div className="text__value mechanics">
                            {/* <img
                              alt=""
                              className={`icon`}
                              src={`assets/icons/Mechanic-${m.replace(
                                /%/g,
                                ''
                              )}.png`}
                            /> */}
                            <span>{replaceConstant(m)}</span>
                          </div>
                          <p className="mechanics mechanics__description">
                            <small>{getConstantDescription(m)}</small>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <div className="info__list">
                  <ul>
                    <li>
                      <strong className="text__value">ID:</strong>{' '}
                      {modalObject.id}
                    </li>
                    <li>
                      <strong className="text__value">Type:</strong>{' '}
                      {modalObject.type}
                    </li>
                    <li>
                      <strong className="text__value">Set:</strong>{' '}
                      <span>{replaceConstant(modalObject.set)}</span>
                    </li>
                    <li>
                      <strong className="text__value">Rarity:</strong>{' '}
                      <span>{replaceConstant(modalObject.rarity)}</span>
                    </li>
                    {modalObject.playRequirements && (
                      <li>
                        <strong className="text__value">
                          Play Requirements:
                        </strong>{' '}
                        {modalObject.playRequirements}
                      </li>
                    )}
                    {modalObject.entourage && (
                      <li {...hoverProps} aria-describedby="overlay">
                        <strong className="text__value">Entourage:</strong>{' '}
                        <span>{modalObject.entourage}</span>
                        {modalObject.entourage !== null ? (
                          database.find(o => o.id === modalObject.entourage) ? (
                            <div
                              className={[
                                'entourage-card',
                                isHovering
                                  ? 'uk-animation-slide-bottom-small'
                                  : ''
                              ].join(' ')}
                              id="overlay"
                              role="tooltip"
                            >
                              <EntourageCard
                                data={database.find(
                                  o => o.id === modalObject.entourage
                                )}
                              />
                            </div>
                          ) : null
                        ) : null}
                      </li>
                    )}
                    {modalObject.targetingArrowText && (
                      <li>
                        <strong className="text__value">Targeting Text:</strong>{' '}
                        {replaceConstant(modalObject.targetingArrowText)}
                      </li>
                    )}
                    {modalObject.howToEarn && (
                      <li>
                        <strong className="text__value">How to Earn:</strong>{' '}
                        {modalObject.howToEarn}
                      </li>
                    )}
                    {modalObject.collectible && (
                      <li>
                        <strong className="text__value">Collectible</strong>
                      </li>
                    )}
                    {modalObject.elite && (
                      <li>
                        <strong className="text__value">Elite</strong>
                      </li>
                    )}
                  </ul>
                  {modalObject.artist && (
                    <div className="artist">
                      <strong className="text__value">Artist:</strong>{' '}
                      <a
                        href={modalObject.artist}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {condenseUrlString(modalObject.artist)}
                      </a>
                    </div>
                  )}
                  {modalObject.description && (
                    <div className="description">
                      <strong className="text__value">Description</strong>{' '}
                      <div
                        className="description__text"
                        dangerouslySetInnerHTML={createMarkup(
                          modalObject.description
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

CardModal.propTypes = {
  cardText: PropTypes.func,
  handleTooltipClick: PropTypes.func,
  modalObject: PropTypes.object
};
