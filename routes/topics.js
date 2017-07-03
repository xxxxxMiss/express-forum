const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const TopicModel = require('../models/topic')
const CommentModel = require('../models/comment')

router.get('/', (req, res) => {
  TopicModel.getTopics().then(topics => {
    // caution: typeof topic._id === 'object' is true
    res.render('topics', { topics })
  })
})

router.get('/:topicId', (req, res) => {
  let { topicId } = req.params

  // enter a topic detail page,
  // you must do three things at the same time
  Promise.all([
    TopicModel.getTopics(topicId),
    TopicModel.incPv(topicId),
    CommentModel.getCommentsCount(topicId)
  ]).then(result => {
    res.render('topic', { topic: result[0][0], commentsCount: result[2] })
  })
})

router.get('/:topicId/comments', (req, res) => {
  let { topicId } = req.params

  CommentModel.getCommentsByTopicId(topicId)
    .then(comments => {
      res.render('comments', { comments })
    })
})

// post a comment
router.post('/:topicId/comments', checkLogin, (req, res) => {
  let { topicId } = req.params
      ,{ content } = req.fields
      ,userId = req.session.user._id
      ,comment = { content, author: userId, topic: topicId }

  CommentModel.create(comment).then(c => {
    // both `res.redirect` and `res.render` can realize rendering a page 
    // which method is suit here
    // TODO optimize CRUD
    res.redirect(`${req.originalUrl}`)
  })
})

module.exports = router