module.exports = function(app){
  app.get('/', (req, res) => {
    res.redirect('/topics')
  })

  // only mounted middleware
  // validate authority on every router
  app.use('/', require('./topics'))
  app.use('/', require('./signup'))
  app.use('/', require('./signout'))
  app.use('/', require('./signin'))
  // you can integrate '/user' with '/ask'
  app.use('/', require('./user'))
  app.use('/', require('./ask'))
}


