import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    
   
    constructor(props) {
      super(props)
      this.showPosition = this.showPosition.bind(this);
      this.state = {
        init_coordinate : {
            lat : 36.2048,
            lng : 138.2529
        }
         
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

    componentDidMount () {
        if (navigator.geolocation) 
            navigator.geolocation.getCurrentPosition(this.showPosition);
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
            // Takes an object containing latitude and longitude coordinates. Sets the maps center upon loading
            initialCenter={this.state.init_coordinate}

              //Takes an object containing latitude and longitude coordinates. 
              //Use this if you want to re-render the map after the initial render
              //for me does not make any change
              /*center={{
                lat: 7.8731,
                lng: 80.7718
              }}*/
            //onClick={}
          >
     
            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
     
            <InfoWindow onClose={this.onInfoWindowClose}>
                
            </InfoWindow>

          </Map>
        );
      }
}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBw_T2wCQGqWBEdF4UzMAuoQX_DCemYpQw"
  })(MapContainer)