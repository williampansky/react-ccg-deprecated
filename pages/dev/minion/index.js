import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import exists from '@/utils/element.exists';
import Minion from '@/components/game/minion/Minion';
import YourMinionInteractions from '@/components/game/interactions/minions/YourMinionInteractions';
import TYPE from '@/enums/type.enums';
// import MECHANICS from '@/enums/MECHANICS.json';
import PLAYER_BOARDS from '@/enums/playerBoards.enums';
import BoardSlot from '@/components/game/board-slots/BoardSlot';

export default function CardDevelopment() {
  const router = useRouter();
  const { query } = router;
  const database = useSelector(s => s.database);
  const mechanics = useSelector(s => s.mechanics);
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
        .filter(obj => obj.type === TYPE[1])
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
      setSelectedCard(id);
    },
    [setSelectedCard]
  );

  useEffect(() => {
    typeof query !== 'undefined' && handleQueryParam(query);
  }, [handleQueryParam, query]);

  const initCardMechanics = useCallback((card, key) => {
    if (!exists(card)) return;
    const { mechanics } = card;
    if (!exists(mechanics)) return;

    // prettier-ignore
    switch (key) {
      case 'hasBoon':         return mechanics.includes('%BOON%');
      case 'hasCurse':        return mechanics.includes('%ON_DEATH%');
      case 'hasEnergyShield': return mechanics.includes('%BUBBLE%');
      case 'hasGuard':        return mechanics.includes('%BULWARK%');
      case 'hasOnslaught':    return mechanics.includes('%DOUBLE_ATTACK%');
      case 'isConcealed':     return mechanics.includes('%HIDDEN%');
      default:                return false;
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet
        title="Minion | Dev | HSclone"
        meta={[{ property: 'og:title', content: 'Minion Dev' }]}
      />

      <div className="card__developer minion__developer">
        <div className="flex">
          <section
            className="right"
            style={{
              backgroundImage: 'url(/images/boards/BOARD_FLOOR.jpg)'
            }}
          >
            {exists(CARD) && CARD !== {} ? (
              <div>
                <BoardSlot
                  canDrop={false}
                  dev={true}
                  data={{
                    minionData: CARD,
                    canAttack: false,
                    canBeAttackedByMinion: false,
                    canBeAttackedByPlayer: false,
                    canBeAttackedBySpell: false,
                    canBeAttackedByWarcry: false,
                    canBeBuffed: false,
                    canBeDebuffed: false,
                    canBeExpired: false,
                    canBeHealed: false,
                    canBeReturned: false,
                    canBeSacrificed: false,
                    canBeStolen: false,
                    canReceiveEnergyShield: false,
                    canReceiveGuard: false,
                    canReceiveOnslaught: false,
                    currentAttack: CARD.attack,
                    currentHealth: CARD.health,
                    hasBoon: initCardMechanics(CARD, 'hasBoon'),
                    hasCurse: initCardMechanics(CARD, 'hasCurse'),
                    hasEnergyShield: initCardMechanics(CARD, 'hasEnergyShield'),
                    hasGuard: initCardMechanics(CARD, 'hasGuard'),
                    hasOnslaught: initCardMechanics(CARD, 'hasOnslaught'),
                    isAttacking: false,
                    isAttackingMinionIndex: null,
                    isAttackingPlayer: false,
                    isConcealed: initCardMechanics(CARD, 'isConcealed'),
                    isCursed: false,
                    isDisabled: false,
                    isDead: false,
                    totalAttack: CARD.attack,
                    totalHealth: CARD.health,
                    willExpire: false,
                    willExpireIn: false
                  }}
                  board={PLAYER_BOARDS[1]}
                  render={true}
                  index={0}
                  isActive={true}
                  onClick={e => e.target.blur()}
                  yourID={'0'}
                />
              </div>
            ) : null}
          </section>
          <section className="left">
            <div className="margin">
              <div className="label">Select Card</div>
              {cardsArray.length !== 0 ? (
                <Select
                  cacheOptions
                  className={'selector'}
                  defaultInputValue={query && query.id}
                  options={cardsArray}
                  onChange={selectedOption =>
                    handleOnChange(selectedOption.value)
                  }
                  width="100%"
                />
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}
