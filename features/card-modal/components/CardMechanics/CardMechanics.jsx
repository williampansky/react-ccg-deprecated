import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import replaceConstant from '@/utils/replace-constants';
import getConstantDescription from '@/utils/get-constant-description';
import styles from './styles.module.scss';

export default function CardMechanics({ data }) {
  return data !== [] ? (
    <div className={styles.component}>
      {data.map(mechanic => {
        return (
          <div className={styles.item} key={mechanic}>
            <div
              className={[styles.mechanic, 'text__value'].join(' ')}
              data-for={mechanic}
              data-tip={true}
            >
              <span>{replaceConstant(mechanic)}</span>
            </div>
            <ReactTooltip id={mechanic} effect="solid" place={'top'}>
              <p className={styles.description}>
                {getConstantDescription(mechanic)}
              </p>
            </ReactTooltip>
          </div>
        );
      })}
    </div>
  ) : null;
}

CardMechanics.propTypes = {
  data: PropTypes.array
};

CardMechanics.defaultProps = {
  data: []
};
