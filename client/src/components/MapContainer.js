import React from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
 
export class MapContainer extends React.Component {
    render() {
      return (
        <Map
            google={this.props.google}
            initialCenter={{
                lat: 25.761681,
                lng: -80.191788
    
            }}
            zoom={12}
            onClick={this.onMapClicked}
        >
   
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>test</h1>
              </div>
          </InfoWindow> 
        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)