import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import HerosGridItem from './HerosGridItem';

export default function HerosGridVirtualized({ data }) {
  return (
    <React.Fragment>
      <AutoSizer>
        {({ height, width }) => {
          const itemsPerRow =
            width >= 960
              ? Math.floor(width / (400 / 1.36))
              : Math.floor(width / 200);
          const rowCount = Math.ceil(data.length / itemsPerRow);

          return (
            <List
              className="card__grid"
              height={height}
              rowCount={rowCount}
              rowHeight={width >= 960 ? 440 : 220}
              width={width}
              rowRenderer={({ index, key, style }) => {
                const items = [];
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(fromIndex + itemsPerRow, data.length);

                for (let i = fromIndex; i < toIndex; i++) {
                  items.push(
                    <div className="card__item__wrapper" key={i}>
                      <HerosGridItem
                        name={data[i].name}
                        symbol={data[i].symbol}
                        archetype={data[i].archetype}
                        ability1={data[i].ability1}
                        ability2={data[i].ability2}
                        ability3={data[i].ability3}
                        lore={data[i].lore}
                        artist={data[i].artist}
                        slug={data[i].slug}
                        idx={i}
                      />
                    </div>
                  );
                }

                return (
                  <div className="card__grid-row" key={key} style={style}>
                    {items}
                  </div>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </React.Fragment>
  );
}

HerosGridVirtualized.propTypes = {
  data: PropTypes.array
};

HerosGridVirtualized.defaultProps = {
  data: []
};
