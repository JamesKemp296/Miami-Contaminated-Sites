import React from 'react'
import Autocomplete from 'react-google-autocomplete';

const Home = props => {
	const goToSearchResultsForPlace = place => props.history.push(`/places/${place.place_id}`)

	return(
		<div className="background-wrapper">
			<Autocomplete
				style={{width: '90%'}}
				onPlaceSelected={goToSearchResultsForPlace}
				types={['address']}
				componentRestrictions={{ country: 'us' }}
			/>
		</div>
	)
}
export default Home
