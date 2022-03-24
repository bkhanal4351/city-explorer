'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
import Location from './Location.js';
import Weather from './Weather.js';

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityData: {},
      weather: [],
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
      this.setState({ cityData: cityValue.data[0]}, this.weatherReq);
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error ocured: ${error.response.status}`

      })

    }
    console.log(this.state.errorMessage);
  };

  weatherReq = async () => {
    // let city = this.state.cityData.display_name;
    // let url = https://localhost:3001/weather?lat=$%7Bthis.state.data.lat%7D&&lon=$%7Bthis.state.data.lon%7D;

    try {
      let result = await axios.get(`${process.env.REACT_APP_WEATHER_API}/weather?city_name=${this.state.city}`);
      console.log(result);
      this.setState({
        weather: result.data
      })

    }
    catch (error) {
      this.setState({ error: true,
      // errorMessage: `An error ocured: ${error.response.status}`
    })

  }
}


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
          Longitude={this.state.cityData.lon} />) :
        <div>

          {this.state.errorMessage}
        </div>}

        <div>
         <Weather
          date={this.state.weather.date}
          forecast={this.state.weather.description}/>
          
        </div>






    </>
  );
}
}

export default Explorer;

