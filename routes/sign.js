 const sha1 = require('sha1')
 const UserModel = require('../models/user')
 const TopicModel = require('../models/topic')
 const config = require('../config')
 const mail = require('../common/mail')

 // 注册页get  /signup
 exports.getSignup = (req, res) => {
  res.render('signup')
 }

// 注册post  /signup
 exports.signup = (req, res, next) => {
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
 }

 exports.getSignin = (req, res) => {
   res.render('signin')
 }

 exports.signin = (req, res, next) => {
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
       req.session.user = user

       res.redirect('/topics')
     })
   })
   .catch(e => {
     next(e)
   })
 }

 exports.signout = (req, res) => {
   req.session.user = null
   res.redirect('/topics')
 }

 // obtain email code
 exports.doVcode = (req, res) => {
  let { email } = req.fields

  if(!email){
    req.flash('error', '请填写邮箱')
    return res.redirect('/')
  }

  const rs = String(Math.random()).replace('.', '')
  const vcode = rs[1] + rs[3] + rs[5] + rs[8]

  mail.sendVcodeMail(email, vcode, function(){
    res.send({
      err_no: 0,
      err_msg: '',
      data: { vcode }
    })
  })
 }

// oauth2.0
exports.github = (req, res) => {
  let dataStr = (new Date()).valueOf()
  //重定向到认证接口,并配置参数
  //注意这里使用的是node的https模块发起的请求
  let path = "https://github.com/login/oauth/authorize"
  path += '?client_id=' + config.github_oauth.clientID
  // path += '&scope='+OAuthConfig.GITHUB_CLIENT_SCOPE
  path += '&state='+ dataStr
  //转发到授权服务器
  res.redirect(path)
}