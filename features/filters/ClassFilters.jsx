import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import CARDCLASS from 'enums/cardClass.enums';
import replaceConstant from 'utils/replace-constants';
import styles from './class-filters.module.scss';

const Buttons = ({
  active,
  availableCardClasses,
  selectedCardClass,
  onClick
}) => {
  return (
    <React.Fragment>
      {/* <Switch>
        <Route path={`/decks/:deckId`}>
          <div className="flex">
            <button
              className={active === CARDCLASS[0] ? 'active' : ''}
              onClick={e => onClick(e)}
              value={CARDCLASS[0]}
            >
              <span>{replaceConstant(CARDCLASS[0])}</span>
            </button>
            <button
              className={active === selectedCardClass ? 'active' : ''}
              onClick={e => onClick(e)}
              value={selectedCardClass}
            >
              <span>{replaceConstant(selectedCardClass)}</span>
            </button>
          </div>
        </Route>
        <Route path={`/`}> */}
      <div className={styles.flex}>
        {availableCardClasses
          .map(obj => {
            const { label, value } = obj;
            return (
              <button
                className={[
                  styles.button,
                  active === value ? styles.active : ''
                ].join(' ')}
                key={label}
                onClick={e => onClick(e)}
                value={value}
              >
                <span>{label}</span>
              </button>
            );
          })
          .sort((a, b) => a._order - b._order)}
      </div>
      {/* </Route>
      </Switch> */}
    </React.Fragment>
  );
};

// const Selects = ({
//   active,
//   availableCardClasses,
//   selectedCardClass,
//   onClick
// }) => {
//   return (
//     <React.Fragment>
//       <Switch>
//         <Route path={`/decks/:deckId`}>
//           <select onChange={e => onClick(e)}>
//             <option value={CARDCLASS[0]}>
//               {replaceConstant(CARDCLASS[0])}
//             </option>
//             <option value={selectedCardClass}>
//               {replaceConstant(selectedCardClass)}
//             </option>
//           </select>
//         </Route>
//         <Route path={`/`}>
//           <select onChange={e => onClick(e)}>
//             {availableCardClasses
//               .map(obj => {
//                 const { name, value } = obj;
//                 return (
//                   <option key={name} value={value}>
//                     {name}
//                   </option>
//                 );
//               })
//               .sort((a, b) => a._order - b._order)}
//           </select>
//         </Route>
//       </Switch>
//     </React.Fragment>
//   );
// };

export default function ClassFilters({ active, data, onClick, onChange }) {
  const router = useRouter();
  const { query } = router;
  const decks = useSelector(state => state.decks);
  const deck = decks[query];
  const isDesktopOrLaptop = useMediaQuery(
    { minDeviceWidth: 1200 },
    { deviceWidth: 1200 }
  );

  return data ? (
    <div className={styles.component} deckid={query}>
      {isDesktopOrLaptop ? (
        <Buttons
          active={active}
          availableCardClasses={data}
          selectedCardClass={deck && deck.class}
          onClick={onClick}
        />
      ) : (
        // <Selects
        //   active={active}
        //   availableCardClasses={data}
        //   selectedCardClass={deck && deck.class}
        //   onClick={onClick}
        // />
        <div className="select-wrapper">
          {/* <Select
            className={styles.select}
            defaultValue={data.find(obj => obj._order === 0)}
            menuPlacement="top"
            onChange={selectedOption => onChange(selectedOption.value)}
            options={data}
            width="100%"
          /> */}
        </div>
      )}
    </div>
  ) : null;
}

ClassFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

ClassFilters.defaultTypes = {
  data: [],
  onClick: () => {}
};
