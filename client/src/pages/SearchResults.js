import React from 'react'
import axios from 'axios'
import Result from '../components/Result'
import MapContainer from '../components/MapContainer'
class SearchResults extends React.Component {
  state = {
            place: { formatted_address: "Loading..." },
            radiusMiles: 1,
            sites: [],
            totalResults: 0,
            permit: 'all',
            permitText: 'All',
            filteredResults: 0,
            mapPoints: []
            
          }

  handlePermitChange = event => this.setState({
    permit: event.target.value,
    permitText: event.target.options[event.target.selectedIndex].text
  })

  handleRadiusChange = event => this.setState({ radiusMiles: Number(event.target.value) }, () => this.fetchSites(this.state.place))

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
      const mapPoints = data.features.map(site => {
        return {
          lat: site.attributes.LAT,
          lon: site.attributes.LON,
        }
      })
      this.setState({ sites: features, totalResults: features.length, place, mapPoints })
    })
  }

  

  render(){
    return(
      <>
        <MapContainer 
          mapPoints={this.state.mapPoints}
          place={this.state.place}
        />
        <div className="results-filters">
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
          <Result {...this.state}/>
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
