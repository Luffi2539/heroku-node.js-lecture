import React from 'react'

class BalloonWord extends React.Component {
  render() {
    const { imgName, userInput, handleChange, id } = this.props
    const img = require(`../../../../../../../assets/balloon-burst/${imgName}`)

    return (
      <div className="balloon-word-container">
        <img src={img}/>
        <input 
          type="text"
          value={userInput}
          placeholder="Введите слово"
          onChange={(e) => handleChange(e, id)}
        />
      </div>
    )
  }
}

export default BalloonWord