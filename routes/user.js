const path = require('path')
const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const UserModel = require('../models/user')
const TopicModel = require('../models/topic')
const TopicCollectModel = require('../models/topic_collect')

router.get('/user/:userId', checkLogin, function(req, res, next) {
  res.render('user')
})

router.post('/user/:userId', checkLogin, (req, res) => {
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

// get all topics of you
router.get('/user/:userId/topics', checkLogin, (req, res) => {
  let { userId } = req.params

  TopicModel.findAllByUserId(userId).then(topics => {
    res.render('my-topics', { topics })
  })
})

// remove a topic of you
router.post('/user/:userId/topics/:topicId/del', (req, res) => {
  let { userId, topicId } = req.params
  let user = req.session.user

  TopicModel.remove(topicId).then(commandRet => {
    if(commandRet.result.ok && commandRet.result.n > 0){
      req.flash('success', '删除成功')
      return UserModel.updateUser(userId, 'ask_count', -1)
    }
  }).then(user => {
    req.session.user.ask_count = user.ask_count
    res.redirect(`/user/${userId}/topics`)
  })
})

// get all collects of you
router.get('/user/:userId/collects', checkLogin, (req, res) => {
  let { userId } = req.params
  
  TopicCollectModel.getCollectsByUserId(userId)
    .then(topics => {
      console.log('topics: ', topics)
      res.render('my-collects', { topics })
    })
})

module.exports = router
