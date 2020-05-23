import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import exists from '@/utils/element.exists';
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

  // card prop states
  const [canAttack, setCanAttack] = useState(false);
  const [canBeAttackedByMinion, setCanBeAttackedByMinion] = useState(false);
  const [canBeAttackedByPlayer, setCanBeAttackedByPlayer] = useState(false);
  const [canBeAttackedBySpell, setCanBeAttackedBySpell] = useState(false);
  const [canBeAttackedByWarcry, setCanBeAttackedByWarcry] = useState(false);
  const [canBeBuffed, setCanBeBuffed] = useState(false);
  const [canBeDebuffed, setCanBeDebuffed] = useState(false);
  const [canBeExpired, setCanBeExpired] = useState(false);
  const [canBeHealed, setCanBeHealed] = useState(false);
  const [canBeReturned, setCanBeReturned] = useState(false);
  const [canBeSacrificed, setCanBeSacrificed] = useState(false);
  const [canBeStolen, setCanBeStolen] = useState(false);
  const [canReceiveEnergyShield, setCanReceiveEnergyShield] = useState(false);
  const [canReceiveGuard, setCanReceiveGuard] = useState(false);
  const [canReceiveOnslaught, setCanReceiveOnslaught] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [willExpire, setWillExpire] = useState(false);
  const [willExpireIn, setWillExpireIn] = useState(2);

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
      case 'hasPoison':       return mechanics.includes('%POISON%');
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
                    canAttack: canAttack,
                    canBeAttackedByMinion: canBeAttackedByMinion,
                    canBeAttackedByPlayer: canBeAttackedByPlayer,
                    canBeAttackedBySpell: canBeAttackedBySpell,
                    canBeAttackedByWarcry: canBeAttackedByWarcry,
                    canBeBuffed: canBeBuffed,
                    canBeDebuffed: canBeDebuffed,
                    canBeExpired: canBeExpired,
                    canBeHealed: canBeHealed,
                    canBeReturned: canBeReturned,
                    canBeSacrificed: canBeSacrificed,
                    canBeStolen: canBeStolen,
                    canReceiveEnergyShield: canReceiveEnergyShield,
                    canReceiveGuard: canReceiveGuard,
                    canReceiveOnslaught: canReceiveOnslaught,
                    currentAttack: CARD.attack,
                    currentHealth: CARD.health,
                    hasBoon: initCardMechanics(CARD, 'hasBoon'),
                    hasCurse: initCardMechanics(CARD, 'hasCurse'),
                    hasEnergyShield: initCardMechanics(CARD, 'hasEnergyShield'),
                    hasGuard: initCardMechanics(CARD, 'hasGuard'),
                    hasOnslaught: initCardMechanics(CARD, 'hasOnslaught'),
                    hasPoison: initCardMechanics(CARD, 'hasPoison'),
                    isAttacking: isAttacking,
                    isAttackingMinionIndex: null,
                    isAttackingPlayer: false,
                    isConcealed: initCardMechanics(CARD, 'isConcealed'),
                    isDisabled: isDisabled,
                    isDead: isDead,
                    totalAttack: CARD.attack,
                    totalHealth: CARD.health,
                    willExpire: willExpire,
                    willExpireIn: willExpireIn
                  }}
                  board={PLAYER_BOARDS[1]}
                  render={true}
                  index={0}
                  isActive={true}
                  onClick={e => e.target.blur()}
                  yourID={'0'}
                  isEntering={isEntering}
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
            <div className="margin">
              <div className="margin-small">
                <button onClick={() => setCanAttack(!canAttack ? true : false)}>
                  canAttack: {!canAttack ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeAttackedByMinion(
                      !canBeAttackedByMinion ? true : false
                    )
                  }
                >
                  canBeAttackedByMinion:{' '}
                  {!canBeAttackedByMinion ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeAttackedByPlayer(
                      !canBeAttackedByPlayer ? true : false
                    )
                  }
                >
                  canBeAttackedByPlayer:{' '}
                  {!canBeAttackedByPlayer ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeAttackedBySpell(
                      !canBeAttackedBySpell ? true : false
                    )
                  }
                >
                  canBeAttackedBySpell:{' '}
                  {!canBeAttackedBySpell ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeAttackedByWarcry(
                      !canBeAttackedByWarcry ? true : false
                    )
                  }
                >
                  canBeAttackedByWarcry:{' '}
                  {!canBeAttackedByWarcry ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setCanBeBuffed(!canBeBuffed ? true : false)}
                >
                  canBeBuffed: {!canBeBuffed ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeDebuffed(!canBeDebuffed ? true : false)
                  }
                >
                  canBeDebuffed: {!canBeDebuffed ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setCanBeExpired(!canBeExpired ? true : false)}
                >
                  canBeExpired: {!canBeExpired ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setCanBeHealed(!canBeHealed ? true : false)}
                >
                  canBeHealed: {!canBeHealed ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeReturned(!canBeReturned ? true : false)
                  }
                >
                  canBeReturned: {!canBeReturned ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanBeSacrificed(!canBeSacrificed ? true : false)
                  }
                >
                  canBeSacrificed: {!canBeSacrificed ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setCanBeStolen(!canBeStolen ? true : false)}
                >
                  canBeStolen: {!canBeStolen ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanReceiveEnergyShield(
                      !canReceiveEnergyShield ? true : false
                    )
                  }
                >
                  canReceiveEnergyShield:{' '}
                  {!canReceiveEnergyShield ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanReceiveGuard(!canReceiveGuard ? true : false)
                  }
                >
                  canReceiveGuard: {!canReceiveGuard ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() =>
                    setCanReceiveOnslaught(!canReceiveOnslaught ? true : false)
                  }
                >
                  canReceiveOnslaught: {!canReceiveOnslaught ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setIsAttacking(!isAttacking ? true : false)}
                >
                  isAttacking: {!isAttacking ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setIsDisabled(!isDisabled ? true : false)}
                >
                  isDisabled: {!isDisabled ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setIsEntering(!isEntering ? true : false)}
                >
                  isEntering: {!isEntering ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button onClick={() => setIsDead(!isDead ? true : false)}>
                  isDead: {!isDead ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <button
                  onClick={() => setWillExpire(!willExpire ? true : false)}
                >
                  willExpire: {!willExpire ? 'false' : 'true'}
                </button>
              </div>
              <div className="margin-small">
                <input
                  onChange={e => setWillExpireIn(e.target.value)}
                  type="number"
                  defaultValue={willExpireIn}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}
