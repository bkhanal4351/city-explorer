import React from 'react';
import {Card} from 'react-bootstrap';


class Location extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.Latitude},${this.props.Longitude}&zoom=12`
    return(
      <Card id='location'>
        <Card.Body>
          <Card.Title id='title'>{this.props.city}</Card.Title>
          <Card.Text id='text'>
            Latitude: {this.props.Latitude}
            Longitude: {this.props.Longitude}
          </Card.Text>
          <Card.Img in='locImg' src={map}/>
          <Card.Title id='weather'>{this.props.weather}</Card.Title>
        
        </Card.Body>
      </Card>
    )
  }
}

export default Location;