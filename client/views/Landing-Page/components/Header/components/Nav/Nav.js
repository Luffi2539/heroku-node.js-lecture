import React from 'react'
import cx from 'classnames'

import './nav.scss'

class Nav extends React.Component {
  state = {
    isScrolled: false
  }

  handleScroll = (e) => {
    if (e.target.scrollingElement.scrollTop > 100) {
      this.setState(() => {
        return { isScrolled: true }
      })
    } else {
      this.setState(() => {
        return { isScrolled: false }
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { isScrolled } = this.state

    return (
      <nav className={cx({ 'scrolled-nav': isScrolled })}>
        <div className="nav-wrapper">
          <a className="nav-link big-text bold" href="#page-top">Жесткая Игра</a>
          <div>
            <a className="nav-link medium-text bold" href="#about">О Игре</a>
            <a className="nav-link medium-text bold" href="#screenshots">Скриншоты</a>
            <a className="nav-link medium-text bold" href="#contacts">Контакты</a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav