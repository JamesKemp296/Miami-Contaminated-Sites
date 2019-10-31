import React from 'react'
import Autocomplete from 'react-google-autocomplete';

const Home = props => {
	const goToSearchResultsForPlace = place => props.history.push(`/places/${place.place_id}`)

	return(
    <header className="v-header container">
    <div className="fullscreen-video-wrap">
      <video loop autoPlay muted>
      <source src="./video/bg.mp4" type="video/mp4" />
    </video>
    </div>
    <div className="header-overlay">
      <div className="header-content">
        <h1 className="title">CONTAMINATED SITE SEARCH</h1>
        <p className="description">
        This tool allows Miami-Dade residents to view designated areas where environmental contamination has been documented in 
        the soil or groundwater. Updated monthly. 
        </p>
        <Autocomplete className="autocomplete"
        style={{width: '35%'}}
        onPlaceSelected={goToSearchResultsForPlace}
        types={['address']}
        componentRestrictions={{ country: 'us' }}
        />
      </div>
    </div>
   </header>

	)
}


export default Home
