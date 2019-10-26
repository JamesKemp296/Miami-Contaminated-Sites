import React from 'react'

class Home extends React.Component {
  state = {
    sites: [],
    totalResults: 0,
    radiusMiles: 1
  }
  handleSearch = () => {
    //these values will be grabbed from the user later
    //default for testing
    const longitude = 25.7617
    const latitude = -80.1918
    const radiusMiles = this.state.radiusMiles
    const radiusDegrees = (radiusMiles/138)
    const minLongitude = longitude - radiusDegrees
    const maxLongitude = longitude + radiusDegrees
    const minLatitude = latitude - radiusDegrees
    const maxLatitude = latitude + radiusDegrees
    let url = `https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/ContaminatedSite_gdb/FeatureServer/0/query?where=1%3D1&outFields=*&geometry=${minLatitude}%2C${minLongitude}%2C${maxLatitude}%2C${maxLongitude}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json`
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({sites: data.features, totalResults: data.features.length}))  
  }

  handleRadiusChange = event => {
    this.setState({ radiusMiles: Number(event.target.value) })
  }

  render(){
    return(
      <>
        <div className="background-wrapper">
          <input
           className="search-bar"
           type="text"
           onChange={this.handleSearch}
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
          <h1>Total Results: {this.state.totalResults}</h1>
        {
          this.state.sites
          .map((site, index )=> (
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
          ))
        }
      </>
    )
  }
}
export default Home
