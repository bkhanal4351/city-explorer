import React from 'react';
import { Card } from 'react-bootstrap';

class Weather extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     weather : []
  //   }
  // }

  render(){
    
    return (
      <>
  <Card>
    <Card.Body>
    <Card.Title>Weather Data: {this.props.forecast}</Card.Title>
    <Card.Text>Date: {this.props.date}</Card.Text>
    </Card.Body>
    
  </Card>
      </>
    );
  }
}

export default Weather;