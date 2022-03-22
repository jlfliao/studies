import { components } from 'react-select';
import React from 'react';

export const Option = (props) => {
  console.log('option props: ', props.isSelected);
  return (
    <div>
      <components.Option {...props}>
        <input
          type='checkbox'
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
