import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><NavLink to='/' exact={true} activeClassName='is-active'>Home</NavLink></li>
        <li><NavLink to='/graph' exact={true} activeClassName="is-active">Graph</NavLink></li>
        <li><NavLink to='/graphsvg' exact={true} activeClassName="is-active">GraphSvg</NavLink></li>
      </ul>
    </nav>
  </header>
)
export default Header;