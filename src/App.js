import React, { Component } from 'react';
import './App.css';

class App extends Component {


  componentDidMount(){
    this.loadMap();
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBw_T2wCQGqWBEdF4UzMAuoQX_DCemYpQw&callback=initMap")
    window.initMap = this.initMap
  }

  initMap= () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 5
    });
  }


  render() {
    return (
      <div id="map">

      </div>
    )
  }

}


/*

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/

function loadScript(url){
  const index = document.getElementsByTagName("script")[0];
  let script = document.createElement("script"); //<script></script>

  script.src = url;
  script.async = true;
  script.defer = true;

  //set our created script tag before to all the script tag
  index.parentNode.insertBefore(script, index);

}

export default App;
