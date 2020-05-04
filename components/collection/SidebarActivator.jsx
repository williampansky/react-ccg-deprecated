import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from 'features/sidebar/sidebar.slice';

export default function SidebarActivator({ active }) {
  const dispatch = useDispatch();
  return (
    <Component
      className={active ? 'active' : ''}
      onClick={() => dispatch(toggleSidebar())}
    >
      Your Decks
    </Component>
  );
}

SidebarActivator.propTypes = {
  active: PropTypes.bool
};

const Component = styled.button`
  cursor: pointer;
  font-family: 'Carter One', sans-serif;
  border: 0;
  margin: 0 0 0 10px;
  padding: 0 10px;
  text-transform: uppercase;
  white-space: nowrap;

  @media (min-width: 1920px) {
    font-size: 0.825em;
  }

  &.active {
    background: #1cbae5;
    color: white;
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
      0 0 1px black;
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;
