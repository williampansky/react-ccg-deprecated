import React from 'react';
import PropTypes from 'prop-types';

// child components
import CanAttack from '@/components/game/interactions/minions/CanAttack';
import CanBeBuffed from '@/components/game/interactions/minions/CanBeBuffed';
import CanBeDebuffed from '@/components/game/interactions/minions/CanBeDebuffed';
import CanBeHealed from '@/components/game/interactions/minions/CanBeHealed';
import CanBeSacrificed from '@/components/game/interactions/minions/CanBeSacrificed';
import CanBeExpired from '@/components/game/interactions/minions/CanBeExpired';
import IsAttacking from '@/components/game/interactions/minions/IsAttacking';
import CanBeReturned from '@/components/game/interactions/minions/CanBeReturned';
import CanBeStolen from '@/components/game/interactions/minions/CanBeStolen';
import CanReceiveEnergyShield from '@/components/game/interactions/minions/CanReceiveEnergyShield';
import CanReceiveOnslaught from '@/components/game/interactions/minions/CanReceiveOnslaught';
import CanReceiveGuard from '@/components/game/interactions/minions/CanReceiveGuard';
import CanBeAttackedBySpell from './CanBeAttackedBySpell';
import CanBeAttackedByWarcry from './CanBeAttackedByWarcry';
import CanBeAttackedByMinion from './CanBeAttackedByMinion';
import CanBeAttackedByPlayer from './CanBeAttackedByPlayer';

export default function YourMinionInteractions({
  G,
  ctx,
  moves,
  data,
  index,
  board,
  yourID,
  canAttack,
  canBeAttackedByMinion,
  canBeAttackedByPlayer,
  canBeAttackedBySpell,
  canBeAttackedByWarcry,
  canBeBuffed,
  canBeHealed,
  canBeDebuffed,
  canBeExpired,
  canBeReturned,
  canBeSacrificed,
  canBeStolen,
  canReceiveEnergyShield,
  canReceiveGuard,
  canReceiveOnslaught,
  hasBoon,
  hasEnergyShield,
  hasGuard,
  hasOnslaught,
  isAttacking,
  isConcealed,
  isCursed,
  isDisabled,
  willExpire,
  dev
}) {
  const { selectedCardObject } = G;

  if (dev && canBeAttackedBySpell) {
    return <CanBeAttackedBySpell moves={moves} index={index} />;
  }

  if (dev && canBeAttackedByWarcry) {
    return <CanBeAttackedByWarcry moves={moves} index={index} />;
  }

  if (dev && canBeAttackedByMinion) {
    return (
      <CanBeAttackedByMinion G={G} ctx={ctx} moves={moves} index={index} />
    );
  }

  if (dev && canBeAttackedByPlayer) {
    return <CanBeAttackedByPlayer moves={moves} index={index} />;
  }

  if (canBeHealed) {
    return (
      <CanBeHealed G={G} ctx={ctx} moves={moves} index={index} board={board} />
    );
  }

  if (canBeBuffed) {
    return <CanBeBuffed G={G} ctx={ctx} moves={moves} index={index} />;
  }

  if (canBeDebuffed) {
    return <CanBeDebuffed moves={moves} index={index} />;
  }

  if (canBeExpired) {
    return <CanBeExpired moves={moves} index={index} />;
  }

  if (canBeReturned) {
    return <CanBeReturned moves={moves} index={index} targetContext={1} />;
  }

  if (canBeSacrificed) {
    return <CanBeSacrificed moves={moves} index={index} />;
  }

  if (canBeStolen) {
    return <CanBeStolen moves={moves} index={index} />;
  }

  if (canReceiveEnergyShield) {
    return <CanReceiveEnergyShield moves={moves} index={index} />;
  }

  if (canReceiveGuard) {
    return <CanReceiveGuard G={G} ctx={ctx} moves={moves} index={index} />;
  }

  if (canReceiveOnslaught) {
    return <CanReceiveOnslaught G={G} ctx={ctx} moves={moves} index={index} />;
  }

  if (canAttack && !isAttacking && selectedCardObject[yourID] === null) {
    return <CanAttack data={data} moves={moves} index={index} />;
  }

  if (canAttack && isAttacking) {
    return <IsAttacking moves={moves} />;
  }

  return null;
}

YourMinionInteractions.propTypes = {
  G: PropTypes.object,
  ctx: PropTypes.object,
  moves: PropTypes.object,
  data: PropTypes.object,
  yourID: PropTypes.string,
  index: PropTypes.number,
  board: PropTypes.string,
  canAttack: PropTypes.bool,
  canBeAttackedByMinion: PropTypes.bool,
  canBeAttackedByPlayer: PropTypes.bool,
  canBeAttackedBySpell: PropTypes.bool,
  canBeAttackedByWarcry: PropTypes.bool,
  canBeBuffed: PropTypes.bool,
  canBeHealed: PropTypes.bool,
  canBeDebuffed: PropTypes.bool,
  canBeExpired: PropTypes.bool,
  canBeReturned: PropTypes.bool,
  canBeSacrificed: PropTypes.bool,
  canBeStolen: PropTypes.bool,
  canReceiveEnergyShield: PropTypes.bool,
  canReceiveGuard: PropTypes.bool,
  canReceiveOnslaught: PropTypes.bool,
  hasBoon: PropTypes.bool,
  hasEnergyShield: PropTypes.bool,
  hasGuard: PropTypes.bool,
  hasOnslaught: PropTypes.bool,
  isAttacking: PropTypes.bool,
  isConcealed: PropTypes.bool,
  isCursed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  willExpire: PropTypes.bool,
  dev: PropTypes.bool
};

YourMinionInteractions.defaultProps = {
  canBeAttackedByMinion: false,
  canBeAttackedByPlayer: false,
  canBeAttackedBySpell: false,
  canBeAttackedByWarcry: false,
  dev: false
};
