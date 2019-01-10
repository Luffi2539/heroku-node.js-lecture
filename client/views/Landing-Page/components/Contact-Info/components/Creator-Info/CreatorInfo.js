import React from 'react'

import './creator-info.scss'

class CreatorInfo extends React.Component {
  render() {
    return (
      <div className="creator-info-container">
        <h1 className="huge-text bold">
          Артем Зеков
        </h1>
        <hr/>
        <p className="medium-text bold">
          Студент Rolling Scopes School
        </p>
      </div>
    )
  }
}

export default CreatorInfo