const UserModel = require('../models/user')
// get github oauth page
exports.githubCallback = (req, res, next) => {
  const user = req.user
  const { id, avatar_url, email, } = user._json

  UserModel.getUserByGithubId(id).then(u => {
    if(!u){
      let newUser = {
        github_id: id,
        github_username: user.username,
        github_avatar: avatar_url,
        github_accesstoken: user.accessToken
      }
      return UserModel.create(newUser)
    }

    return u
  }).then(user => {
    delete user.password
    let { github_username, github_avatar, github_id } = user
    let u = Object.create(null)

    u.name = github_username
    u._id = github_id

    req.session.user = Object.assign(u, user)

    res.redirect('/')
  })
}