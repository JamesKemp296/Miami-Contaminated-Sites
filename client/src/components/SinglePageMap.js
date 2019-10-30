import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
 
export class SinglePageMap extends React.Component {

    render() {
      return (
          console.log(this.props.site)
        <Map
            google={this.props.google}
            style={{width: '100%', 
                    height: '400px'
          
                  }}
            initialCenter={{
                lat: this.props.site.LAT,
                lng: this.props.site.LON
            }}
            zoom={15}
            onClick={this.onMapClicked}
        >
            {/* <Marker position={{ lat: Number(this.props.site.LAT), lng: Number(this.props.site.LON)}} /> */}
        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(SinglePageMap)
