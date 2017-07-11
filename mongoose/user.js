const Schema = require('mongoose').Schema
const ObjectId = Schema.Types.ObjectId
const UtilClass = require('./util')

const userSma = new Schema({
  name: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  create_at: { type: Date, default: Date.now },
  gender: String,
  position: String,
  company: String,
  profile: String,
  avatar: String,
  ask_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },

  github_id: { type: String },
  github_username: { type: String },
  github_accesstoken: { type: String },
  github_avatar: { type: String }
})

userSma.loadClass(UtilClass)

module.exports = userSma