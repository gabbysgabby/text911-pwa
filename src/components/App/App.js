import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
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

// add i18n library
// ask to allow location on modal
// look into caching

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      map: true,
      filter: false,
      success: false
    };
  }

  onSuccess() {
    this.setState({ success: true })
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
    if (map) return <Map />;
    return null;
  }

  maybeFilter() {
    const { filter, medical, police, fire } = this.state;
    return (
      <div>
        <Map
          dragEnd={() => console.log('end')}
        />
        <Filter
          data={this.state}
          onToggleOpen={this.onToggleOpen}
          filterPlaces={this.filterPlaces}
          onSuccess={() => this.onSuccess()}
        />
      </div>
    );
  }

  render() {
    const { modal, emergency, filter, success } = this.state;
    if (success) return <Redirect push to="/details" />;
    return (
      <div className="app">
        {
          modal || emergency ?
          <div className="modalContainer" /> :
          null
        }
        <div className="content">
          {this.maybeModal()}
        </div>
        {this.maybeFilter()}
      </div>
    );
  }
}

export default App;
