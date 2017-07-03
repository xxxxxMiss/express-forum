const path = require('path')
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const UserModel = require('../models/user')
const TopicModel = require('../models/topic')

router.get('/:userId', checkLogin, function(req, res, next) {
  res.render('user')
})

router.post('/:userId', checkLogin, (req, res) => {
  let { name, gender, position, company, profile } = req.fields
  // TODO we can keep original file name  for uploaded file
  let avatar = req.files.avatar.path.split(path.sep).pop()
  let user = { name, gender, position, company, profile, avatar }

  UserModel.updateByName(name, user).then(user => {
    delete user.password
    req.session.user = user

    res.redirect('/topics')
  })
})

// get all topics
router.get('/:userId/topics', checkLogin, (req, res) => {
  let { userId } = req.params

  TopicModel.findAllByUserId(userId).then(topics => {
    res.render('my-topics', { topics })
  })
})

// remove your topic
router.post('/:userId/topics/:topicId/del', (req, res) => {
  let { userId, topicId } = req.params
  let user = req.session.user

  TopicModel.remove(topicId).then(commandRet => {
    req.flash('success', '删除成功')
    return UserModel.updateRecentTopics(userId, topicId)
  }).then(commandRet => {
    // panel view data from session.user
    // we must update sessson.user
    return UserModel.findById(userId)
  }).then(user => {
    req.session.user = user
    res.redirect(`/user/${userId}/topics`)
  })
})

module.exports = router
