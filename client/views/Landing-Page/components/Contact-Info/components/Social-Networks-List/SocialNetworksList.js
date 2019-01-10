import React from 'react'

import './social-networks-list.scss'

import SocialNetwork from './components/Social-Network'
import networksInfo from '../../../../../../constants/socials'

class SocialNetworksList extends React.Component {
  render() {
    return (
      <div className="social-networks">
        {networksInfo.map((network, id) => {
          return (
            <SocialNetwork
              imgName={network.imgName}
              href={network.href}
              linkText={network.linkText}
              key={id}
            />
          )
        })}
      </div>
    )
  }
}

export default SocialNetworksList
