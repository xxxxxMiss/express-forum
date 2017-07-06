const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const user = require('./user')
const ask = require('./ask')
const sign = require('./sign')
const topics = require('./topics')

router.get('/ask/create', checkLogin, ask.getAsk)
router.post('/ask/create', ask.ask)
router.get('/ask/:topicId/edit', checkLogin, ask.getEditAsk)
router.post('/ask/:topicId/edit', ask.editAsk)

router.get('/signin', sign.getSignin)
router.post('/signin', sign.signin)
router.post('/signout', sign.signout)
router.get('/signup', sign.getSignup)
router.post('/signup', sign.signup)

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
