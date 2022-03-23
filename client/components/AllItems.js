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
      setDisplayTable(!displayTable);
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
    <div
      style={{
        width: '100%',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#c3272b',
            borderRadius: '10px',
            height: '50px',
            width: 'auto',
            color: 'white',
            fontSize: '1rem',
            padding: '1rem',
            marginRight: '0.5rem',
            fontWeight: 'bold',
            marginRight: '1rem',
            paddingLeft: '25px',
            paddingRight: '25px',
          }}
        >
          {displayHeatmap ? 'Back' : 'Submit'}
        </button>
        <button
          onClick={handleViewStudies}
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            color: '#c3272b',
            padding: '1rem',
            paddingLeft: '30px',
            paddingRight: '30px',
            fontSize: '1rem',
            height: '50px',
            width: 'auto',
            fontWeight: 'bold',
          }}
        >
          {displayTable ? 'Back' : 'View Selected Studies'}
        </button>
      </div>
      <br />
      <div style={{ width: '90%' }}>
        {displayHeatmap ? (
          <Heatmap />
        ) : displayTable ? (
          <Table selectedStudies={selectedStudiesTableArray} />
        ) : (
          <div style={{ paddingBottom: '1rem' }}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AllItems;
