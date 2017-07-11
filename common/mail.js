const util = require('util')
const mailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const config = require('../config')

const transporter = mailer.createTransport(smtpTransport(config.mail_opts))

exports.sendVcodeMail = (to, vcode, callback) => {
  callback = callback || function(){}

  let from = util.format('%s <%s>', config.app_name_cn, config.mail_opts.auth.user)
    , subject = `${config.app_name_cn}注册验证码`
    , html = `
      您正在使用${to}在${config.app_name_cn}平台上注册。<br>
      此次的验证码为<strong>${vcode}</strong>。<br>
      若您没有使用${to}邮箱注册，说明有人正在使用您的邮箱，请及时修改邮箱密码。对此给你造成的不便，敬请谅解！
    `
  
  transporter.sendMail({ from, to, subject, html }, callback)
}

// verify smtp config
transporter.verify(function(err, success){
  if(err){
    console.log(err)
  }else{
    console.log('smtp config success...')
  }
})
