import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import Card from '@/components/collection/Card';

export default function CardGridWindow({
  addSelectedCardCallback,
  data,
  error,
  handleClass,
  handleTooltipClick,
  isLoading,
  itemCount
}) {
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
              // columnCount={2}
              // columnWidth={0.25}
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
                          playRequirements={data[i].playRequirements}
                          race={data[i].race}
                          rarity={data[i].rarity}
                          set={data[i].set}
                          sounds={data[i].sounds}
                          spellContext={data[i].spellContext}
                          spellDamage={data[i].spellDamage}
                          spellType={data[i].spellType}
                          targetingArrowText={data[i].targetingArrowText}
                          text={data[i].text}
                          type={data[i].type}
                          warcryNumber={data[i].warcryNumber}
                          onClick={() => addSelectedCardCallback(data[i])}
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

CardGridWindow.propTypes = {
  addSelectedCardCallback: PropTypes.func,
  data: PropTypes.array,
  error: PropTypes.object,
  handleClass: PropTypes.func,
  handleTooltipClick: PropTypes.func,
  isLoading: PropTypes.bool,
  itemCount: PropTypes.func
};

CardGridWindow.defaultProps = {
  addSelectedCardCallback: () => {},
  data: [],
  error: null,
  handleClass: () => {},
  handleTooltipClick: () => {},
  isLoading: true,
  itemCount: () => {}
};
