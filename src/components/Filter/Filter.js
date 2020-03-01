import React from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import './Filter.css';
import RedCross from '../../assets/imgs/red-cross-2.png';
import PoliceCar from '../../assets/imgs/police-car.png';
import Fire from '../../assets/imgs/fire.png';

const Filter = () => {
  return (
    <div className="filter">
      <h2 className="filter-title" tabIndex="0">
        Emergency Help Needed?
      </h2>
      <div className="results">
        <ul className="results-list" tabIndex="0">
          <li
            className="result-item"
            tabIndex="0"
          >
            <img
              src={RedCross}
              alt="red cross"
              className="icon"
              title="Red Cross Icon"
            />
            Medical
          </li>
          <li
            className="result-item"
            tabIndex="0"
          >
            <img
              src={PoliceCar}
              alt="policecar"
              className="icon"
              title="Police Car Icon"
            />
              Police
          </li>
          <li
            className="result-item"
            tabIndex="0"
          >
            <img
              src={Fire}
              alt="fire"
              className="icon"
              title="Fire Icon"
            />
            Fire
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
