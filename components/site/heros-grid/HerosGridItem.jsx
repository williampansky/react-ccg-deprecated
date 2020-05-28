import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Img from 'react-image';

export default function HerosGridItem({
  name,
  symbol,
  archetype,
  ability1,
  ability2,
  ability3,
  lore,
  artist,
  slug,
  idx
}) {
  function path(string) {
    return `/images/heros/${string.replace(/(%)/g, '')}`;
  }

  return (
    <React.Fragment>
      <div className="card__wrapper">
        <Link href="heros/[slug]" as={`/heros/${slug}`}>
          <a
            className="hero__item uk-animation-slide-bottom-small"
            style={{ animationDelay: `${idx}00ms` }}
          >
            <Img
              alt={`${name} by ${artist}`}
              className="hero__image"
              decode={false}
              src={[
                `${path(symbol)}/default.jpg`,
                `${path(symbol)}/default2x.jpg`
              ]}
              loader={<div className="hero__image__loader" />}
              unloader={
                <img
                  alt=""
                  className="hero__image"
                  src="/images/sets/PLACEHOLDER.jpg"
                />
              }
            />
            <span className="hero__name">
              <span className="text__value">{name}</span>
            </span>
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
}

HerosGridItem.propTypes = {
  data: PropTypes.object,
  idx: PropTypes.number
};

HerosGridItem.defaultProps = {
  data: {}
};
