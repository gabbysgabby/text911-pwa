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
import SwipeableButton from '../Common/SwipeableButton';
import './App.css';

// add buttons to filter
// add user change location
// add i18n library

const onSuccess = () => {
  console.log('Yay! Swipe Success');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      map: true
    };
  }

  maybeModal() {
    const { modal, emergency } = this.state;
    if (modal) {
      return (
        <Modal
          header="Terms of Agreement"
          para="you agree to our terms of use and allow us to access your location."
          btnTxt="Agree"
          btnClick={() => this.setState({ modal: false })}
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

  maybeMap() {
    const { modal, map } = this.state;
    if (map) return <Map btnClick={() => this.setState({ map: false, filter: true }) }/>;
    return null;
  }

  maybeFilter() {
    const { filter } = this.state;
    if (filter) {
      return (
        <div>
          <Filter
            data={this.state}
            onToggleOpen={this.onToggleOpen}
            filterPlaces={this.filterPlaces}
          />
          <SwipeableButton onSuccess={onSuccess} color='red' text='Slide to Contact 911' />
        </div>
      );
    } return null;
  }

  render() {
    const { modal, emergency } = this.state;
    return (
      <div className="app">
        {
          modal || emergency ?
          <div className="modalContainer" /> :
          null
        }
        <div className="content">
          {this.maybeModal()}
          {this.maybeMap()}
        </div>
        {this.maybeFilter()}
      </div>
    );
  }
}

export default App;
