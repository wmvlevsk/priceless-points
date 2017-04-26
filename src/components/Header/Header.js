import React from 'react'
import { IndexLink, Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Pulse Points System</h1>
    <IndexLink to='/' activeClassName='route--active'>
      <RaisedButton label="Home"/>
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      <RaisedButton label="Counter"/>
    </Link>
  </div>
)

export default Header
