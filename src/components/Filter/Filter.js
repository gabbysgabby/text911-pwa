import React from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import './Filter.css';
import RedCross from '../../assets/imgs/red-cross-2.png';
import PoliceCar from '../../assets/imgs/police-car.png';
import Fire from '../../assets/imgs/fire.png';
import SwipeableButton from '../Common/SwipeableButton';

const Filter = (props) => {
  return (
    <div className="filter">
      <h2 className="filter-title" tabIndex="0">
        Emergency Help Needed?
      </h2>
      <div className="results">
        <ul className="results-list" tabIndex="0">
          <button
            tabIndex="0"
            className="result-item"
          >
            <img
              src={RedCross}
              alt="red cross"
              className="icon"
              title="Red Cross Icon"
            />
            <p>Medical</p>
          </button>
          <button
            tabIndex="1"
            className="result-item"
          >
            <img
              src={PoliceCar}
              alt="policecar"
              className="icon"
              title="Police Car Icon"
            />
              <p>Police</p>
          </button>
          <button
            tabIndex="2"
            className="result-item"
          >
            <img
              src={Fire}
              alt="fire"
              className="icon"
              title="Fire Icon"
            />
            <p>Fire</p>
          </button>
        </ul>
      </div>
      <SwipeableButton onSuccess={() => props.onSuccess} color='red' text='Slide to Contact 911' />
    </div>
  );
};

export default Filter;
