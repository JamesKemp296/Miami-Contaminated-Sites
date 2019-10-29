import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class SingleResult extends React.Component {

  state = { site: { } }

  fetchSite = () => {
    //console.table(this.props.match.params.id)
    const siteId = this.props.match.params.id;
    const siteUrl =`https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/ContaminatedSite_gdb/FeatureServer/0/query?where=OBJECTID%20%3E%3D%20${siteId}%20AND%20OBJECTID%20%3C%3D%20${siteId}&outFields=*&outSR=4326&f=json`
    fetch(siteUrl)
    .then(response => response.json())
    .then((data) => this.setState({site: data.features[0]}))
    .catch(err => console.error(err))
    console.log(siteUrl)
  }
  componentDidMount(){
    this.fetchSite()
    
  }
  render(){
    console.log(this.state)
    return(
  <div className="single-list">

  This is a web page
  {/* <div className="single-image"><p>{this.state.site.attributes.HNUM}</p></div> */}
   
   {/* <div className="single-image">
      <img src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${site.attributes.HNUM}+${site.attributes.ST_NAME}+${site.attributes.PRE_DIR}+${site.attributes.ST_TYPE}+MIAMI+FL&heading=271&pitch=-0.76&key=AIzaSyDLun1DYQxp9IawieGnpd-4d0Jrp8sZSHU`} alt="contaminated site" />
    </div>
    <div className="single-description">
      <h1>{site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</h1>
        <table>
          <tbody>
          <tr>
            <td>Address:</td>
            <td>{site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</td>
          </tr>
          <tr>
            <td>Task Name:</td>
            <td>{site.attributes.TASK_NAME}</td>
          </tr>
          <tr>
            <td>Folio:</td>
            <td>{site.attributes.FOLIO}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{site.attributes.CLASSIFCTN}</td>
          </tr>
          <tr>
            <td>Phase:</td>
            <td>{site.attributes.PHASE}</td>
          </tr>
          <tr>
            <td>Permit No:</td>
            <td>{site.attributes.PERMITNO}</td>
          </tr>
          <tr>
            <td>Permit Type:</td>
            <td>{site.attributes.PERMITTYPE}</td>
          </tr>
          <tr>
            <td>File No:</td>
            <td>{site.attributes.FILENO}</td>
          </tr>
          </tbody>
        </table>
    </div> */}
  </div>
)
}


}
export default SingleResult