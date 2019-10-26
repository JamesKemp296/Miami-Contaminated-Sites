import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './pages/Home'
import ResultList from './pages/ResultList'
import SingleResult from './pages/SingleResult'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => (
  <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/results" component={ResultList} />
      <Route path="/results/:id" component={SingleResult} />
      <Route path="/about" component={About} />
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App
