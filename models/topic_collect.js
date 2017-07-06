const model = require('../mongoose')
const TopicCollectModel = model.TopicCollect
const TopicModel = model.Topic

module.exports = {
  create(tc){
    return TopicCollectModel.create(tc)
  },
  remove(user_id, topic_id){
    return TopicCollectModel.remove({ user_id, topic_id })
  },
  getTopicCollectByUserId(user_id, topic_id){
    return TopicCollectModel.findOne({ user_id, topic_id })
  },
  getCollectCountByUserId(user_id){
    return TopicCollectModel.count({ user_id })
  },
  getCollectsByUserId(user_id){
    return TopicCollectModel.find({ user_id })
      .then(tcs => {
        let topicIds = tcs.map(item => item.topic_id)

        return TopicModel.find({ _id: { $in: topicIds } })
          .populate({ path: 'author' })
      })
  }
}

