import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import AsyncSelect from 'react-select/async';
import exists from '@/utils/element.exists';
import Card from '@/components/collection/Card';

export default function CardDevelopment() {
  const router = useRouter();
  const { query } = router;
  const database = useSelector(s => s.database);
  const [cardsArray, setCardsArray] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [CARD, SETCARD] = useState({});

  const handleOnChange = useCallback(
    string => {
      router.push(router.pathname, { query: { id: string } });
      return setSelectedCard(string);
    },
    [router, setSelectedCard]
  );

  const handleCardsArray = useCallback(array => {
    return setCardsArray(
      array
        .map(obj => {
          const { id } = obj;
          return {
            label: id,
            value: id
          };
        })
        .sort((a, b) => {
          if (a.label > b.label) return 1;
          if (a.label < b.label) return -1;
          return 0;
        })
    );
  }, []);

  useEffect(() => {
    database.length && handleCardsArray(database);
  }, [handleCardsArray, database]);

  const handleSetCard = useCallback(
    string => {
      const card = database.find(obj => obj.id === string);
      if (!exists(card)) return;
      return SETCARD(card);
    },
    [database]
  );

  useEffect(() => {
    handleSetCard(selectedCard);
  }, [handleSetCard, selectedCard]);

  const handleQueryParam = useCallback(
    obj => {
      if (!obj || (obj && !obj.id)) return;
      const { id } = obj;
      setSelectedCard(id.toUpperCase());
    },
    [setSelectedCard]
  );

  useEffect(() => {
    typeof query !== 'undefined' && handleQueryParam(query);
  }, [handleQueryParam, query]);

  return (
    <React.Fragment>
      <Helmet
        title="Card | Dev | HSclone"
        meta={[{ property: 'og:title', content: 'Card Dev' }]}
      />

      <div className="card__developer">
        <div className="flex">
          <section className="left">
            <div className="margin">
              <div className="label">Select Card</div>
              {cardsArray.length !== 0 ? (
                <AsyncSelect
                  cacheOptions
                  className={'selector'}
                  defaultInputValue={query && query.id}
                  defaultOptions={cardsArray}
                  loadOptions={cardsArray}
                  onChange={selectedOption =>
                    handleOnChange(selectedOption.value)
                  }
                  width="100%"
                />
              ) : null}
            </div>
          </section>
          <section className="right">
            {CARD !== {} ? (
              <div>
                <Card
                  dev={true}
                  artist={CARD.artist}
                  attack={CARD.attack}
                  cardClass={CARD.cardClass}
                  collectible={CARD.collectible}
                  cost={CARD.cost}
                  elite={CARD.elite}
                  entourage={CARD.entourage}
                  flavor={CARD.flavor}
                  goldenImageSrc={CARD.goldenImageSrc}
                  health={CARD.health}
                  hideStats={CARD.hideStats}
                  howToEarn={CARD.howToEarn}
                  howToEarnGolden={CARD.howToEarnGolden}
                  id={CARD.id}
                  isGolden={CARD.isGolden}
                  mechanics={CARD.mechanics}
                  name={CARD.name}
                  playRequirements={CARD.playRequirements}
                  race={CARD.race}
                  rarity={CARD.rarity}
                  set={CARD.set}
                  sounds={CARD.sounds}
                  spellDamage={CARD.spellDamage}
                  spellType={CARD.spellType}
                  targetingArrowText={CARD.targetingArrowText}
                  text={CARD.text}
                  type={CARD.type}
                  warcryNumber={CARD.warcryNumber}
                />
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}
