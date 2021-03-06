const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'Flow',
        path: 'flow'
      },
      {
        name: 'React',
        path: 'react'
      },
      {
        name: 'Redux',
        path: 'redux'
      },
      {
        name: 'Jest',
        path: 'jest'
      },
      {
        name: 'rxJS',
        path: 'rxjs'
      },
      {
        name: 'Android',
        path: 'android'
      },
      {
        name: 'iOS',
        path: 'ios'
      },
      {
        name: 'Udacity',
        path: 'udacity'
      }
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
