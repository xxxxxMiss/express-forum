const mongoose = require('mongoose')
// use native promise instead of build-in promise
mongoose.Promise = global.Promise
const config = require('../config')
mongoose.connect(config.mongodb)

const userSma = require('./user')
const topicSma = require('./topic')
const commentSma = require('./comment')
const topicCollectSma = require('./topic_collect')

exports.User = mongoose.model('User', userSma)
exports.Topic = mongoose.model('Topic', topicSma)
exports.Comment = mongoose.model('Comment', commentSma)
exports.TopicCollect = mongoose.model('TopicCollect', topicCollectSma)





