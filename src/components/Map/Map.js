import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import MapStyles from '../../utils/mapStyles.json';
import MarkerInfo from '../MarkerInfo/MarkerInfo';
import './Map.css';
import mapboxgl, { GeolocateControl } from 'mapbox-gl';

const TOKEN = 'pk.eyJ1IjoiZ2FiYnlnYWJieSIsImEiOiJjazZsYzgwaDEwMmFhM2hwaG1nMWZvcnpzIn0.Fw8Z5U4PoaEIQACGzQ2mYA';

class Map extends Component {
  componentDidMount() {
    mapboxgl.accessToken = TOKEN;
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-96, 37.8], // starting position
      zoom: 3 // starting zoom
    });

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.addControl(geolocate);
    geolocate.on('geolocate', function(e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude
      var position = [lon, lat];
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position[0]},${position[1]}.json?access_token=${TOKEN}`)
        .then(response => response.json())
        .then(response => {
          const address = response.features[0].place_name;
          var coordinates = document.getElementById('coordinates')
          coordinates.innerHTML = address;
        });
    })
  }
  render() {
    return (
      <div style={{
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        <div
          ref={(el) => {
            this.mapContainer = el;
            console.log('el', el,)
          }}
          id="map"
          style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
        />
        <button
          onClick={() => this.props.btnClick()}
          className="map-button"
          style={{ zIndex: 999999999, position: 'absolute', bottom: 0 }}
        >
          <p className="center-text blue-btn">
            Done
          </p>
        </button>
        <pre id="coordinates" class="coordinates"></pre>
      </div>
    )
  }
}
export default Map;
