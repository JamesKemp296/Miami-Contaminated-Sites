import React from 'react'
import { withRouter } from 'react-router-dom'

class SearchResults extends React.Component {
  handleSiteClick = site => {
    const { handleSiteSelection, history } = this.props;
    handleSiteSelection(site)
    history.push(`/results/${site.attributes.OBJECTID}`)
  }

  render(){
    return(
      <>
        <div className="results-filters">
          <h1>{this.props.place.formatted_address}</h1>
          <select
            className="radius-dropbox"
            value={this.props.radiusMiles}
            onChange={this.props.handleRadiusChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <select
            id="permit"
            value={this.props.permit}
            onChange={this.props.handlePermitChange}
          >
            <option value="all">All</option>
            <option value="UT">UT</option>
            <option value="IW5">IW5</option>
            <option value="HWR">HWR</option>
            <option value="SW">SW</option>
            <option value="IW">IW</option>
            <option value="AW">AW</option>
            <option value="ARP">ARP</option>
          </select>
        </div>
          <h1 className="totalResults">Total Results: {this.props.totalResults}</h1>
        {
          this.props.sites
          .filter(site => {
            if (this.props.permit === 'all') return true 
            else return site.attributes.PERMITTYPE === this.props.permit
          })
          .map((site, index )=> (
            <div key={site.attributes.OBJECTID} onClick={() => this.handleSiteClick(site)}>
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
            </div>  
          ))
        }
      </>
    )
  }
  componentDidMount(){
    this.props.fetchSites()
  }
}
export default withRouter(SearchResults)
