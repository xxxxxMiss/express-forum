 const express = require('express')
 const router = express.Router()
 const sha1 = require('sha1')
 const UserModel = require('../models/user')

 // 注册页get  /signup
 router.get('/signup', (req, res) => {
  res.render('signup')
 })

// 注册post  /signup
 router.post('/signup', (req, res, next) => {
  let { name, password } = req.fields
  // use sha1 encrypt the password
  password = sha1(password)

  let user = { name, password }
  UserModel.create(user).then(user => {
    // write user to session except password field
    delete user.password
    req.session.user = user

    res.redirect('/topics')
  }).catch(e => {
     if(e.message.match('E11000 duplicate key')){
      req.flash('error', '该用户名已被占用')
      return res.redirect('/signup')
     }
     // caution: to deliver the error up to next middleware
     next(e)
  })
 })

 module.exports = router