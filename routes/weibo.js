const UserModel = require('../models/user')

exports.weiboCallback = (req, res, next) => {
  console.log('weibo: ' , req.user)
}