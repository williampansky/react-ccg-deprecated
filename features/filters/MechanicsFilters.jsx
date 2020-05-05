import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function MechanicsFilters({ active, data, onClick }) {
  const animatedComponents = makeAnimated();

  return data ? (
    <Component>
      {/* <div className="label">Mechanics</div> */}
      <Select
        className="select"
        classNamePrefix="mechanics"
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        menuPlacement="top"
        onChange={selectedOption => onClick(selectedOption)}
        options={data}
        placeholder="Mechanics"
        width="100%"
      />
    </Component>
  ) : null;
}

MechanicsFilters.propTypes = {
  active: PropTypes.array,
  data: PropTypes.array,
  onClick: PropTypes.func
};

MechanicsFilters.defaultTypes = {
  data: [],
  onClick: () => {}
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

  .mechanics__value-container {
    max-height: 40px;
    overflow-y: auto;
  }
`;
