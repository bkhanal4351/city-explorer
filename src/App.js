import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      error: false,
    }
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
  };

  handleCityInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  render() {
    // let cityListItems = this.state.cityData.map()

    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleCityData}>
          <label>Enter a city:
            <input type="text" onInput={this.handleCityInput} />
            <button type="submit">Get city data</button>
          </label>
        </form>

        {this.state.cityData.error ? <p>{this.state.errorMessage}</p> : <p>{this.state.cityData.display_name} {this.state.cityData.lat}  {this.state.cityData.lon}</p>}

        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12`} alt = 'Map'/>
      
      </>
    );
  }
}

export default App;
