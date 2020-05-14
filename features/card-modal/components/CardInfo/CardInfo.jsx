import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

// direct child components
import CardName from '../CardName/CardName';
import CardFlavor from '../CardFlavor/CardFlavor';
import CardMechanics from '../CardMechanics/CardMechanics';
import CardInfoList from '../CardInfoList/CardInfoList';

export default function CardInfo({ data, database }) {
  const animation = 'magictime vanishIn';

  const { active, name, flavor, dynamicSpellDamageText, mechanics } = data;

  return (
    <div className={[styles.component, animation].join(' ')}>
      <CardName active={active} name={name} />
      <CardFlavor spellDmg={dynamicSpellDamageText} text={flavor} />
      <CardMechanics data={mechanics} />
      <CardInfoList data={data} database={database} />
    </div>
  );
}

CardInfo.propTypes = {
  data: PropTypes.object,
  database: PropTypes.array
};

CardInfo.defaultProps = {
  database: []
};
