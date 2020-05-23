import React from 'react';
import PropTypes from 'prop-types';
import PLAYER_BOARDS from '@/enums/playerBoards.enums';
import SPELLTYPE from '@/enums/spellType.enums';
import useHover from 'react-use-hover';

// child components
import HasBoon from '@/components/game/mechanics/HasBoon';
import HasEnergyShield from '@/components/game/mechanics/HasEnergyShield';
import HasGuardBackground from '@/components/game/mechanics/HasGuardBackground';
import HasGuardForeground from '@/components/game/mechanics/HasGuardForeground';
import HasOnslaught from '@/components/game/mechanics/HasOnslaught';
import IsConcealed from '@/components/game/mechanics/IsConcealed';
import IsDeadPoof from '@/components/game/animations/minions/IsDeadPoof';
import IsDisabled from '@/components/game/mechanics/IsDisabled';
import Minion from '@/components/game/minion';
import MinionInteraction from '@/components/game/interactions/minions/MinionInteraction';
import usePrevious from '@/components/game/hooks/usePrevious';
import WillExpire from '@/components/game/mechanics/WillExpire';
import HasCurse from '@/components/game/mechanics/HasCurse';
import IsElite from '../mechanics/IsElite';
import ReactTooltip from 'react-tooltip';
import Card from '@/components/collection/Card';
import replaceConstant from '@/utils/replace-constants';
import getMechanicShortDescription from '@/utils/get-mechanic-short-description';
import HasPoison from '../mechanics/HasPoison';

export default function BoardSlot({
  G,
  ctx,
  moves,
  isActive,
  canDrop,
  data,
  board,
  index,
  onClick,
  render,
  yourID,
  theirID,
  isEntering
}) {
  const [wasAttackedState, setWasAttackedState] = React.useState(false);
  const { selectedCardObject } = G;
  const yourCelectedCardObject =
    selectedCardObject && selectedCardObject[yourID];
  const yourCardSpellType =
    selectedCardObject[yourID] && selectedCardObject[yourID].spellType;
  const { killMinion } = moves;
  const {
    canAttack,
    canBeAttackedByMinion,
    canBeAttackedByPlayer,
    canBeAttackedBySpell,
    canBeAttackedByWarcry,
    canBeBuffed,
    canBeDebuffed,
    canBeExpired,
    canBeHealed,
    canBeReturned,
    canBeSacrificed,
    canBeStolen,
    canReceiveEnergyShield,
    canReceiveGuard,
    canReceiveOnslaught,
    currentAttack,
    currentHealth,
    hasBoon,
    hasCurse,
    hasEnergyShield,
    hasGuard,
    hasOnslaught,
    hasPoison,
    isAttacking,
    isAttackingMinionIndex,
    isAttackingPlayer,
    isConcealed,
    isCursed,
    isDisabled,
    isDead,
    minionData,
    minionData: {
      active,
      artist,
      attack,
      cardClass,
      collectible,
      cost,
      elite,
      entourage,
      flavor,
      goldenImageSrc,
      health,
      hideStats,
      howToEarn,
      howToEarnGolden,
      id,
      isGolden,
      mechanics,
      name,
      playRequirements,
      race,
      rarity,
      set,
      sounds,
      spellContext,
      spellDamage,
      spellType,
      targetingArrowText,
      text,
      type,
      warcryNumber
    },
    totalAttack,
    totalHealth,
    wasAttacked,
    willExpire,
    willExpireIn
  } = data;

  const playerID = board === PLAYER_BOARDS[1] ? yourID : theirID;
  const previousCurrentHealth = usePrevious(currentHealth);

  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 1400,
    mouseLeaveDelayMS: 0
  });

  const animateWasAttacked = React.useCallback(
    currentHealth => {
      if (isActive && board === PLAYER_BOARDS[2]) {
        currentHealth < previousCurrentHealth && setWasAttackedState(true);
        return setTimeout(() => {
          setWasAttackedState(false);
        }, 510);
      } else if (!isActive && board === PLAYER_BOARDS[1]) {
        currentHealth < previousCurrentHealth && setWasAttackedState(true);
        return setTimeout(() => {
          setWasAttackedState(false);
        }, 510);
      }
    },
    [board, isActive, previousCurrentHealth]
  );

  React.useEffect(() => {
    animateWasAttacked(currentHealth);
  }, [currentHealth, animateWasAttacked]);

  const KillMinion = React.useCallback(
    index => {
      return setTimeout(() => {
        killMinion(playerID, data, index);
      }, 900);
    },
    [playerID, data, killMinion]
  );

  React.useEffect(() => {
    isDead && KillMinion(index);
  }, [index, isDead, KillMinion]);

  function handleIsAttackingClass(bool) {
    if (bool) return '--animate-attack';
  }

  function handleIsEnteringClass(bool) {
    if (bool) return 'minion__animation--is-entering';
    return setTimeout(() => {
      return '';
    }, 400);
  }

  function determineIfCardHover() {
    let bool = false;
    if (isHovering) bool = true;
    if (canBeAttackedByMinion) bool = false;
    if (canBeAttackedByPlayer) bool = false;
    if (canBeAttackedBySpell) bool = false;
    if (canBeAttackedByWarcry) bool = false;
    if (canBeBuffed) bool = false;
    if (canBeDebuffed) bool = false;
    if (canBeExpired) bool = false;
    if (canBeHealed) bool = false;
    if (canBeReturned) bool = false;
    if (canBeSacrificed) bool = false;
    if (canBeStolen) bool = false;
    if (canReceiveEnergyShield) bool = false;
    if (canReceiveGuard) bool = false;
    if (canReceiveOnslaught) bool = false;
    return bool;
  }

  return (
    <div
      data-file="board-slots/BoardSlot"
      data-slot={index}
      data-render={render}
      data-for={`${id}--${index}`}
      data-tip={true}
      className={[
        'board-slot',
        data === null ? 'is-empty' : '',
        data !== null ? 'has-minion' : '',
        data === null && !canDrop ? 'cannot-drop-minion' : '',
        isEntering ? handleIsEnteringClass(isEntering) : '',
        // isEntering ? 'minion__animation--is-entering' : '',
        isDead ? 'is-dead' : '',
        hasGuard ? 'has-guard' : '',
        yourCelectedCardObject !== null && yourCardSpellType !== SPELLTYPE[2]
          ? 'cannot-drop-minion'
          : '',
        wasAttackedState ? '--was-attacked' : '',
        isAttacking ? '--is-attacking' : '',
        isAttackingPlayer === true ? `target__other_player` : '',
        isAttackingMinionIndex !== null
          ? `target__slot-${isAttackingMinionIndex}`
          : ''
      ].join(' ')}
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
      {...hoverProps}
    >
      {/* interactions layer */}
      {minionData && (
        <MinionInteraction
          G={G}
          ctx={ctx}
          moves={moves}
          isActive={isActive}
          board={board}
          yourID={yourID}
          theirID={theirID}
          index={index}
          render={render}
          data={data}
          canAttack={canAttack}
          canBeAttackedByMinion={canBeAttackedByMinion}
          canBeAttackedByPlayer={canBeAttackedByPlayer}
          canBeAttackedBySpell={canBeAttackedBySpell}
          canBeAttackedByWarcry={canBeAttackedByWarcry}
          canBeBuffed={canBeBuffed}
          canBeHealed={canBeHealed}
          canBeDebuffed={canBeDebuffed}
          canBeExpired={canBeExpired}
          canBeReturned={canBeReturned}
          canBeSacrificed={canBeSacrificed}
          canBeStolen={canBeStolen}
          canReceiveEnergyShield={canReceiveEnergyShield}
          canReceiveGuard={canReceiveGuard}
          canReceiveOnslaught={canReceiveOnslaught}
          hasBoon={hasBoon}
          hasEnergyShield={hasEnergyShield}
          hasGuard={hasGuard}
          hasOnslaught={hasOnslaught}
          isAttacking={isAttacking}
          isConcealed={isConcealed}
          isCursed={isCursed}
          isDisabled={isDisabled}
          totalAttack={totalAttack}
          totalHealth={totalHealth}
          wasAttacked={wasAttacked}
          willExpire={willExpire}
        />
      )}

      {/* mechanics */}
      {minionData && hasBoon && <HasBoon />}
      {/* {minionData && hasCurse && <HasCurse />} */}
      {/* {minionData && hasPoison && <HasPoison />} */}
      {minionData && hasEnergyShield && <HasEnergyShield />}
      {minionData && hasGuard && <HasGuardForeground />}
      {/* {minionData && hasOnslaught && <HasOnslaught />} */}
      {minionData && isConcealed && <IsConcealed />}
      {minionData && isDisabled && <IsDisabled />}
      {minionData && willExpire && <WillExpire count={willExpireIn} />}

      {/* elite */}
      {minionData && elite && <IsElite />}

      {/* visible minion component */}
      {minionData && (
        <Minion
          currentAttack={currentAttack}
          currentHealth={currentHealth}
          slot={index}
          totalHealth={totalHealth}
          active={active}
          artist={artist}
          attack={attack}
          cardClass={cardClass}
          collectible={collectible}
          cost={cost}
          elite={elite}
          entourage={entourage}
          flavor={flavor}
          goldenImageSrc={goldenImageSrc}
          health={health}
          hideStats={hideStats}
          howToEarn={howToEarn}
          howToEarnGolden={howToEarnGolden}
          id={id}
          isGolden={isGolden}
          mechanics={mechanics}
          name={name}
          playRequirements={playRequirements}
          race={race}
          rarity={rarity}
          set={set}
          sounds={sounds}
          spellContext={spellContext}
          spellDamage={spellDamage}
          spellType={spellType}
          targetingArrowText={targetingArrowText}
          text={text}
          type={type}
          warcryNumber={warcryNumber}
          hasCurse={hasCurse}
          hasPoison={hasPoison}
          hasOnslaught={hasOnslaught}
          isAttacking={isAttacking}
          wasAttacked={wasAttacked}
        />
      )}

      {/* visible minion component */}
      {minionData ? (
        <div
          className={[
            'board-slot-card-tooltip',
            determineIfCardHover()
              ? 'uk-animation-scale-up uk-transform-origin-bottom-left'
              : ''
          ].join(' ')}
        >
          <Card
            artist={artist}
            attack={attack}
            cardClass={cardClass}
            collectible={collectible}
            cost={cost}
            elite={elite}
            entourage={entourage}
            flavor={flavor}
            goldenImageSrc={goldenImageSrc}
            health={health}
            hideStats={hideStats}
            howToEarn={howToEarn}
            howToEarnGolden={howToEarnGolden}
            id={id}
            isGolden={isGolden}
            mechanics={mechanics}
            name={name}
            playRequirements={playRequirements}
            race={race}
            rarity={rarity}
            set={set}
            sounds={sounds}
            spellDamage={spellDamage}
            spellType={spellType}
            targetingArrowText={targetingArrowText}
            text={text}
            type={type}
            warcryNumber={warcryNumber}
          />
          {mechanics && mechanics.length ? (
            <div className="tooltip__mechanics__wrapper">
              {mechanics.map((m, i) => {
                return (
                  <div className="mechanic__item" key={m}>
                    <div className="mechanic__item-title">
                      {replaceConstant(m)}
                    </div>
                    <div className="mechanic__item-description">
                      {getMechanicShortDescription(m)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}

      {minionData && hasGuard && <HasGuardBackground race={race} />}
      {isDead && <IsDeadPoof />}
    </div>
  );
}

BoardSlot.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  isActive: PropTypes.bool,
  index: PropTypes.number,
  render: PropTypes.bool,
  board: PropTypes.string,
  canDrop: PropTypes.bool,
  onClick: PropTypes.func,
  theirID: PropTypes.string,
  yourID: PropTypes.string,
  data: PropTypes.object
};

BoardSlot.defaultProps = {
  G: {
    selectedCardObject: {
      spellType: SPELLTYPE[2]
    }
  },
  moves: {
    killMinion: () => {}
  },
  isActive: false,
  index: 0,
  render: false,
  board: PLAYER_BOARDS[1],
  canDrop: false,
  onClick: () => {},
  theirID: '0',
  yourID: '0',
  data: {
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
    currentAttack: 0,
    currentHealth: 1,
    hasBoon: false,
    hasCurse: false,
    hasEnergyShield: false,
    hasGuard: false,
    hasOnslaught: false,
    isAttacking: false,
    isAttackingMinionIndex: false,
    isAttackingPlayer: false,
    isConcealed: false,
    isCursed: false,
    isDisabled: false,
    isDead: false,
    totalAttack: 0,
    totalHealth: 1,
    willExpire: false,
    willExpireIn: false
  }
};
