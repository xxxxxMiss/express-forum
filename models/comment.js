const model = require('../mongoose')
const Comment = model.Comment

module.exports = {
  create(comment){
    return Comment.create(comment)
  },
  delById(id){
    // note: differences between Model.remove and model.remove
    return Comment.remove({ _id: id })
  },
  getCommentsByTopicId(topicId){
    return Comment.find({ topic: topicId })
      .populate({ path: 'author', select: 'name avatar' })
  },
  getCommentsCount(topicId){
    return Comment.count({ topic: topicId })
  }
}