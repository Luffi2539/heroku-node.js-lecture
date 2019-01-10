import React from 'react'

import Nav from './components/Nav'
import HeaderText from './components/Header-Text'

import './header.scss'

class Header extends React.Component {
  render() {
    return (
      <header id="page-top">
        <Nav />
        <HeaderText />
      </header>
    )
  }
}

export default Header
