import React from 'react'
import { Link } from 'react-router-dom'
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';

class Home extends React.Component {
  state = {
    sites: [],
    totalResults: 0,
    radiusMiles: 1
  }
  handleSearch = place => {
    const [lat, lng] = [place.geometry.location.lat(), place.geometry.location.lng()];
    //these values will be grabbed from the user later
    //default for testing
    const radiusMiles = this.state.radiusMiles
    const radiusDegrees = (radiusMiles/138)
    const minLongitude = lng - radiusDegrees
    const maxLongitude = lng + radiusDegrees
    const minLatitude = lat - radiusDegrees
    const maxLatitude = lat + radiusDegrees
    const url = `/api/sites/${minLongitude}/${minLatitude}/${maxLongitude}/${maxLatitude}`
    axios.get(url)
    .then(response => {
      const { data } = response;
      this.setState({sites: data.features, totalResults: data.features.length})
    })
  }

  handleRadiusChange = event => {
    this.setState({ radiusMiles: Number(event.target.value) })
  }

  render(){
    return(
      <>
 			<div style={{ margin: '100px' }}>
			</div>
        <div className="background-wrapper">
          <Autocomplete
            style={{width: '90%'}}
            onPlaceSelected={this.handleSearch}
            types={['address']}
            componentRestrictions={{ country: 'us' }}
          />
          <select 
          className="radius-dropbox"
          value={this.state.radiusMiles}
          onChange={this.handleRadiusChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          </select>
        </div>
          <h1 className="totalResults">Total Results: {this.state.totalResults}</h1>
        {
          this.state.sites
          .map((site, index )=> (
            <Link key={site.attributes.OBJECTID} to={`/results/${site.attributes.OBJECTID}`}>
              <div className="outer-wrapper">
                <div className="inner-wrapper" key={index}>
                  <h3>Status: {site.attributes.CLASSIFCTN}</h3>
                  <h3>Phase: {site.attributes.PHASE}</h3>
                  <h3>Lat: {site.attributes.LAT}</h3>
                  <h3>Lon: {site.attributes.LON}</h3>
                  <h3>Cleanup: {site.attributes.TASK_NAME}</h3>
                  <h3>Address: {site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</h3>
                  <div className="line"></div> 
                </div> 
              </div>
            </Link>  
          ))
        }
      </>
    )
  }
}
export default Home
