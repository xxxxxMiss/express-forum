const Schema = require('mongoose').Schema
const UtilClass = require('./util')

const topicShema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  visit_cout: Number,
  relay_count: Number,
  ups: Number,
  pv: Number,
  last_reply_at: Date,
  tab: String,
  // no requirement save it to database, 
  // we can use middleware to transfer objectid to datetime 
  // and deliver the result to frontend
  // create_at: Date, 
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  is_collect: {
    type: Boolean
  }
})

topicShema.loadClass(UtilClass)

module.exports = topicShema