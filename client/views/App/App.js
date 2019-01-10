import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from 'store/index'
import Router from 'router/Router'

import './app.scss'


class App extends Component {
  componentDidMount() {
    // fetch('/api/users')
      // .then((res) => {
      //   if (!res.ok) {
      //     return Promise.reject(res.statusText)
      //   }
      //   return res.json()
      // })
      // .then((users) => console.log(users))
      // .then(() =>
      //   fetch('/api/users', {
      //     method: 'POST',
      //     headers: {
      //       'content-type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       name: 'Evlampii'
      //     })
      //   })
      // )
      // .then(() =>
      //   fetch('/api/users', {
      //     method: 'PATCH',
      //     headers: {
      //       'content-type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       name: 'Artem Zekov',
      //       score: 0
      //     })
      //   })
      // )
      // .then((res) => {
      //   if (!res.ok) {
      //     return Promise.reject(res.statusText)
      //   }
      //   return res.json()
      // })
      // .then((data) => console.log(data))
      // .catch((err) => console.log(err))
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}


export default App
