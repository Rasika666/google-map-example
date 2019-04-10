import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    
   
    constructor(props) {
      super(props)
     // this.showPosition = this.showPosition.bind(this);
      this.state = {
         init_coordinate : {
               lat : 36.2048,
               lng : 138.2529
         },
         showingInfoWindow: true,
         activeMarker: {},
         selectedPlace: {},
      
      }
    }
    showPosition = (position) => {
        console.log("object_data:",position.coords.latitude,position.coords.longitude);
        this.setState({
            init_coordinate :{
                lat :position.coords.latitude,
                lan :position.coords.longitude
            }
        });
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

    componentDidMount () {
        if (navigator.geolocation) 
            navigator.geolocation.getCurrentPosition(this.showPosition);
    }

    fetchPlaces = (mapProps, map)=> {
      const {google} = mapProps;
      const service = new google.maps.places.PlacesService(map);
      // ...
    }
    
    render() {


      const style = {
         width: '50%',
         height: '50%'
       }

        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        console.log("state data:",this.state.init_coordinate)
        return (
          <Map 
            google={this.props.google} 
            zoom={10}
            style={style}
           
            initialCenter={this.state.init_coordinate}
            onReady={this.fetchPlaces}
            visible={true}
            Listing places={this.state.places}
            onClick={this.onMapClicked}
              
          >
     
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
     
     <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

          </Map>
        );
      }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBw_T2wCQGqWBEdF4UzMAuoQX_DCemYpQw"
  })(MapContainer)