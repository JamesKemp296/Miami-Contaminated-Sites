import React from 'react'
import Autocomplete from 'react-google-autocomplete';

const Home = props => {
	const goToSearchResultsForPlace = place => props.history.push(`/places/${place.place_id}`)

	return(
    <header className="v-header container">
    <div className="fullscreen-video-wrap">
      <video loop autoPlay>
      <source src="./video/Traffic.mp4" type="video/mp4" />
    </video>
    </div>
    <div className="header-overlay">
    <div className="header-content">
      <h1 className="title">CONTAMINATED SITE SEARCH</h1>
      <h3 className="description">identifies properties where environmental contamination has been documented in the soil
      or groundwater. Facilities get listed as a contaminated site by a DERM inspector who finds a violation on the
      property.
      Facilities that store potential contaminated materials are permitted and/or tracked by DERM. A site is removed
      from the active contaminated sites layer/list when the sites is found by DERM to be cleaned up.
      Updated monthly.
      </h3>
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
