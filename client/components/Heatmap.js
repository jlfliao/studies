import React, { useState, useEffect } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';
import axios from 'axios';

const xLabels = ['Criteria A', 'Criteria B', 'Criteria C', 'Criteria D'];

const Heatmap = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/countries`);

      setCountries(data);
    };

    fetchData();
  }, []);

  const yLabels = countries
    .filter((country) => country.id > Math.random() * 16)
    .map((country) => country.name);

  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 50 + 50))
    );

  const color = (_x, _y, ratio) => {
    if (ratio > 0.5) {
      return {
        background: `rgb(0, 255, 0, ${ratio})`,
        fontSize: '1rem',
        color: `rgb(0, 0, 0, ${ratio})`,
      };
    } else {
      return {
        background: `rgb(255, 0, 0, ${ratio})`,
        fontSize: '1rem',
        color: `rgb(0, 0, 0, ${ratio})`,
      };
    }
  };

  return (
    <>
      {yLabels.length > 0 ? (
        <div
          style={{
            width: '100%',
          }}
        >
          <HeatMapGrid
            data={data}
            xLabels={xLabels}
            yLabels={yLabels}
            // Reder cell with tooltip
            cellRender={(x, y, value) => (
              <div
                title={`Pos(${x}, ${y}) = ${value}`}
                width='40px'
                height='40px'
              >
                {/* {value} */}
              </div>
            )}
            xLabelsStyle={(index) => ({
              // color: index % 2 ? 'transparent' : '#777',
              fontSize: '1rem',
            })}
            yLabelsStyle={() => ({
              fontSize: '1rem',
              textTransform: 'uppercase',
              color: '#777',
            })}
            cellStyle={color}
            cellHeight='3.5rem'
            xLabelsPos='top'
            // onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
            yLabelsPos='left'
            square
          />
        </div>
      ) : (
        <div>No criteria provided.</div>
      )}
    </>
  );
};

export default Heatmap;
