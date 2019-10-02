import React from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import './Filter.css';
import RedCross from '../../assets/imgs/red-cross-2.png';
import PoliceCar from '../../assets/imgs/police-car.png';
import Fire from '../../assets/imgs/fire.png';
{/*import FilterIcon from '../../assets/imgs/funnel.svg';*/}

const Filter = ({ data, filterPlaces, onToggleOpen }) => {
  const { places, showingPlaces } = data;

  return (
    <aside className="filter">
      <h2 className="filter-title" tabIndex="0">
        {/*<img
          src={FilterIcon}
          alt="Filter"
          className="icon"
          title="Filter icon"
        />*/}
        Emergency Help Needed?
      </h2>
      {/*<div className="input-wrapper">
        <Debounce time="300" handler="onChange">
          <input
            type="text"
            placeholder="Type a location name here to filter places"
            aria-label="Type a location name here to filter places"
            onChange={e => filterPlaces(e.target.value)}
          />
        </Debounce>
      </div>*/}
      <div className="results">
        {/*<p className="results-summary">
          Showing <strong>{showingPlaces.length}</strong> of{' '}
          <strong>{places.length}</strong> places.
        </p>*/}
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
    </aside>
  );
};

Filter.propTypes = {
  data: PropTypes.object.isRequired,
  onToggleOpen: PropTypes.func.isRequired,
  filterPlaces: PropTypes.func.isRequired
};

export default Filter;
