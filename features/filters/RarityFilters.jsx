import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';

export default function RarityFilters({ active, data, onChange }) {
  return data ? (
    <Component>
      {/* <div className="label">Race</div> */}
      <Select
        className="select"
        isClearable
        isSearchable
        menuPlacement="top"
        onChange={selectedOption =>
          selectedOption === null
            ? onChange(null)
            : onChange(selectedOption.value)
        }
        options={data}
        placeholder="Rarity"
        width="100%"
      />
    </Component>
  ) : null;
}

RarityFilters.propTypes = {
  active: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func
};

RarityFilters.defaultTypes = {
  data: [],
  onChange: () => {}
};

const Component = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin: 0 10px 0 0;
  height: 40px;
  width: 100%;

  .label {
    color: white;
    text-transform: uppercase;
    font-family: 'Verdana', monospace;
    font-size: 10px;
    margin: 0 0 4px;
    text-align: left;
  }

  .select {
    width: 100%;
  }
`;
