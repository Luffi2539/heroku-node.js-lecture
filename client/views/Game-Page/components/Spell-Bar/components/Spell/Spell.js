import React from 'react'
import cx from 'classnames'

import './spell.scss'

class Spell extends React.Component {
  render() {
    const { imgName, isPressed, handleClick } = this.props
    const img = require(`../../../../../../assets/${imgName}`)

    return (
      <div
        className={cx('spell-container', { 'pressed-spell': isPressed })}
        onClick={() => handleClick()}
      >
        <img src={img} />
      </div>
    )
  }
}

export default Spell
