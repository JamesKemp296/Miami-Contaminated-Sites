import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class SearchResults extends React.Component {
  state = {
            place: { formatted_address: "Loading..." },
            radiusMiles: 1,
            sites: [],
            totalResults: 0,
            permit: 'all',
            permitText: 'All'
          }

  handlePermitChange = event => this.setState({
    permit: event.target.value,
    permitText: event.target.options[event.target.selectedIndex].text
  })

  handleRadiusChange = event => this.setState({ radiusMiles: Number(event.target.value) }, (place) => this.fetchSites(this.state.place))

  fetchSites = (place) => {
    const { radiusMiles } = this.state;
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
      this.setState({ sites: features, totalResults: features.length, place })
    })
  }

  render(){
    return(
      <>
        <div className="results-filters">

          <h1>{this.state.place.formatted_address}</h1>
          <label htmlFor="radius-dropbox">Radius:</label>
          <select
            id="radius-dropbox"
            value={this.state.radiusMiles}
            onChange={this.handleRadiusChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <label htmlFor="permit">Type of contamination:</label>
          <select
            id="permit"
            value={this.state.permit}
            onChange={this.handlePermitChange}
          >
            <option value="all">All</option>
            <option value="UT">Storage Tanks</option>
            <option value="IW5">Industrial Waste</option>
            <option value="HWR">Hazardous Waste Removal</option>
            <option value="SW">Solid Waste</option>
            <option value="IW">Industrial Waste</option>
            <option value="AW">Waste</option>
            <option value="ARP">Airports and Contracts</option>
          </select>
        </div>
          <h1 className="totalResults">Showing {this.state.sites.length} of {this.state.totalResults} results for {this.state.permitText}</h1>
        {
          this.state.sites
          .filter(site => {
            if (this.state.permit === 'all') return true
            else return site.attributes.PERMITTYPE === this.state.permit
          })
          .map((site, index )=> (
            <Link key={site.attributes.OBJECTID} to={`/sites/${site.attributes.OBJECTID}`}>
              <div className="outer-wrapper">
                <div className="inner-wrapper" key={index}>
                  <div className="image-wrapper" key={index}>
                    <img src={`https://maps.googleapis.com/maps/api/streetview?size=150x150&location=${site.attributes.HNUM}+${site.attributes.ST_NAME}+${site.attributes.PRE_DIR}+${site.attributes.ST_TYPE}+MIAMI+FL&heading=271&pitch=-0.76&key=AIzaSyDLun1DYQxp9IawieGnpd-4d0Jrp8sZSHU`} alt="contaminated site" />
                  </div>
                  <div className="text-wrapper">
                    <h3>Status: {site.attributes.CLASSIFCTN}</h3>
                    <h3>Type: {site.attributes.PERMITTYPE}</h3>
                    <h3>Phase: {site.attributes.PHASE}</h3>
                    <h3>Lat: {site.attributes.LAT}</h3>
                    <h3>Lon: {site.attributes.LON}</h3>
                    <h3>Cleanup: {site.attributes.TASK_NAME}</h3>
                    <h3>Address: {site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
        <div id="map"></div>
      </>
    )
  }
  componentDidMount(){
    const service = new window.google.maps.places.PlacesService(document.getElementById('map'))
    service.getDetails({ placeId: this.props.match.params.placeId }, (place) => this.fetchSites(place))


  }
}
export default SearchResults
