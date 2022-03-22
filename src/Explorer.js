'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
import Location from './Location.js';

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityData: {},
      error: false,
    }
  }

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleCityData = async (e) => {
    e.preventDefault()

    try {

      // get the data from the API
      // let urlVal = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      // console.log(urlVal);
      let cityValue = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      console.log(cityValue.data[0]);

      // save the data into state
      this.setState({
        cityData: cityValue.data[0]
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error ocured: ${error.response.status}`

      })

    }
    console.log(this.state.errorMessage);
  };

  render() {
    // let cityListItems = this.state.cityData.map()

    return (
      <>
        <Form id='dataForm'>
          <Form.Label id='label'>City Explorer</Form.Label>
          <Form.Control
            onChange={this.handleCityInput}
            type="text"
            placeholder="Enter a City" />
          <Button
            variant="primary"
            onClick={this.handleCityData} >
            Get City data
          </Button>

        </Form>

        {this.state.cityData.display_name ? (
          <Location
            city={this.state.cityData.display_name}
            Latitude={this.state.cityData.lat}
            Longitude={this.state.cityData.lon} />) : `${this.state.errorMessage}`}





      </>
    );
  }
}

export default Explorer;

