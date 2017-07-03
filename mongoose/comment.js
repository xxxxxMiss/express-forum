const Schema = require('mongoose').Schema
const UtilClass = require('./util')

const commentSma = new Schema({
  content: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }
})

commentSma.loadClass(UtilClass)

module.exports = commentSma