import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import replaceConstant from '@/utils/replace-constants';
import styles from './styles.module.scss';

// direct child components
import CardName from '../CardName/CardName';
import CardFlavor from '../CardFlavor/CardFlavor';
import CardMechanics from '../CardMechanics/CardMechanics';
import CardInfoList from '../CardInfoList/CardInfoList';

export default function CardInfo({ data, database }) {
  const { numberOfResults } = useSelector(s => s.filteredResults);
  const animation =
    numberOfResults <= 35
      ? 'magictime vanishIn'
      : 'uk-animation-fade uk-animation-delay';

  const { active, name, flavor, dynamicSpellDamageText, mechanics } = data;

  return (
    <div className={[styles.component, animation].join(' ')}>
      <CardName active={active} name={replaceConstant(name)} />
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
