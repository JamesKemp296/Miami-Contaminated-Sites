import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
 
export class MapContainer extends React.Component {

  displayMarkers = () => {
    return this.props.mapPoints.map((point, index) => {
      return <Marker  
                key={index} id={index} 
                position={{
                  lat: point.lat,
                  lng: point.lon
                }}
              />
    })
  }

    render() {
      return (
        <Map
            google={this.props.google}
            style={{width: '100%', 
                    height: '400px'
          
                  }}
            initialCenter={{
                lat: this.props.place.geometry.location.lat(),
                lng: this.props.place.geometry.location.lng()
            }}
            zoom={15}
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
