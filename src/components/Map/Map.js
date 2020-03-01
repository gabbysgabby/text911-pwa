import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import MapStyles from '../../utils/mapStyles.json';
import MarkerInfo from '../MarkerInfo/MarkerInfo';
import './Map.css';
import mapboxgl, {GeolocateControl} from 'mapbox-gl';

const TOKEN = 'pk.eyJ1IjoiZ2FiYnlnYWJieSIsImEiOiJjazZsYzgwaDEwMmFhM2hwaG1nMWZvcnpzIn0.Fw8Z5U4PoaEIQACGzQ2mYA';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }
  componentDidMount() {
    mapboxgl.accessToken = TOKEN;
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-96, 37.8], // starting position
      zoom: 3 // starting zoom
    });
    var coordinates = document.getElementById('coordinates');
    var marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([0, 0]).addTo(map);

    function onDragEnd() {
      var lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML =
        'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }

    marker.on('dragend', onDragEnd);
    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
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
          className="button"
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
