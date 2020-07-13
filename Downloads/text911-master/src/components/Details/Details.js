import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import Pin from '../../assets/imgs/pin_def.svg';
import Police from '../../assets/imgs/police-car.png';
import Top from '../Top/Top';
import DetailModal from './DetailModal';
import './Details.css';

const Details = (props) => {
  const [emergency, setEmergency] = useState(false);
  const [location, setLocation] = useState(false);
  const [icon, setIcon] = useState('');
  return (
    <div>
      <Top />
      <div className="detail-container">
        <h3 className="detail-message">
          Message Recieved
        </h3>
        <p className="detail-text">
          Please check your text messages for a response from your nearest 911 center. Turn your phone on silent mode.
        </p>
        <p className="detail-text-bold">
          If you do not receive a response, please call 911.
        </p>
      </div>
      <div className="more-info-container">
        <div className="more-info-wrapper">
          <h2 className="more-info-text">
            Send More Information
          </h2>
        </div>
        <div className="optional-container">
          <p className="optional-text">
            Optional
          </p>
        </div>
        <button
          onClick={() => setEmergency(true)}
          className="emergency-container"
        >
          <img
            src={Police}
            alt="police car"
            className="icon"
            title="Police Car Icon"
          />
          <p className="emergency-text">
            Specific Emergency?
          </p>
        </button>
        <button
          onClick={() => setLocation(true)}
          className="location-container"
        >
          <img
            src={Pin}
            alt="red cross"
            className="icon"
            title="Red Cross Icon"
          />
          <p className="emergency-text">
            Specific Location?
          </p>
        </button>
      </div>
      <div className="send-btn-container">
        <button
          onClick={() => console.log('send')}
          tabIndex="1"
          className="result-item"
          style={{
            backgroundColor: 'blue',
            width: 300,
            borderRadius: 25/2,
            marginTop: 40
          }}
        >
          <p className="btn-container">
            Send Message
          </p>
        </button>
      </div>
      <DetailModal
        show={emergency}
        buttons={[
          'Unconscious',
          'Crime',
          'Harassment',
          'Accident',
          'Shooting',
          'Robbery'
        ]}
        title="Specific Emergency?"
        setIcon={(b) => setIcon(b)}
        iconChecked={icon}
        dismiss={() => setEmergency(false)}
      />
      <DetailModal
        show={location}
        setIcon={(b) => setIcon(b)}
        iconChecked={icon}
        location
        buttons={[
          'Room Number',
          'Floor',
          'Bus/Train',
          'Highway'
        ]}
        title="Specific Location?"
        dismiss={() => setLocation(false)}
      />
    </div>
  );
};

export default Details;
