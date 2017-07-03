const model = require('../mongoose')
const User = model.User

module.exports = {
  create(user){
    return User.create(user)
  },

  findByName(name){
    return User.findOne({ name })
    // TODO how to optimize it for getting counts of a filed
      .populate({ path: 'recent_topics collections' })
  },

  findById(userId){
    return User.findOne({ _id: userId })
      .populate({ path: 'recent_topics collections '})
  },

  updateByName(name, user){
    return User.findOneAndUpdate({ name }, user, { new: true })
  },

  updateRecentTopics(userId, topicId){
    return User.update({ _id: userId }, { $pull: { recent_topics: topicId } })
  }
}