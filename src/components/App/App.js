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

// add i18n library
// ask to allow location on modal
// look into caching
// add dismiss filter on click
// install redux
// add props to map

const onSuccess = () => {
  console.log('Yay! Swipe Success');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      map: true,
      filter: false,
      medical: false,
      police: false,
      fire: false
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
    if (map) return <Map />;
    return null;
  }

  maybeFilter() {
    const { filter, medical, police, fire } = this.state;
    // if (filter) {
      return (
        <div>
          <Map
            drageEnd={() => console.log('end')}
          />
          <Filter
            data={this.state}
            medical={medical}
            police={police}
            fire={fire}
            onToggleOpen={this.onToggleOpen}
            filterPlaces={this.filterPlaces}
            onSuccess={onSuccess}
            setMed={() => this.setState({ medical: true, police: false, fire: false })}
            setPol={() => this.setState({ police: true, medical: false, fire: false })}
            setFire={() => this.setState({ fire: true, medical: false, police: false })}
          />
        </div>
      );
    // } return null;
  }

  render() {
    const { modal, emergency, filter } = this.state;
    console.log('filter', filter)
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
