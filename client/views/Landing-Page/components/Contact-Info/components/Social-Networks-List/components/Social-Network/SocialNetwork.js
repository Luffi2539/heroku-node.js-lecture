import React from 'react'

import './social-network.scss'

class SocialNetwork extends React.Component {
  state = {
    img: require(`../../../../../../../../assets/${this.props.imgName}.png`)
  }
  render() {
    const { href, linkText } = this.props
    const { img } = this.state
    
    let link

    if (href.length > 0) {
      link = <a href={href} target="_blank">{linkText}</a>
    } else {
      link = <a>{linkText}</a>
    }

    return (
      <div className="social-network">
        <img src={img}/>
        {link}
      </div>
    )
  }
}

export default SocialNetwork