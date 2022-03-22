import React, { useEffect, useState } from 'react';
import { default as ReactSelect } from 'react-select';
import { Option } from './DropDownOptions';
import axios from 'axios';
import Heatmap from './Heatmap';
import Table from './Table';

export const AllItems = (props) => {
  const [items, setItems] = useState([]);
  const [optionSelected, setOptionSelected] = useState([]);
  const [displayHeatmap, setDisplayHeatmap] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);

  // console.log('options selected: ', optionSelected);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/items`);

      setItems(data);
    };

    fetchData();
  }, []);

  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  const handleSubmit = () => {
    if (optionSelected.length > 0) {
      setDisplayHeatmap(!displayHeatmap);
      setDisplayTable(false);
    } else {
      alert('Please select at least 1 study');
    }
  };

  const handleViewStudies = () => {
    if (optionSelected.length > 0) {
      setDisplayTable(true);
      setDisplayHeatmap(false);
    } else {
      alert('Please select at least 1 study');
    }
  };

  const studyOptions = items.map((item) => {
    return {
      value: item.id,
      label: item.title,
    };
  });

  const selectedStudyIDs = optionSelected.map(
    (selectedStudy) => selectedStudy.value
  );

  const selectedStudiesTableArray = items.filter((item) =>
    selectedStudyIDs.includes(item.id)
  );

  return (
    <div>
      <button onClick={handleSubmit}>
        {displayHeatmap ? 'Back' : 'Submit'}
      </button>
      <button onClick={handleViewStudies}>View Selected Studies</button>
      <br />
      <div>
        {displayHeatmap ? (
          <Heatmap />
        ) : displayTable ? (
          <Table selectedStudies={selectedStudiesTableArray} />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AllItems;
