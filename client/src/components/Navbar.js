import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

const Navbar = props => {
  return(

    <nav id="header">
      <ul className="nav-links">
        <li><NavLink exact to="/">Home</NavLink></li>
        {
          props.location.pathname.includes('sites') &&
          <li><NavLink exact to={`${props.location.pathname.split('/').slice(0,3).join('/')}`} >Search Results</NavLink></li>
        }
        <li><NavLink exact to="/about">About</NavLink></li>
        <li><NavLink exact to="/map">Map</NavLink></li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)
