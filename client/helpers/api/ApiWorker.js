class ApiWorker {
  constructor(basicUrl) {
    this.basicUrl = basicUrl
  }

  formUrl(apiRoute) {
    return `${this.basicUrl}/${apiRoute}`
  }

  getJson(apiRoute) {
    return fetch(this.formUrl(apiRoute))
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.statusText)
        }
        return res.json()
      })
      .catch((err) => console.log(err))
  }

  getUsers() {
    return this.getJson('users')
      .then((users) => {
        return users
      })
      .catch((err) => console.log(err))
  }

  postJson(apiRoute, reqBody) {
    return fetch(this.formUrl(apiRoute), {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText)
      } else {
        return res.json()
      }
    })
  }

  addUser(name) {
    const reqBody = {
      name
    }
    return this.postJson('users', reqBody)
  }

  patchJson(apiRoute, reqBody) {
    return fetch(this.formUrl(apiRoute), {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res.statusText)
      } else {
        return res.json()
      }
    }).catch((err) => console.log(err))
  }

  updateUserScore(name, score) {
    const reqBody = {
      name,
      score
    }
    return this.patchJson('users', reqBody)
  }
}

const apiWorker = new ApiWorker('/api')

export default apiWorker
