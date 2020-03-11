import React from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import FourSquare from '../../assets/imgs/foursquare.svg';
import PoliceCar from '../../assets/imgs/police-car.png';
import Top from '../Top/Top';
import './Details.css';

const Details = (props) => {
  return (
    <div>
      <Top />
      <h2>
        Message Recieved
      </h2>
      <h2>
        Send More Information
      </h2>
      <div className="results">
        <ul className="results-list">
          <button
            onClick={() => console.log('police')}
            tabIndex="0"
            className="result-item"
            style={{ backgroundColor: '#cfd8dc' }}
          >
            <img
              src={PoliceCar}
              alt="car"
              className="icon"
              title="Red Cross Icon"
            />
            <p>Specific Emergency?</p>
          </button>
          <button
            onClick={() => console.log('marker')}
            tabIndex="1"
            className="result-item"
            style={{ backgroundColor: '#cfd8dc' }}
          >
            <img
              src={FourSquare}
              alt="marker"
              className="icon"
              title="Police Car Icon"
            />
              <p>Specific Location?</p>
          </button>
        </ul>
        <button
          onClick={() => props.setPol()}
          tabIndex="1"
          className="result-item"
          style={{ backgroundColor: 'blue' }}
        >
          <p>Send Message</p>
        </button>
      </div>
    </div>
  );
};

export default Details;
