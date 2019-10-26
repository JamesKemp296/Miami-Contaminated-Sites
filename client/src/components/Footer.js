import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => (
  <nav className="footer">
    <ul>
      <li><NavLink exact to="/about">About Us</NavLink></li>
    </ul>
  </nav>
)

export default Footer