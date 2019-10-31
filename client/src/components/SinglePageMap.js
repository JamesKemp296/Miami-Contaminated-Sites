import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react'
 
export class SinglePageMap extends React.Component {

    render() {
        console.log(this.props)
      return (
        <Map
            google={this.props.google}
            style={{width: '100%', 
                    height: '400px'
          
                  }}
            initialCenter={{
                lat: Number(this.props.geometry.y),
                lng: Number(this.props.geometry.x)
            }}
            zoom={15}
            onClick={this.onMapClicked}
        >
            <Marker 
                position={{ lat: Number(this.props.site.LAT), lng: Number(this.props.site.LON)}} 
                title={`${this.props.site.HNUM} ${this.props.site.PRE_DIR} ${this.props.site.ST_NAME} ${this.props.site.ST_TYPE}`}
            />
        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(SinglePageMap)
