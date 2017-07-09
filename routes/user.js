const path = require('path')
const UserModel = require('../models/user')
const TopicModel = require('../models/topic')
const TopicCollectModel = require('../models/topic_collect')

exports.getUserInfo = (req, res) => {
  res.render('user')
}

exports.modifyUserInfo = (req, res) => {
  let { name, gender, position, company, profile } = req.fields
  // TODO we can keep original file name  for uploaded file
  let avatar = req.files.avatar.path.split(path.sep).pop()
  let user = { name, gender, position, company, profile, avatar }

  UserModel.updateByName(name, user).then(user => {
    delete user.password
    req.session.user = user

    res.redirect('/topics')
  })
}

// get all topics of you
exports.getTopics = (req, res) => {
  let { userId } = req.params

  TopicModel.findAllByUserId(userId).then(topics => {
    res.render('my-topics', { topics })
  })
}

// remove a topic of you
exports.delTopic = (req, res) => {
  let { userId, topicId } = req.params
  let user = req.session.user

  TopicModel.remove(topicId).then(commandRet => {
    if(commandRet.result.ok && commandRet.result.n > 0){
      return UserModel.updateUser(userId, 'ask_count', -1)
    }
  }).then(user => {
    req.session.user.ask_count = user.ask_count
    res.send({
      err_no: 0,
      err_msg: '',
      data: {}
    })
  })
}

// get all collects of you
exports.getCollects = (req, res) => {
  let { userId } = req.params
  
  TopicCollectModel.getCollectsByUserId(userId)
    .then(topics => {
      console.log('topics: ', topics)
      res.render('my-collects', { topics })
    })
}
