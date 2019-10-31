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
        <div style={{position: 'relative', minHeight: '400px', backgroundColor: 'azure', marginTop: '64px'}}>
        {
          this.state.place.geometry &&
          <MapContainer
            mapPoints={this.state.mapPoints}
            place={this.state.place}
            sites={this.state.sites}
          />
        }
        </div>
       
          <Result 
            {...this.state} 
            placeId={this.props.match.params.placeId}
            handlePermitChange={this.handlePermitChange}
            handleRadiusChange={this.handleRadiusChange}
          />
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
