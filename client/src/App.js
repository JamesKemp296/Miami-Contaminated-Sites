import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import './results.css'
import './About.css'
import Home from './pages/Home'
import SingleResult from './pages/SingleResult'
import About from './pages/About'
import Navbar from './components/Navbar'
import SearchResults from './pages/SearchResults'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/places/:placeId" component={SearchResults}/>
        <Route path="/places/:placeId/sites/:id" component={SingleResult} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
    )
  }
}

export default App
