import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import exists from 'utils/element.exists';
import CARDCLASS from 'enums/cardClass.enums';

export default function DeckSlot({ deckClass, deckName, slotIndex }) {
  function imageSrc(string, type) {
    if (!exists(string)) return;
    const str = string.replace(/(%)/g, '');
    switch (type) {
      case 'BADGE':
        return `assets/images/classes/${str}/BADGE.png`;
      default:
        return `url(assets/images/classes/${str}/DEFAULT.jpg)`;
    }
  }

  function imgPosition(string) {
    // prettier-ignore
    switch (string) {
      case CARDCLASS[1]:  return '-80px';
      case CARDCLASS[2]:  return '-80px';
      case CARDCLASS[3]:  return '-50px';
      case CARDCLASS[4]:  return '-80px';
      case CARDCLASS[5]:  return '-145px';
      case CARDCLASS[6]:  return '-90px';
      case CARDCLASS[7]:  return '-125px';
      case CARDCLASS[8]:  return '-120px';
      case CARDCLASS[9]:  return '-35px';
      default:            return 'center';
    }
  }

  return (
    <Component>
      <h1>
        <span className="text__value">
          {deckName ? deckName : `${slotIndex} Slot`}
        </span>
      </h1>

      {deckClass && <StyledBadge src={imageSrc(deckClass, 'BADGE')} />}

      <StyledAvatar
        imgPosition={imgPosition(deckClass)}
        imgSrc={
          deckClass ? imageSrc(deckClass) : `url(assets/images/texture.jpg)`
        }
      />
    </Component>
  );
}

DeckSlot.propTypes = {
  deckClass: PropTypes.string,
  deckName: PropTypes.string,
  slotIndex: PropTypes.number
};

DeckSlot.defaultProps = {
  slotIndex: 1
};

const Component = styled.article`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 10px 20px;
  position: relative;

  @media (min-width: 1440px) {
    max-width: 25vw;
  }

  h1 {
    margin: 0 auto 4px;
  }
`;

const StyledAvatar = styled.div`
  background-image: ${p => p.imgSrc};
  background-position: ${p => `center ${p.imgPosition}`};
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid rgba(0, 0, 0, 0.465);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  height: 70px;
`;

const StyledBadge = styled.img`
  height: 100px;
  position: absolute;
  right: 0;
  top: 0;
`;
