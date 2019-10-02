import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import MapStyles from '../../utils/mapStyles.json';
import MarkerInfo from '../MarkerInfo/MarkerInfo';
import './Map.css';

const Map = compose(
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={17}
    center={{ lat: 37.8006568, lng: -122.4516305 }}
    defaultOptions={{ styles: MapStyles }}
  >
    {props.showingPlaces.length === 0
      ? props.places.map(place => (
          <MarkerInfo
            key={place.id}
            place={place}
            onToggleOpen={props.onToggleOpen}
            showInfoId={props.showInfoId}
            action={props.action}
            markerAnimation={props.markerAnimation}
          />
        ))
      : props.showingPlaces.map(place => (
          <MarkerInfo
            key={place.id}
            place={place}
            onToggleOpen={props.onToggleOpen}
            showInfoId={props.showInfoId}
            action={props.action}
            markerAnimation={props.markerAnimation}
          />
        ))}
  </GoogleMap>
));

Map.propTypes = {
  onToggleOpen: PropTypes.func.isRequired,
  showInfoId: PropTypes.string.isRequired,
  action: PropTypes.bool.isRequired,
  places: PropTypes.array.isRequired,
  showingPlaces: PropTypes.array.isRequired
};

export default Map;
