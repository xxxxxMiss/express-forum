const Schema = require('mongoose').Schema
const ObjectId = Schema.Types.ObjectId
const UtilClass = require('./util')

const commentSma = new Schema({
  content: { type: String },
  author: { type: ObjectId, ref: 'User' },
  topic: { type: ObjectId, ref: 'Topic' },
  create_at: { type: Date, default: Date.now }
})

commentSma.loadClass(UtilClass)

module.exports = commentSma