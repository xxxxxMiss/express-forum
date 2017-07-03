module.exports = function(app){
  app.get('/', (req, res) => {
    res.redirect('/topics')
  })

  // only mounted middleware
  // validate authority on every router
  app.use('/topics', require('./topics'))
  app.use('/signup', require('./signup'))
  app.use('/signout', require('./signout'))
  app.use('/signin', require('./signin'))
  // you can combine '/user' with '/ask'
  app.use('/user', require('./user'))
  app.use('/ask', require('./ask'))
}
