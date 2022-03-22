import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import { Option } from './DropDownOptions';
import axios from 'axios';

export const AllItems = (props) => {
  const [items, setItems] = useState([]);
  const [optionSelected, setOptionSelected] = useState([]);

  useEffect(() => {
    // once component is mounted, get our list of items
    console.log('using useEffect');
    const fetchData = async () => {
      const { data } = await axios.get(`/api/items`);
      setItems(data);
    };

    fetchData();
  }, []);

  const handleChange = (selected) => {
    console.log('handleChangeSelectedOoption: ', selected);

    setOptionSelected(selected);
  };

  const studyOptions = items.map((item) => {
    return {
      value: item.title,
      label: item.title,
    };
  });

  return (
    <span
      className='d-inline-block'
      data-toggle='popover'
      data-trigger='focus'
      data-content='Please selecet account(s)'
    >
      <ReactSelect
        options={studyOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleChange}
        allowSelectAll={true}
        value={optionSelected}
      />
    </span>
  );
};

export default AllItems;