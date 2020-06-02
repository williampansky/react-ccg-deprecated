import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import Card from '@/components/collection/Card';

export default function CardGridVirtualized({
  addSelectedCardCallback,
  data,
  error,
  handleClass,
  handleTooltipClick,
  isLoading,
  itemCount
}) {
  function diff(a, b) {
    return a > b ? a - b : b - a;
  }

  return (
    <React.Fragment>
      <AutoSizer>
        {({ height, width }) => {
          const itemsPerRow =
            width >= 960
              ? Math.floor(width / (400 / 1.36))
              : Math.floor(width / 175);
          const rowCount = Math.ceil(data.length / itemsPerRow);

          return (
            <List
              className="card__grid"
              height={height}
              rowCount={rowCount}
              rowHeight={width >= 960 ? 440 : 195}
              width={width}
              rowRenderer={({ index, key, style }) => {
                const items = [];
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(fromIndex + itemsPerRow, data.length);

                for (let i = fromIndex; i < toIndex; i++) {
                  items.push(
                    <div
                      className={[
                        'card__item__wrapper',
                        handleClass(data[i])
                      ].join(' ')}
                      key={i}
                    >
                      <div
                        className="tooltip"
                        onClick={() => handleTooltipClick(data[i])}
                        onKeyPress={() => handleTooltipClick(data[i])}
                        role="button"
                        tabIndex={-1}
                      >
                        <img
                          alt={`${data[i].name} Card Information`}
                          role="presentation"
                          src="/images/ui/UI_Tooltip.png"
                        />
                      </div>
                      <div
                        className="card__wrapper"
                        data-is-loading={isLoading}
                      >
                        <Card
                          active={data[i].active}
                          artist={data[i].artist}
                          attack={data[i].attack}
                          cardClass={data[i].cardClass}
                          collectible={data[i].collectible}
                          cost={data[i].cost}
                          elite={data[i].elite}
                          entourage={data[i].entourage}
                          flavor={data[i].flavor}
                          goldenImageSrc={data[i].goldenImageSrc}
                          health={data[i].health}
                          hideStats={data[i].hideStats}
                          howToEarn={data[i].howToEarn}
                          howToEarnGolden={data[i].howToEarnGolden}
                          id={data[i].id}
                          isGolden={data[i].isGolden}
                          mechanics={data[i].mechanics}
                          name={data[i].name}
                          numberOvercharge={data[i].numberOvercharge}
                          numberPrimary={data[i].numberPrimary}
                          numberRNG={data[i].numberRNG}
                          numberSecondary={data[i].numberSecondary}
                          onClick={() => addSelectedCardCallback(data[i])}
                          playContext={data[i].playContext}
                          playRequirements={data[i].playRequirements}
                          playType={data[i].playType}
                          race={data[i].race}
                          rarity={data[i].rarity}
                          set={data[i].set}
                          sounds={data[i].sounds}
                          spellDamage={data[i].spellDamage}
                          targetingArrowText={data[i].targetingArrowText}
                          text={data[i].text}
                          type={data[i].type}
                        />
                      </div>
                      {itemCount(data[i]) && (
                        <div className="card__item__count">
                          <div className="card__item__count__border">
                            <span
                              className="text__value"
                              data-value={itemCount(data[i])}
                            >
                              {itemCount(data[i])}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (diff(fromIndex, toIndex) < itemsPerRow) {
                  let diff1 = diff(fromIndex, toIndex);
                  let diff2 = diff(diff1, itemsPerRow);
                  for (let d = 0; d < diff2; d++) {
                    items.push(<div className="blank__card__item" key={d} />);
                  }
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

CardGridVirtualized.propTypes = {
  addSelectedCardCallback: PropTypes.func,
  data: PropTypes.array,
  error: PropTypes.object,
  handleClass: PropTypes.func,
  handleTooltipClick: PropTypes.func,
  isLoading: PropTypes.bool,
  itemCount: PropTypes.func
};

CardGridVirtualized.defaultProps = {
  addSelectedCardCallback: () => {},
  data: [],
  error: null,
  handleClass: () => {},
  handleTooltipClick: () => {},
  isLoading: true,
  itemCount: () => {}
};
