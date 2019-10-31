import React from 'react'
import Autocomplete from 'react-google-autocomplete';

const Home = props => {
	const goToSearchResultsForPlace = place => props.history.push(`/places/${place.place_id}`)

	return(
    <header className="v-header container">
    <div className="video-overlay"></div>
    <div className="fullscreen-video-wrap">
      <video loop autoPlay muted>
      <source src="./video/bg.mp4" type="video/mp4" />
    </video>
    </div>
    <div className="header-overlay">
      <div className="header-content">
        <div id="miami">
          <h2 className="title">Miami-Dade</h2>
          <h1 className="title">CONTAMINATED SITE SEARCH</h1>
          <p className="description">This tool allows Miami-Dade residents to view designated areas where environmental contamination has been documented in 
        the soil or groundwater. Updated monthly. 
          </p>
        </div>
        <Autocomplete className="autocomplete"
        style={{
            width: '40%', 
            height: '50px',
            borderTopWidth: 0,
            borderBottomWidth:0,
            paddingLeft: '15px',
            outline: 'none',
            borderRadius: 50,
            fontSize: '16px',
            fontWeight: 'bold'
          }}
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
