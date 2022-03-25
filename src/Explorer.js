'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
import Location from './Location.js';
import Weather from './Weather.js';
import MovieData from './Movies.js'

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityData: {},
      weather: [],
      error: false,
      movie: []
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
      let cityValue = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      // save the data into state
     
      this.setState({ cityData: cityValue.data[0] });
    } catch (error) {
      this.setState({
        error: true,
        // errorMessage: `An error ocured: ${error.response.status}`
      })
    }

    this.weatherReq();
    this.movieReq();
  };

  weatherReq = async () => {
    try {
      let result = await axios.get(`${process.env.REACT_APP_WEATHER_API}/weather?city_name=${this.state.city}`);
      this.setState({
        weather: result.data
      })
    }
    catch (error) {
      this.setState({
        error: true,
      })
    }
  }
  movieReq = async () => {
    try {
       let movieResult = await axios.get(`${process.env.REACT_APP_WEATHER_API}/movie?city_name=${this.state.city}`)
       console.log(movieResult);
      this.setState({
         movie: movieResult.data
      })
    }
    catch (error) {
       this.setState({
          error: true,
      })
    }
  }
  
    render() {
      
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
              forecast={this.state.weather.description} />
          </div>

          {this.state.movie ? (
            this.state.movie.map((element) => 
            <MovieData 
            title={element.title}
            overview={element.overview}
            vote_average={element.vote_average}
            vote_count={element.vote_count}
            // img={element.img}
            popularity={element.popularity}
            release_date={element.release_date}
            />
            )) : null }
          
        </>
      );
    }
  }

export default Explorer;

