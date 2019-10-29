import React from 'react'
import { Link } from 'react-router-dom'

const Result = (props) => {
	const filteredResults = props.sites.filter(site => {
	if (props.permit === 'all') return true
		else return site.attributes.PERMITTYPE === props.permit
	})
	return (
		filteredResults.map((site, index )=> (
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
	)
} 

export default Result