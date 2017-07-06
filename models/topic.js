const model = require('../mongoose')
const Topic = model.Topic

module.exports = {
  create(topic){
    return Topic.create(topic)
  },
  // edit a topic
  findOneAndUpdate(id, topic){
    return Topic.findOneAndUpdate({ _id: id }, topic, { new: true })
  },
  // get topic list or topic detail
  getTopics(topicId){
    let query = {}
    topicId && (query._id = topicId)

    return Topic.find(query)
      .populate({ path: 'author', select: 'name avatar _id'})
      .sort({ create_at: -1 })
      .then(topics => {
        topics = Array.isArray(topics) ? topics : [topics]
        return topics.map(topic => {
          topic.create_at = topic.formatDate
          return topic
        })
      })
  },
  // get user's topics
  findAllByUserId(userId){
    return Topic.find({ author: userId })
      .populate({ path: 'author', select: 'name avatar' })
  },
  // get user's topics count
  getTopicsCount(userId){
    return Topic.count({ author: userId })
  },
  remove(topicId){
    return Topic.remove({ _id: topicId })
  },
  // increase the number of visiting topics
  incPv(topicId){
    return Topic.update({ _id: topicId }, { $inc: { pv: 1 } })
  },
  updateUps(topicId, userId){
    return Topic.findOne({ _id: topicId }).then(topic => {
      let index = topic.ups.indexOf(userId)
      let opts = {}
      if(index !== -1){
        opts.$pull = { ups: userId }
      }else{
        opts.$push = { ups: userId }
      }
      // both update and updateOne don't return modified document
      // rather than return the command result
      return Topic.updateOne({ _id: topicId }, opts)
    })
  },
  // get the number of topic's ups
  getUpsCount(topicId){
    return Topic.findOne({ _id: topicId }).then(topic => {
      return topic.ups.length
    })
  }
}