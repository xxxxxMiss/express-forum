module.exports = function (req, accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken
  done(null, profile)
}
