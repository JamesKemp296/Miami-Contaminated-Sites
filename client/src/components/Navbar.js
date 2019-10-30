import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
  <nav id="header">
    <ul className="nav-links">
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink exact to='/places/placeId'>Search results</NavLink></li>
      <li><NavLink exact to="/about">About</NavLink></li>
    </ul>
  </nav>
)

export default Navbar
