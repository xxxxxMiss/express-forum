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
      尊敬的${to}，您好，<br>
      您正在使用${to}在${config.app_name_cn}平台上进行注册，<br>
      此次的验证码为<strong>${vcode}</strong>。<br>
      <small>若您并未注册${app_name_cn}，可能是其他用户误输入了您的邮箱地址，请忽略此邮件。<br>
      对此给你造成的不便，敬请谅解！<small>
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
