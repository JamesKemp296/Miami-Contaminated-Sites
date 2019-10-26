import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ResultList from './pages/ResultList'
import SingleResult from './pages/SingleResult'
import Navbar from './components/Navbar'

const App = () => (
  <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/results" component={ResultList} />
      <Route path="/results/:id" component={SingleResult} />
    </Switch>
  </BrowserRouter>
)

export default App
