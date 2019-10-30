import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
 
export class MapContainer extends React.Component {

  displayMarkers = () => {
    return this.props.mapPoints.map((point, index) => {
      return <Marker key={index} id={index} position={{
       lat: point.lat,
       lng: point.lon
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

    render() {
      return (
        <Map
            google={this.props.google}
            styles={{width: '100%', 
                    height: '400px'
          
                  }}
            // initialCenter={{
            //     lat: this.props.place.geometry.location.lat,
            //     lng: this.props.place.geometry.location.lng
    
            // }}
            // this.props.place.geometry.location.lng
            zoom={12}
            onClick={this.onMapClicked}
        >
   
         {this.displayMarkers()}
        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)