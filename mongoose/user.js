const Schema = require('mongoose').Schema
const UtilClass = require('./util')

const userSma = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  gender: String,
  position: String,
  company: String,
  profile: String,
  avatar: String,
  collections: {
    type: [ { type: Schema.Types.ObjectId, ref: 'Topic' }]
  }
})

userSma.loadClass(UtilClass)

module.exports = userSma