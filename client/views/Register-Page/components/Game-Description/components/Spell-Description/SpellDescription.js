import React from 'react'

class SpellDescription extends React.Component {
  render() {
    const { imgName, spanClassName, description, spellName } = this.props
    const img = require(`../../../../../../assets/${imgName}`)

    return (
      <div className="spell-description-1">
        <img src={img} />
        <div>
          <span className={'medium-text ' + spanClassName}>{spellName}</span>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

export default SpellDescription
