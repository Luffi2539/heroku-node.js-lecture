import React from 'react'

import './contact-info.scss'

import CreatorInfo from './components/Creator-Info'
import SocialNetworksList from './components/Social-Networks-List'

class ContactInfo extends React.Component {
  render() {
    return (
      <footer id="contacts">
        <CreatorInfo />
        <SocialNetworksList />
      </footer>
    )
  }
}

export default ContactInfo