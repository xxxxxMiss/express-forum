const Schema = require('mongoose').Schema
const ObjectId = Schema.Types.ObjectId
const UtilClass = require('./util')

const topicShema = new Schema({
  title: { type: String },
  content: { type: String },
  visit_cout: { type: Number, default: 0 },
  relay_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  ups: [{ type: ObjectId }],
  pv: { type: Number, default: 0 },
  last_reply_at: Date,
  tab: String,
  author: { type: ObjectId, ref: 'User' },
  is_collect: { type: Boolean, default: false }
})

topicShema.index({ create_at: -1 })

topicShema.loadClass(UtilClass)

module.exports = topicShema