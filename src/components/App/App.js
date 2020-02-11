import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { MAP_API_KEY } from '../../utils/apiKeys';
import { getAll } from '../../utils/FoursquareAPI';
import Top from '../Top/Top';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import Modal from '../Common/Modal';
import './App.css';

class App extends Component {
  state = {
    places: [],
    showingPlaces: [],
    query: '',
    center: { lat: 37.8006568, lng: -122.4516305 },
    showInfoId: '',
    loaded: false,
    action: false,
    mapError: false,
    markerAnimation: 2,
    modal: true
  };

  /**
   * @description Load initial data
   */
  componentDidMount() {
    getAll().then(res => {
      this.setState({
        places: res,
        showingPlaces: res,
        loaded: true,
        emergency: false
      });
    });

    window.gm_authFailure = () => {
      this.setState({ mapError: true });
    };
  }

  /**
   * @description Toggle maker's infowindow open
   * @param {string} id - The marker's place ID
   * @param {string} action - Type of action fired (open or close)
   */
  onToggleOpen = (id, action) => {
    this.setState({
      showInfoId: id,
      action,
      markerAnimation: action ? 1 : null
    });
  };

  maybeModal() {
    const { modal, emergency } = this.state;
    if (modal) {
      return (
        <Modal
          header="By using this service"
          para="you agree to our terms of use and allow us to access your location."
          btnTxt="Agree"
          btnClick={() => this.setState({ modal: false, emergency: true })}
        />
      );
    } if (emergency) {
      return (
        <Modal
          header="WHERE'S YOUR EMERGENCY?"
          para="For this app to work, we need your location, please enable GPS."
          btnTxt="Agree"
          btnClick={() => this.setState({ emergency: false })}
        />
      );
    }
  }


  render() {
    const { mapError, loaded } = this.state;
    return (
      <div className="app">
        <Top />
        {this.maybeModal()}
        <div className="content">
          {loaded && !mapError && (
            <Map
              onToggleOpen={this.onToggleOpen}
              showInfoId={this.state.showInfoId}
              action={this.state.action}
              places={this.state.places}
              showingPlaces={this.state.showingPlaces}
              markerAnimation={this.state.markerAnimation}
              containerElement={
                <main className="map" role="application" tabIndex="0" />
              }
              mapElement={<div style={{ height: `100%` }} />}
              loadingElement={
                <Error
                  message={
                    'There was an error while loading the Google Maps scripts. Please try again later.'
                  }
                />
              }
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3`}
            />
          )}
          {mapError && (
            <Error
              size="small"
              message={
                'There was an error while loading the Google Maps scripts. Please try again later.'
              }
            />
          )}
          {loaded && (
            <Filter
              data={this.state}
              onToggleOpen={this.onToggleOpen}
              filterPlaces={this.filterPlaces}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
