const express = require('express')
const router = express.Router()
const sha1 = require('sha1')
const UserModel = require('../models/user')
const TopicModel = require('../models/topic')

router.get('/', (req, res) => {
  res.render('signin')
})

router.post('/', (req, res, next) => {
  let { name, password } = req.fields

  if(!name || !password){
    req.flash('error', '请填写用户名或密码')
    return res.redirect('/signin')
  }

  UserModel.findByName(name).then(user => {
    if(!user){
      req.flash('error', '用户不存在')
      return res.redirect('/signin')
    }

    if(sha1(password) !== user.password){
      req.flash('error', '密码错误')
      return res.redirect('/signin')
    }

    return user
  }).then(user => {
    TopicModel.getTopicsCount(user._id).then(count => {
      
      delete user.password
      user = user.toObject()
      user.topicsCount = count
      req.session.user = user

      res.redirect('/topics')
    })
  })
  .catch(e => {
    next(e)
  })
})

module.exports = router