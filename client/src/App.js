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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Navbar/>
      <Switch>   
        <Route exact path="/" component={Home}/>
        <Route path="/places/:placeId" component={SearchResults}/>
        <Route path="/sites/:id" component={SingleResult} />
        <Route path="/about" component={About} />
      </Switch>
      <Footer />
    </BrowserRouter>
    )
  }
}

export default App
