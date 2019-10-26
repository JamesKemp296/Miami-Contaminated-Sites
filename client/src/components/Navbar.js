import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
  <nav>
    <ul>
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink exact to="results">Movies</NavLink></li>
    </ul>
  </nav>
)

export default Navbar
