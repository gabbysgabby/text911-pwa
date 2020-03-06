import React, {Component} from 'react';
import mapboxgl, { GeolocateControl } from 'mapbox-gl';
import './Map.css';

const TOKEN = 'pk.eyJ1IjoiZ2FiYnlnYWJieSIsImEiOiJjazZsYzgwaDEwMmFhM2hwaG1nMWZvcnpzIn0.Fw8Z5U4PoaEIQACGzQ2mYA';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      long: 0,
      lat: 0
    };
  }

  componentDidMount() {
    if (this.state.long !== 0 && this.state.lat !== 0) {
      this.props.btnClick();
    }
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ long: position.coords.longitude, lat: position.coords.latitude });
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${TOKEN}`)
        .then(response => response.json())
        .then(response => {
          const address = response.features[0].place_name;
          var coordinates = document.getElementById('coordinates')
          coordinates.innerHTML = address;
      });
    }, (error) => { });
  }
  componentDidUpdate() {
    const coords = [this.state.long, this.state.lat];
    mapboxgl.accessToken = TOKEN;
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [this.state.long, this.state.lat], // starting position
      zoom: 13 // starting zoom
    });
    map.resize();
    console.log('map', map)
    map.on('load', function() {
      var marker = new mapboxgl.Marker({
        draggable: true,
      }).setLngLat(coords).addTo(map);

      function add_marker (event) {
        var coordinates = event.lngLat;
        marker.setLngLat(coordinates).addTo(map);
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${TOKEN}`)
          .then(response => response.json())
          .then(response => {
            const address = response.features[0].place_name;
            var coordinates = document.getElementById('coordinates')
            coordinates.innerHTML = address;
          });
      }
      function onDragEnd() {
        var lngLat = marker.getLngLat();
        marker.setLngLat(lngLat).addTo(map);
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${TOKEN}`)
          .then(response => response.json())
          .then(response => {
            const address = response.features[0].place_name;
            var coordinates = document.getElementById('coordinates')
            coordinates.innerHTML = address;
          });
        }
      marker.on('dragend', onDragEnd);
      map.on('click', add_marker);
    });
  }
  render() {
    console.log('state', this.state.long, this.state.lat)
    return (
      <div style={{
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        <div
          ref={(el) => this.mapContainer = el}
          id="map"
          style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
        />
        <p id="coordinates" className="coordinates"></p>
      </div>
    )
  }
}
export default Map;
