import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './pages/Home'
import SingleResult from './pages/SingleResult'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchResults from './pages/SearchResults'
import axios from 'axios'

class App extends Component {
  state = {
            site: {},
            radiusMiles: 1,
            place: null,
            sites: [],
            totalResults: 0,
            permit: 'all',
            permitText: 'All'
          }

  handleSiteSelection = site => this.setState({ site })

  handleSearch = place => this.setState({ place })

  handlePermitChange = event => this.setState({ permit: event.target.value, permitText: event.target.options[event.target.selectedIndex].text })

  handleRadiusChange = event => this.setState({ permit: Number(event.target.value) }, this.fetchSites)

  fetchSites = () => {
    const { place, radiusMiles } = this.state;
    if (!place || !place.geometry) return;
    const [lat, lng] = [place.geometry.location.lat(), place.geometry.location.lng()];
    //these values will be grabbed from the user later
    //default for testing
    const radiusDegrees = (radiusMiles/138)
    const minLongitude = lng - radiusDegrees
    const maxLongitude = lng + radiusDegrees
    const minLatitude = lat - radiusDegrees
    const maxLatitude = lat + radiusDegrees
    const url = `/api/sites/${minLongitude}/${minLatitude}/${maxLongitude}/${maxLatitude}`
    axios.get(url)
    .then(response => {
      const { data } = response;
      const { features } = data;
      this.setState({ sites: features, totalResults: features.length })
    })
  }

  render() {
    const { site, place, radiusMiles, sites, totalResults, permit, permitText } = this.state;
    return (
      <BrowserRouter>
      <Navbar/>
      <Switch>   
        <Route exact path="/" render={
          () => (
            <Home
              radiusMiles={radiusMiles}
              handleRadiusChange={this.handleRadiusChange}
              place={place}
              handleSearch={this.handleSearch}
            />
          )}
        />
        <Route exact path="/search" render={
          () => (
            <SearchResults
              handleSiteSelection={this.handleSiteSelection}
              radiusMiles={radiusMiles}
              handleRadiusChange={this.handleRadiusChange}
              handlePermitChange={this.handlePermitChange}
              place={place}
              sites={sites}
              permit={permit}
              permitText={permitText}
              totalResults={totalResults}
              fetchSites={this.fetchSites}
            />
          )}
        />
        <Route path="/search/:id" render={() => <SingleResult site={site} />} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </BrowserRouter>
    )
  }
}

export default App
