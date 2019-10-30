import React from 'react'
import { Link } from 'react-router-dom'

const Result = (props) => {
	const filteredResults = props.sites.filter(site => {
	if (props.permit === 'all') return true
		else return site.attributes.PERMITTYPE === props.permit
	})
	return (
		<>
			<h1 className="totalResults">Showing {filteredResults.length} of {props.sites.length} results for {props.permitText}</h1>
			<div className="outer-wrapper">
				{
					filteredResults.map((site, index )=> (
						<Link key={site.attributes.OBJECTID} to={`/places/${props.placeId}/sites/${site.attributes.OBJECTID}`}>
							<div className="inner-wrapper" key={index}>
								<div className="image-wrapper" key={index}>
									<img className="google-image" src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${site.attributes.HNUM}+${site.attributes.ST_NAME}+${site.attributes.PRE_DIR}+${site.attributes.ST_TYPE}+MIAMI+FL&heading=271&pitch=-0.76&key=AIzaSyDLun1DYQxp9IawieGnpd-4d0Jrp8sZSHU`} alt="contaminated site" />
								</div>
								<div className="text-wrapper">
									<h3>Status: {site.attributes.CLASSIFCTN}</h3>
									<h3>Type: {site.attributes.PERMITTYPE}</h3>
									<h3>Cleanup: {site.attributes.TASK_NAME}</h3>
									<h3>Address: {site.attributes.HNUM} {site.attributes.PRE_DIR} {site.attributes.ST_NAME} {site.attributes.ST_TYPE}</h3>
								</div>						
							</div>
						</Link>
					))
				}
			</div>
		</>
	)
} 

export default Result
