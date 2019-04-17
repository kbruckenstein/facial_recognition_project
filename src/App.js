import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import './App.css';

const app = new Clarifai.App({
 apiKey: '3eaa661811aa4e7a88a4040cd93d283c'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info_bounding_box)
      },
      function(err) {
      }
    );
  }

  render() {
    return (
      <div className="App">
      <Particles className="particles"
        params={{
           particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800
              }
            }
           }
          }
        } />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
