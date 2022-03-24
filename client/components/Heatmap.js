import React, { useState, useEffect } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';
import axios from 'axios';

const xLabels = ['Criteria A', 'Criteria B', 'Criteria C', 'Criteria D'];

const Heatmap = (props) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const { optionSelected } = props;

  console.log('option: ', optionSelected.length);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/countries`);

      setCountries(data);
    };

    fetchData();
  }, []);

  const yLabels = countries
    .filter((country) => country.id > optionSelected.length)
    .map((country) => country.name);

  const data = new Array(yLabels.length).fill(0).map((q, e, w) =>
    new Array(xLabels.length).fill(0).map((a, b, c) => {
      // console.log('a: ', a, 'b: ', b, 'c: ', c);
      // console.log('q: ', q, 'w: ', w, 'e: ', e);

      const fakeRandomNum = yLabels[e].length;
      const fakeRandomNumB = fakeRandomNum + b;
      const fakeRandomNumC = fakeRandomNum + 2 * b;

      // console.log('b: ', b);
      // console.log('fakeRandom: ', fakeRandomNum);
      // console.log('fakeRandomB: ', fakeRandomNumB);

      if (fakeRandomNum % 2 === 1) {
        return Math.floor((fakeRandomNum / fakeRandomNumC) * 50 + 50);
      } else if (fakeRandomNum <= 5) {
        return Math.floor((fakeRandomNum / optionSelected.length) * 50 + 50);
      } else {
        return Math.floor((fakeRandomNum / fakeRandomNumB) * 50 + 50);
      }
    })
  );

  const color = (_x, _y, ratio) => {
    if (yLabels.length % 1 === 0 && _x % 2 === 1) {
      if (ratio > 0.6) {
        return {
          background: `rgb(0, 255, 0, ${ratio})`,
          fontSize: '1rem',
          color: `rgb(0, 0, 0, ${ratio})`,
        };
      }

      if (ratio < 0.6 && ratio > 0.4) {
        return {
          background: `rgb(255, 255, 0, ${ratio})`,
          fontSize: '1rem',
          color: `rgb(0, 0, 0, ${ratio})`,
        };
      }

      if (ratio < 0.4) {
        return {
          background: `rgb(255, 0, 0, ${ratio})`,
          fontSize: '1rem',
          color: `rgb(0, 0, 0, ${ratio})`,
        };
      }
    } else {
      if (ratio > 0.6) {
        return {
          background: `rgb(255, 0, 0, ${ratio})`,
          fontSize: '1rem',
          color: `rgb(0, 0, 0, ${ratio})`,
        };
      }

      if (ratio < 0.6 && ratio > 0.4) {
        return {
          background: `rgb(0, 255, 0, ${ratio})`,
          fontSize: '1rem',
          color: `rgb(0, 0, 0, ${ratio})`,
        };
      }

      if (ratio < 0.4) {
        return {
          background: `rgb(255, 255, 0, ${ratio})`,
          fontSize: '1rem',
          color: `rgb(0, 0, 0, ${ratio})`,
        };
      }
    }
  };

  const selectCountryHandler = (countryName) => {
    let updatedList;

    if (selectedCountries.includes(countryName)) {
      updatedList = selectedCountries.filter(
        (selectedCountry) => selectedCountry !== countryName
      );
    } else {
      updatedList = [...selectedCountries, countryName];
    }

    setSelectedCountries(updatedList);
  };

  return (
    <>
      {yLabels.length > 0 ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
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
            onClick={(x, y) => selectCountryHandler(yLabels[x])}
            yLabelsPos='left'
            square
          />
          <div style={{ marginLeft: '5rem' }}>
            Selected Countries:{' '}
            <button
              style={{ backgroundColor: 'white', color: '#c3272b' }}
              onClick={() => {
                if (selectedCountries.length > 0) {
                  alert('Your selections have been submitted.');
                } else {
                  alert('Please select at least one country to submit.');
                }
              }}
            >
              Submit
            </button>
            <div style={{ marginTop: '1rem' }}>
              {selectedCountries.length > 0
                ? selectedCountries.map((countryName) => {
                    return <div>{countryName}</div>;
                  })
                : 'Click on a row to select a country'}
            </div>
          </div>
        </div>
      ) : (
        <div>No criteria provided.</div>
      )}
    </>
  );
};

export default Heatmap;
