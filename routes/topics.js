const TopicModel = require('../models/topic')
const CommentModel = require('../models/comment')
const TopicCollectModel = require('../models/topic_collect')
const UserModel = require('../models/user')

exports.getTopics = (req, res) => {
  TopicModel.getTopics().then(topics => {
    // caution: typeof topic._id === 'object' is true
    res.render('topics', { topics })
  })
}

exports.getTopic = (req, res) => {
  let { topicId } = req.params
  let userId = req.session.user && req.session.user._id || null

  // enter a topic detail page,
  // you must do five things at the same time
  Promise.all([
    TopicModel.getTopics(topicId),
    TopicModel.incPv(topicId),
    CommentModel.getCommentsCount(topicId),
    TopicModel.getUpsCount(topicId),
    TopicCollectModel.getTopicCollectByUserId(userId, topicId)
  ]).then(result => {
    res.render('topic', { 
      topic: result[0][0], 
      commentsCount: result[2], 
      upsCount: result[3],
      isCollected: result[4] ? true : false
    })
  })
}

exports.getComments = (req, res) => {
  let { topicId } = req.params

  CommentModel.getCommentsByTopicId(topicId)
    .then(comments => {
      res.render('comments', { comments })
    })
}

// post a comment
exports.postComment = (req, res) => {
  let { topicId } = req.params
      ,{ content } = req.fields
      ,userId = req.session.user._id
      ,comment = { content, author: userId, topic: topicId }

  CommentModel.create(comment).then(c => {
    // both `res.redirect` and `res.render` can realize rendering a page 
    // which method is suit here
    // TODO optimize CRUD
    res.redirect('back')
  })
}

exports.ups = (req, res) => {
  let { topicId } = req.params
  let userId = req.session.user._id

  TopicModel.updateUps(topicId, userId).then(commandRet => {
    if(commandRet.ok && commandRet.n > 0){
      res.redirect(`/topics/${topicId}`)
    }
  })
}

exports.collect = (req, res) => {
  let { topicId } = req.params
  let userId = req.session.user._id

  TopicCollectModel.getTopicCollectByUserId(userId, topicId)
  .then(tc => {
    if(tc){
      return TopicCollectModel.remove(userId, topicId)
    }else{
      let topicCollect = { user_id: userId, topic_id: topicId }
      return TopicCollectModel.create(topicCollect)
    }
  }).then(ret => {
    // TODO update user's collect count
    if(ret.result && ret.result.ok && ret.result.n > 0){
      return UserModel.updateUser(userId, 'collect_count', -1)
    }
    if(ret._id){
      return UserModel.updateUser(userId, 'collect_count', 1)
    }
  }).then(user => {
    req.session.user.collect_count = user.collect_count
    res.redirect(`/topics/${topicId}`)
  })
}
