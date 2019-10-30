import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
 
export class SingleMap extends React.Component {

    render() {console.log(typeof(this.props.site.LAT))
      return (
       
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

        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(SingleMap)
