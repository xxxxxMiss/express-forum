const fs = require('fs')
const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const githubStrategyMiddleware = require('./middlewares/github_strategy')
const WeiboStrategy = require('passport-weibo').Strategy
const weiboStrategyMiddleware = require('./middlewares/weibo_strategy')
const formidable = require('express-formidable')
const flash = require('connect-flash')
const routes = require('./routes')
const config = require('./config')
const pkg = require('./package')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}))

// ====== oauth =====
// first step
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
// second step
passport.use(new GitHubStrategy(config.github_oauth, githubStrategyMiddleware))
passport.use(new WeiboStrategy(config.weibo_oauth, weiboStrategyMiddleware))
// third step
app.use(passport.initialize())
app.use(passport.session())
// fourth step: config route


// flash() requires session, 
// so you must mounted session middleware before flash
app.use(flash())

// mounted form middleware
app.use(formidable({
  uploadDir: path.join(__dirname, 'public/upload'),
  keepExtensions: true
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  // caution
  next()
})

app.locals.cfg = {
  title: pkg.name,
  description: pkg.description
}

// set up router
app.use('/', routes)

app.listen(config.port)

module.exports = app