import React from 'react';
import PropTypes from 'prop-types';
import HasBoon from 'components/game/mechanics/HasBoon';
import HasEnergyShield from 'components/game/mechanics/HasEnergyShield';
import HasGuardBackground from 'components/game/mechanics/HasGuardBackground';
import HasGuardForeground from 'components/game/mechanics/HasGuardForeground';
import HasOnslaught from 'components/game/mechanics/HasOnslaught';
import IsConcealed from 'components/game/mechanics/IsConcealed';
import IsDeadPoof from 'components/game/animations/minions/IsDeadPoof';
import IsDisabled from 'components/game/mechanics/IsDisabled';
import Minion from 'components/game/minion/Minion';
import MinionInteraction from 'components/game/interactions/minions/MinionInteraction';
import PLAYER_BOARDS from 'enums/playerBoards.enums';
import SPELLTYPE from 'enums/spellType.enums';
import usePrevious from 'components/game/hooks/usePrevious';
import WillExpire from 'components/game/mechanics/WillExpire';

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
  theirID
}) {
  const [wasAttacked, setWasAttacked] = React.useState(false);
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
    hasEnergyShield,
    hasGuard,
    hasOnslaught,
    isAttacking,
    isAttackingMinionIndex,
    isAttackingPlayer,
    isConcealed,
    isCursed,
    isDisabled,
    isDead,
    minionData,
    totalAttack,
    totalHealth,
    willExpire,
    willExpireIn
  } = data;

  const playerID = board === PLAYER_BOARDS[1] ? yourID : theirID;
  const previousCurrentHealth = usePrevious(currentHealth);

  const animateWasAttacked = React.useCallback(
    currentHealth => {
      if (isActive && board === PLAYER_BOARDS[2]) {
        currentHealth < previousCurrentHealth && setWasAttacked(true);
        return setTimeout(() => {
          setWasAttacked(false);
        }, 510);
      } else if (!isActive && board === PLAYER_BOARDS[1]) {
        currentHealth < previousCurrentHealth && setWasAttacked(true);
        return setTimeout(() => {
          setWasAttacked(false);
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

  return (
    <div
      data-file="board-slots/BoardSlot"
      data-slot={index}
      data-render={render}
      className={[
        'board-slot',
        data === null ? 'is-empty' : '',
        data !== null ? 'has-minion' : '',
        data === null && !canDrop ? 'cannot-drop-minion' : '',
        isDead ? 'is-dead' : '',
        hasGuard ? 'has-guard' : '',
        yourCelectedCardObject !== null && yourCardSpellType !== SPELLTYPE[2]
          ? 'cannot-drop-minion'
          : '',
        wasAttacked ? '--was-attacked' : '',
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
          willExpire={willExpire}
        />
      )}

      {/* mechanics */}
      {minionData && hasBoon && <HasBoon />}
      {minionData && hasEnergyShield && <HasEnergyShield />}
      {minionData && hasGuard && <HasGuardForeground />}
      {minionData && hasOnslaught && <HasOnslaught />}
      {minionData && isConcealed && <IsConcealed />}
      {minionData && isDisabled && <IsDisabled />}
      {minionData && willExpire && <WillExpire count={willExpireIn} />}

      {/* visible minion component */}
      {minionData && (
        <Minion
          currentAttack={currentAttack}
          currentHealth={currentHealth}
          data={minionData}
          slot={index}
          totalHealth={totalHealth}
        />
      )}

      {minionData && hasGuard && <HasGuardBackground />}
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
    currentAttack: 0,
    currentHealth: 0,
    hasGuard: false,
    minionData: null,
    totalAttack: 0,
    totalHealth: 1
  }
};
