const express = require('express')
const router = express.Router()
const TopicModel = require('../models/topic')
const UserModel = require('../models/user')
const checkLogin = require('../middlewares/check').checkLogin
// get /ask
router.get('/ask/create', checkLogin, (req, res, next) => {
  res.render('ask', { topic: null })
})

// post /ask/create
router.post('/ask/create', (req, res, next) => {
  let { _id, name } = req.session.user
  let { title, content } = req.fields
  let topic = {
    title, 
    content, 
    author: _id,
    visit_count: 0,
    reply_count: 0,
    is_collect: false
  }

  if(!title || !content){
    req.flash('error', '标题或者内容不能为空')
    return res.redirect('/ask')
  }

  TopicModel.create(topic).then(topic => {
    // update user info after successfully create a topic
    return UserModel.updateUser(req.session.user._id, 'ask_count', 1)
  }).then(user => {
    req.session.user.ask_count += 1
    res.redirect('/topics')
  })
})

// edit your topic
router.get('/ask/:topicId/edit', checkLogin, (req, res) => {
  let { topicId } = req.params

  TopicModel.findOneById(topicId).then(topic => {
    res.render('ask', { topic })
  })
})
// update you edit
router.post('/ask/:topicId/edit', (req, res) => {
  let { topicId } = req.params
  let { title, content } = req.fields
  let topic = { title, content }
  let userId = req.session.user._id

  TopicModel.findOneAndUpdate(topicId, topic)
    .then(_ => {
      req.flash('success', '编辑成功')
      res.redirect(`/user/${userId}/topics`)
    })
})

module.exports = router