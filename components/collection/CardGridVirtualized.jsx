import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/collection/Card';
import { useRouter } from 'next/router';
import { Grid } from 'react-virtualized';

export default function CardGrid({
  addSelectedCardCallback,
  data,
  handleClass,
  handleTooltipClick
}) {
  const router = useRouter();
  const { query } = router;

  function cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style}>
        {data[rowIndex][columnIndex]}
      </div>
    );
  }

  return (
    <div className="" deckid={query}>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={3}
        columnWidth={100}
        height={300}
        rowCount={data.length}
        rowHeight={300}
        width={1000}
      />
    </div>
  );
}

CardGrid.propTypes = {
  addSelectedCardCallback: PropTypes.func,
  data: PropTypes.array,
  handleClass: PropTypes.func,
  handleTooltipClick: PropTypes.func
};

CardGrid.defaultProps = {
  addSelectedCardCallback: () => {},
  data: [],
  handleClass: () => {},
  handleTooltipClick: () => {}
};
