const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkLogin = require('../middlewares/check').checkLogin
const user = require('./user')
const ask = require('./ask')
const sign = require('./sign')
const topics = require('./topics')
const github = require('./github')
const weibo = require('./weibo')


router.get('/ask/create', checkLogin, ask.getAsk)
router.post('/ask/create', ask.ask)
router.get('/ask/:topicId/edit', checkLogin, ask.getEditAsk)
router.post('/ask/:topicId/edit', ask.editAsk)

router.get('/signin', sign.getSignin)
router.post('/signin', sign.signin)
router.get('/signout', sign.signout)
router.get('/signup', sign.getSignup)
router.post('/signup', sign.signup)
router.post('/do_vcode', sign.doVcode)

// oauth2.0 
// router.get('/github', sign.github)

// passport github oauth
router.get('/auth/github', passport.authenticate('github'))
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/signin' }), 
  github.githubCallback)
// passport weibo oauth
router.get('/auth/weibo', passport.authenticate('weibo'))
router.get('/auth/weibo/callback', 
  passport.authenticate('weibo', { failureRedirect: '/signin' }),
  weibo.weiboCallback)

router.get('/', topics.getTopics)
router.get('/topics', topics.getTopics)
router.get('/topics/:topicId', topics.getTopic)
router.get('/topics/:topicId/comments', topics.getComments)
router.post('/topics/:topicId/comments', checkLogin, topics.postComment)
router.post('/topics/:topicId/ups', checkLogin, topics.ups)
router.post('/topics/:topicId/collect', checkLogin, topics.collect)

router.get('/user/:userId', checkLogin, user.getUserInfo)
router.post('/user/:userId', checkLogin, user.modifyUserInfo)
router.get('/user/:userId/topics', checkLogin, user.getTopics)
router.post('/user/:userId/topics/:topicId/del', user.delTopic)
router.get('/user/:userId/collects', checkLogin, user.getCollects)

module.exports = router
