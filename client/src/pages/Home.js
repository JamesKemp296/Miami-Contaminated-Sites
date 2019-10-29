import React from 'react'
import Autocomplete from 'react-google-autocomplete';
import { withRouter } from 'react-router-dom'

const Home = props => {
	const handleSubmit = event => {
		event.preventDefault()
		if (props.place) props.history.push("/search")
	}
	console.log(props)
	return(
		<form className="background-wrapper" onSubmit={handleSubmit}>
			<Autocomplete
				style={{width: '90%'}}
				onPlaceSelected={props.handleSearch}
				types={['address']}
				componentRestrictions={{ country: 'us' }}
			/>
		</form>
	)
}
export default withRouter(Home)
