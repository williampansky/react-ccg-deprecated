import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Card from 'components/collection/Card';
import createMarkup from 'utils/createMarkup';
import EntourageCard from 'components/collection/EntourageCard';
import exists from 'utils/element.exists';
import getConstantDescription from 'utils/get-constant-description';
import replaceConstant from 'utils/replace-constants';
import useHover from 'react-use-hover';

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
    <Modal
      className={modalObject !== null ? 'open' : ''}
      onClick={() => handleTooltipClick(null)}
    >
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
                            <img
                              alt=""
                              className={`icon`}
                              src={`assets/icons/Mechanic-${m.replace(
                                /%/g,
                                ''
                              )}.png`}
                            />
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
                            <EntourageCardWrapper
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
                            </EntourageCardWrapper>
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
    </Modal>
  );
}

CardModal.propTypes = {
  cardText: PropTypes.func,
  handleTooltipClick: PropTypes.func,
  modalObject: PropTypes.object
};

const Modal = styled.div`
  animation-duration: 600ms;
  display: flex;
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  padding: 50px 30px;
  background: rgba(0, 0, 0, 0.875);
  opacity: 0;
  transition: opacity 150ms linear;
  user-select: none;

  .modal__dialog {
    animation-duration: 400ms;
    position: relative;
    box-sizing: border-box;
    margin: auto;
    width: 75vw;
    max-width: 900px !important;
    background: none;
    opacity: 0;
    transform: translateY(-100px);
    transition: 500ms linear;
    transition-property: opacity, transform;
    padding: 30px 30px;
    cursor: default;
  }

  &.open {
    opacity: 1;
    z-index: 9000;
  }

  &.open .modal__dialog {
    opacity: 1;
    transform: translateY(0);
  }

  .card-wrapper {
    animation-delay: 400ms;
    position: relative;
  }

  .card-wrapper > .card__v3 {
    box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.625);
    transform: scale(1);
    z-index: 1;

    @media (min-width: 960px) {
      transform: scale(1.25);
    }

    @media (min-width: 1200px) {
      transform: scale(1.5);
    }
  }

  .card-wrapper > .transformed-card {
    animation-delay: 600ms;
    position: absolute;
    z-index: 0;
    bottom: -4%;
    left: -25%;

    & > .card__v3 {
      transform: rotate(-10deg) scale(0.95);

      @media (min-width: 960px) {
        transform: rotate(-10deg) scale(1.2);
      }

      @media (min-width: 1200px) {
        transform: rotate(-10deg) scale(1.475);
      }
    }
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    @media (min-width: 960px) {
      margin-left: 100px;
    }
  }

  /* prettier-ignore */
  .flex > div:nth-child(2) {
    margin-left: 50px;
    @media (min-width: 960px) { margin-left: 100px; }
    @media (min-width: 1200px) { margin-left: 150px; }
  }

  .info {
    animation-delay: 50ms;
    animation-duration: 600ms;
  }

  .info__list ul {
    color: white;
    font-family: sans-serif;
    padding: 0 0 0 1.25em;
    text-transform: capitalize;
  }

  .info__list li {
    position: relative;
  }

  .info__list ul li + li {
    margin-top: 0.465em;
  }

  .info__list strong {
    color: #fff649;
    margin: 0 0.25em 0 0;
  }

  .info__list strong + span {
    text-transform: uppercase;
  }

  .name {
    font-size: 1.875em;
    margin: 0 0 0.625em;
  }

  .flavor {
    font-size: 1.25em;
    margin: 0 0 0.875em;
    opacity: 0.75;
  }

  .mechanics__wrapper {
    color: white;
    font-family: sans-serif;
  }

  .mechanics {
    margin: 0 0 0.15em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
  }

  .mechanics img {
    width: 5%;
    margin-right: 10px;
  }

  .mechanics.mechanics__description {
    margin: 0 0 0.875em;
    max-width: 80%;
    opacity: 0.75;
  }

  .artist {
    margin-top: 1em;
  }

  .artist a,
  .info__list a {
    color: white;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .description {
    margin-top: 1em;
  }

  .description__text {
    color: white;
    font-family: sans-serif;
    max-width: 80%;
    opacity: 0.75;
    margin: 0.25em 0 0;
    font-size: 0.825em;
    line-height: 1.35;
  }
`;

const EntourageCardWrapper = styled.div`
  /* visibility: ${p => (p.visible ? 'visible' : 'hidden')}; */
  pointer-events: none;
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  opacity: 0;
  animation-duration: 200ms;

  .card__v3 {
    box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.625);
  }
`;
