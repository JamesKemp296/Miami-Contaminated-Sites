import React from 'react'
import { withRouter } from 'react-router-dom'
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';

class Home extends React.Component {
  state = {
    sites: [],
    totalResults: 0,
    radiusMiles: 1,
    place: null,
  }
  
  fetchSites = () => {
    const { place, radiusMiles } = this.state;
    if (!place || !place.geometry) return;
    const [lat, lng] = [place.geometry.location.lat(), place.geometry.location.lng()];
    //these values will be grabbed from the user later
    //default for testing
    const radiusDegrees = (radiusMiles/138)
    const minLongitude = lng - radiusDegrees
    const maxLongitude = lng + radiusDegrees
    const minLatitude = lat - radiusDegrees
    const maxLatitude = lat + radiusDegrees
    const url = `/api/sites/${minLongitude}/${minLatitude}/${maxLongitude}/${maxLatitude}`
    axios.get(url)
    .then(response => {
      const { data } = response;
      const { features } = data;
      this.setState({ sites: features, totalResults: features.length })
    })
  }

  handleSearch = place => this.setState({ place }, this.fetchSites)

  handleRadiusChange = event => this.setState({ radiusMiles: Number(event.target.value) }, this.fetchSites)

  handleSiteClick = site => {
    const { handleSiteSelection, history } = this.props;
    handleSiteSelection(site)
    history.push(`/results/${site.attributes.OBJECTID}`)
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
          onChange={this.handleRadiusChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
          <h1 className="totalResults">Total Results: {this.state.totalResults}</h1>
        {
          this.state.sites
          .map((site, index )=> (
            <div key={site.attributes.OBJECTID} onClick={() => this.handleSiteClick(site)}>
              <div className="outer-wrapper">
                <div className="inner-wrapper" key={index}>
                  <div className="image-wrapper" key={index}>
                    <img src={`https://maps.googleapis.com/maps/api/streetview?size=150x150&location=${site.attributes.HNUM}+${site.attributes.ST_NAME}+${site.attributes.PRE_DIR}+${site.attributes.ST_TYPE}+MIAMI+FL&heading=271&pitch=-0.76&key=AIzaSyDLun1DYQxp9IawieGnpd-4d0Jrp8sZSHU`} alt="contaminated site" />
                  </div>  
                  <div className="text-wrapper">
                    <h3>Status: {site.attributes.CLASSIFCTN}</h3>
                    <h3>Phase: {site.attributes.PHASE}</h3>
                    <h3>Lat: {site.attributes.LAT}</h3>
                    <h3>Lon: {site.attributes.LON}</h3>
                    <h3>Cleanup: {site.attributes.TASK_NAME}</h3>
                    <h3>Address: {site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</h3>
                  </div>
                </div> 
              </div>
            </div>  
          ))
        }
      </>
    )
  }
}
export default withRouter(Home)
