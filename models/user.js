const model = require('../mongoose')
const User = model.User

module.exports = {
  create(user){
    return User.create(user)
  },

  findByName(name){
    return User.findOne({ name })
  },

  findById(userId){
    return User.findOne({ _id: userId })
  },

  updateByName(name, user){
    return User.findOneAndUpdate({ name }, user, { new: true })
  },

  // update ask_count, collect_count and so on
  // value either 1 or -1
  updateUser(userId, field, value){
    value = value > 0 ? 1 : -1
    return User.updateUser(userId, field, value)
  },

  getUserByGithubId(github_id){
    return User.findOne({ github_id })
  }
}