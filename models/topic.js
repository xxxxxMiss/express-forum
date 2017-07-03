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
      .then(topics => {
        topics = Array.isArray(topics) ? topics : [topics]
        return topics.map(topic => topic.addCreateAt())
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
  toggleUps(topicId){

  }
}